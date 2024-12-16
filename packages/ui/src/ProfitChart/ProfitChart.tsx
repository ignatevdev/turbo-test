import React from "react";
import { CartesianMarkerProps, Theme } from "@nivo/core";
import { CustomLayer, ResponsiveLine } from "@nivo/line";

import { ActivePoint } from "./components/ActivePoint";
import { DomainLine } from "./components/DomainLine";

type Point = { x: number; y: number | null };

type ProfitChartProps = {
  data: Point[];

  currentPriceValue?: number;
  yMin?: number;
  yMax?: number;
};

export const ProfitChart = (props: ProfitChartProps) => {
  const { data, currentPriceValue, yMin, yMax } = props;

  const lines = React.useMemo(() => {
    const positiveData: Point[] = [];
    const negativeData: Point[] = [];

    data.forEach(point => {
      if (point.y && point.y > 0) {
        positiveData.push({
          x: point.x,
          y: point.y,
        });
        negativeData.push({
          x: point.x,
          y: null,
        });
      } else if (point.y === 0) {
        negativeData.push({
          x: point.x,
          y: point.y,
        });
        positiveData.push({
          x: point.x,
          y: point.y,
        });
      } else {
        negativeData.push({
          x: point.x,
          y: point.y,
        });
        positiveData.push({
          x: point.x,
          y: null,
        });
      }
    });

    return [
      {
        id: "positive",
        data: positiveData,
      },
      {
        id: "negative",
        data: negativeData,
      },
    ];
  }, [data]);

  const markers = React.useMemo(() => {
    const zeroMarker: CartesianMarkerProps = {
      axis: "y",
      value: 0,
      lineStyle: {
        strokeDasharray: "4, 4",
        stroke: "#19513A",
      },
    };

    const currentPriceMarker: CartesianMarkerProps | false = currentPriceValue !== undefined && {
      axis: "x",
      value: currentPriceValue,
      lineStyle: { strokeDasharray: "4, 4", stroke: "rgba(255, 255, 255, 0.5)", strokeWidth: 2 },
    };

    return [zeroMarker, currentPriceMarker].filter(x => x !== false);
  }, [currentPriceValue]);

  const theme: Theme = {
    axis: {
      ticks: {
        line: {
          stroke: "transparent",
        },
        text: {
          fill: "#7993AB",
          fontSize: 12,
        },
      },
    },
    tooltip: {},
    crosshair: {
      line: {
        stroke: "#fff",
        strokeWidth: 2,
        strokeDasharray: "4, 4",
      },
    },
  };

  return (
    <div style={{ height: "500px", background: "#07131F" }}>
      <ResponsiveLine
        data={lines}
        // Margins
        margin={{
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        }}
        // Scales
        yScale={{
          type: "linear",
          min: yMin,
          max: yMax,
        }}
        xScale={{ type: "point" }}
        // Tooltip
        sliceTooltip={({ slice }) => {
          const x = slice.points[0].data.x;
          const y = slice.points.find(item => item.data.y !== null)?.data.y;

          return (
            <div
              style={{
                border: "1px solid #132434",
                background: "#0A1928",
                padding: "4px 6px",
              }}
            >
              <div>
                <span style={{ color: "#7993AB" }}>PNL Change:</span>{" "}
                <span style={{ color: "#fff" }}>{y?.toString()}%</span>
              </div>
              <span style={{ color: "#7993AB" }}>Price Change:</span>{" "}
              <span style={{ color: "#fff" }}>{x?.toString()}%</span>
            </div>
          );
        }}
        // Colors
        theme={theme}
        colors={["#48C691", "#C64848"]}
        // Markers
        markers={markers}
        // Area
        enableArea={true}
        areaOpacity={0.05}
        // Axes
        axisTop={null}
        axisRight={{}}
        axisBottom={{}}
        axisLeft={null}
        // Misc
        animate
        useMesh
        curve="natural"
        enablePoints={false}
        enableSlices="x"
        // Layers
        layers={[
          "areas",
          "lines",
          "markers",
          "axes",
          "crosshair",
          "points",
          "mesh",
          "slices",
          DomainLine,
          ActivePoint as CustomLayer,
        ]}
      />
    </div>
  );
};
