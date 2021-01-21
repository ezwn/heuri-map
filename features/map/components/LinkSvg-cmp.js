import React from "react";
import { useMap } from "shared/map/Map-ctx";
import { Line } from "react-native-svg";
import { useViewport } from "features/map/contexts/Viewport-ctx";
import { useSelection } from "../contexts/Selection-ctx";
import { stopEvent } from "shared/stopEvent";
import { lineEndToPoint } from "../utils/rect-utils";

export const LinkSvg = ({ points, lines, id: linkId }) => {
  const { isSelected } = useSelection();
  const selected = isSelected(linkId);

  return (
    <>
      {lines.map((line) => (
        <LineSvg
          key={line.id}
          {...line}
          points={points}
          linkId={linkId}
          selected={selected}
        />
      ))}
    </>
  );
};

const LineSvg = ({
  point1: point1Id,
  point2: point2Id,
  points,
  linkId,
  selected
}) => {
  const { toViewportPoint } = useViewport();
  const { onPress } = useSelection();
  const { mapData } = useMap();

  const point1 = points.find((point) => point.id === point1Id);
  const point2 = points.find((point) => point.id === point2Id);

  const [x1, y1] = toViewportPoint(
    lineEndToPoint(point1.location, point1.ref, mapData)
  );
  const [x2, y2] = toViewportPoint(
    lineEndToPoint(point2.location, point2.ref, mapData)
  );

  const linePress = (event) => {
    onPress(event, linkId);
  };

  return (
    <>
      <Line
        style={{
          strokeWidth: 2,
          stroke: selected ? "rgb(255,0,0)" : "rgb(0,0,0)"
        }}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
      />
      <Line
        onClick={linePress}
        onMouseDown={stopEvent}
        onMouseUp={stopEvent}
        style={{ strokeWidth: 8, stroke: "transparent" }}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
      />
    </>
  );
};
