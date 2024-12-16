import { CustomLayerProps } from "@nivo/line";

export const DomainLine = (props: CustomLayerProps) => (
  <line
    style={{ stroke: "#132434", strokeWidth: 1 }}
    x1={0}
    x2={props.innerWidth}
    y1={props.innerHeight}
    y2={props.innerHeight}
  />
);
