/* eslint-disable @typescript-eslint/no-loss-of-precision */

import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import { formatWithPrecision } from "./format";

describe("formatWithPrecision", () => {
  it("Works with different input formats", () => {
    expect(formatWithPrecision(new Decimal(100))).toEqual("100");
    expect(formatWithPrecision(100)).toEqual("100");
    expect(formatWithPrecision("100")).toEqual("100");
  });

  it("Formats negative numbers", () => {
    expect(formatWithPrecision(-1)).toEqual("-1");
    expect(formatWithPrecision(-100)).toEqual("-100");
    expect(formatWithPrecision(-1000)).toEqual("-1K");
    expect(formatWithPrecision(-0.001)).toEqual("-0.001");
  });

  it("Formats big amounts", () => {
    expect(formatWithPrecision(1000)).toEqual("1K");
    expect(formatWithPrecision(1100)).toEqual("1.1K");
    expect(formatWithPrecision(1111)).toEqual("1.11K");
    expect(formatWithPrecision(11100000)).toEqual("11.1M");
    expect(formatWithPrecision(11110000)).toEqual("11.11M");
    expect(formatWithPrecision(11119000)).toEqual("11.12M");
  });

  it("Formats small amounts", () => {
    // Basic cases
    expect(formatWithPrecision(1)).toEqual("1");
    expect(formatWithPrecision(1.0001)).toEqual("1");
    expect(formatWithPrecision(1.19)).toEqual("1.19");
    expect(formatWithPrecision(1.199)).toEqual("1.2");
    expect(formatWithPrecision(0)).toEqual("0");
    expect(formatWithPrecision(0.1)).toEqual("0.1");
    expect(formatWithPrecision(0.00001)).toEqual("0.00001");
    // Maximum significant digits
    expect(formatWithPrecision(0.01111)).toEqual("0.011");
    // Approximate to 0
    expect(formatWithPrecision(0.000000001)).toEqual("~0");
    expect(formatWithPrecision(0.000000009)).toEqual("~0");
    // Last significant digit unchanged
    expect(formatWithPrecision(0.00000001)).toEqual("0.00000001");
    // Last significant digit rounded
    expect(formatWithPrecision(0.000000019)).toEqual("0.00000001");
    expect(formatWithPrecision(0.123456789)).toEqual("0.12");
    expect(formatWithPrecision(0.0001058584)).toEqual("0.00011");
    expect(formatWithPrecision(0.0001045858)).toEqual("0.0001");
  });

  it("Works with different precisions", () => {
    expect(formatWithPrecision(1.0001, { precision: 3 })).toEqual("1");
    expect(formatWithPrecision(1.0001, { precision: 4 })).toEqual("1.0001");
    expect(formatWithPrecision(0.0009, { precision: 3 })).toEqual("0.0009");
    expect(formatWithPrecision(0.00099, { precision: 4 })).toEqual("0.00099");
    expect(formatWithPrecision(1.00099, { precision: 4 })).toEqual("1.001");
  });
});
