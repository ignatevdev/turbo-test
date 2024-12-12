import Decimal from "decimal.js";

import type { Maybe } from "@/types";
import { DEFAULT_AMOUNT_PRECISION, MAXIMUM_AMOUNT_DECIMALS } from "@/constants";

export const NUMBER_FORMAT_LOCALE = "en-US";

export type AmountValue = Decimal.Value | bigint;

const percentsFormatter = new Intl.NumberFormat(NUMBER_FORMAT_LOCALE, {
  style: "percent",
  maximumFractionDigits: 2,
});

const usdFormatter = new Intl.NumberFormat(NUMBER_FORMAT_LOCALE, {
  style: "currency",
  currency: "USD",
});

const normalizeAmountValue = (amount: AmountValue) =>
  new Decimal(typeof amount === "bigint" ? amount.toString() : amount);

// Caching formatters for performance reasons
const formattersMap = new Map();

export function formatWithPrecision(
  amount: AmountValue,
  options: {
    precision?: number;
  } = {}
): string {
  const { precision = DEFAULT_AMOUNT_PRECISION } = options;

  // Normalize input
  const normalizedAmount = normalizeAmountValue(amount);

  // Return exact zero
  if (normalizedAmount.eq(0)) {
    return "0";
  }

  // Round non-significant decimals
  const significantNumber = normalizedAmount
    .mul(10 ** MAXIMUM_AMOUNT_DECIMALS)
    .floor()
    .div(10 ** MAXIMUM_AMOUNT_DECIMALS)
    .toNumber();

  // Specifying significant digits options for correct formatting of small amounts
  const numberFormatConfig: Partial<Intl.NumberFormatOptions> =
    significantNumber >= 1
      ? {
          minimumFractionDigits: 0,
          maximumFractionDigits: precision,
        }
      : {
          minimumSignificantDigits: 1,
          maximumSignificantDigits: precision,
          minimumFractionDigits: 0,
          maximumFractionDigits: precision,
        };

  // Getting or initializing formatter
  const formatterKey = `${significantNumber >= 1 ? "big" : "small"}-${precision}`;

  let formatter = formattersMap.get(formatterKey);

  if (!formatter) {
    formatter = new Intl.NumberFormat(NUMBER_FORMAT_LOCALE, {
      style: "decimal",
      notation: "compact",
      ...numberFormatConfig,
    });

    formattersMap.set(formatterKey, formatter);
  }

  const result = formatter.format(significantNumber);

  // Approximately zero
  if (result === "0") {
    return "~0";
  }

  return result;
}

export type FormatTokenAmountOptions = {
  displayPrecision: number;
};
export function formatTokenAmount(
  amount: Maybe<AmountValue>,
  options: FormatTokenAmountOptions
): string {
  if (amount === undefined || amount === null) {
    return "N/A";
  }

  const normalizedAmount = normalizeAmountValue(amount);
  return formatWithPrecision(normalizedAmount, {
    precision: options?.displayPrecision,
  });
}

export const formatPercents = (amount: AmountValue) => {
  const normalizedAmount = normalizeAmountValue(amount).toNumber();
  return percentsFormatter.format(normalizedAmount);
};

export function formatUsd(amount: AmountValue) {
  const decimalAmount = normalizeAmountValue(amount).toNumber();
  return usdFormatter.format(decimalAmount);
}

export function formatPairTokenPrice(
  price: Decimal,
  decimals: { decimalsY: number; decimalsX: number },
  options: {
    precision?: number;
    compact?: boolean;
  } = {}
) {
  const { decimalsX, decimalsY } = decimals;
  const { precision, compact } = options;

  const tokenPairPrice = price.mul(new Decimal(10).pow(decimalsX - decimalsY));

  if (compact) {
    return formatWithPrecision(tokenPairPrice, { precision });
  }

  return tokenPairPrice.toString();
}
