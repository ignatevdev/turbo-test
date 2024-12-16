import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProfitChart } from "@turbo-cr-test/ui";
import { getProfitChartPoints } from "@turbo-cr-test/utils";

const meta: Meta<typeof ProfitChart> = {
  component: ProfitChart,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ProfitChart>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => {
    const data = getProfitChartPoints();

    return <ProfitChart data={data} currentPriceValue={160} yMin={-25} />;
  },
  name: "ProfitChart",
  args: {},
};
