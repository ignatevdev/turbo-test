import { DotsItem } from "@nivo/core";
import { CustomLayerProps, SliceTooltipProps } from "@nivo/line";

type CurrentSlice = {
  currentSlice: SliceTooltipProps["slice"];
};

export const ActivePoint = ({ currentSlice }: CustomLayerProps & CurrentSlice) => (
  <g>
    {currentSlice?.points.map(point => (
      <DotsItem
        key={point.id}
        x={point.x}
        y={point.y}
        datum={point.data}
        size={9}
        color="#fff"
        borderWidth={2}
        borderColor="#07131F"
      />
    ))}
  </g>
);
