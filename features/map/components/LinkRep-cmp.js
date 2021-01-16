import React, { useEffect } from "react";
import { useMap } from "shared/map/Map-ctx";
import { Line } from "react-native-svg";
import { useViewport } from "shared/viewport/Viewport-ctx";
import { vectFromDiagramToRect, fromRectToDiagram } from "../geom";
import { DraggablePointOverlay } from "./DraggablePoint-cmp";
import { useTouchMotion } from "../contexts/TouchMotion-ctx";
import { useSelection } from "../contexts/Selection-ctx";
import { stopEvent } from "shared/stopEvent";
import { DeleteIconOverlay } from "./DeleteIcon-cmp";

export const LinkRep = ({ points, lines, id: linkId }) => {
  const { isSelected } = useSelection();
  const selected = isSelected(linkId);

  return (
    <>
      {lines.map((line) => (
        <LineRep
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

export const LinkOverlay = ({ points, lines, id: linkId }) => {
  const { isSelected } = useSelection();
  const selected = isSelected(linkId);
  const {
    size: [, viewportHeight],
    toViewportPoint
  } = useViewport();
  const { getMapData, deleteLink } = useMap();
  const mapData = getMapData();

  let xMax = 0,
    yMin = viewportHeight;
  points.forEach((point) => {
    const [x, y] = toViewportPoint(
      lineEndToPoint(point.location, point.ref, mapData)
    );
    xMax = Math.max(xMax, x);
    yMin = Math.min(yMin, y);
  });

  return (
    <>
      {selected && (
        <>
          {points.map((point) => (
            <LinkPoint key={point.id} point={point} linkId={linkId} />
          ))}
          <DeleteIconOverlay
            location={[xMax, yMin]}
            onActivate={() => deleteLink(linkId)}
          />
        </>
      )}
    </>
  );
};

const LinkPoint = ({ point, linkId }) => {
  const { toViewportPoint, fromViewportPoint } = useViewport();
  const { getMapData, updateLinkPoint } = useMap();
  const mapData = getMapData();

  const {
    motionTranslation,
    initialBounds,
    draggedElementId
  } = useTouchMotion();

  useEffect(() => {
    if (
      initialBounds &&
      draggedElementId &&
      (motionTranslation[0] !== 0 || motionTranslation[1] !== 0)
    ) {
      const diagramTranslation = pointToLineEnd(
        fromViewportPoint(motionTranslation),
        point.ref,
        mapData
      );
      const [tx, ty] = diagramTranslation;

      switch (draggedElementId) {
        case point.id:
          updateLinkPoint(linkId, point.id, "location", [
            initialBounds[0] + tx,
            initialBounds[1] + ty
          ]);
          break;
      }
    }
  }, [
    draggedElementId,
    motionTranslation[0],
    motionTranslation[1],
    initialBounds
  ]);

  const [x, y] = toViewportPoint(
    lineEndToPoint(point.location, point.ref, mapData)
  );
  return (
    <DraggablePointOverlay
      id={point.id}
      location={[x, y]}
      initialBounds={point.location}
    />
  );
};

export const LineRep = ({
  point1: point1Id,
  point2: point2Id,
  points,
  linkId,
  selected
}) => {
  const { toViewportPoint } = useViewport();
  const { onPress } = useSelection();
  const mapData = useMap().getMapData();

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

const lineEndToPoint = (location, ref, mapData) => {
  const { rects } = mapData;

  if (ref) {
    const rect = rects.find((rect) => rect.id === ref);
    return fromRectToDiagram(rect, location);
  } else {
    return location;
  }
};

const pointToLineEnd = (location, ref, mapData) => {
  const { rects } = mapData;

  if (ref) {
    const rect = rects.find((rect) => rect.id === ref);
    return vectFromDiagramToRect(rect, location);
  } else {
    return location;
  }
};
