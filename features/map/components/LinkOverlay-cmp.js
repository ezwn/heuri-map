import React, { useEffect } from "react";
import { useMap } from "shared/map/Map-ctx";
import { useViewport } from "features/map/contexts/Viewport-ctx";
import { DraggablePointOverlay } from "./DraggablePointOverlay-cmp";
import { useTouchMotion } from "../contexts/TouchMotion-ctx";
import { useSelection } from "../contexts/Selection-ctx";
import { DeleteRectIcon } from "./DeleteRectIcon-cmp";
import { lineEndToPoint, pointToLineEnd } from "../utils/rect-utils";

export const LinkOverlay = ({ points, lines, id: linkId }) => {
  const { isSelected } = useSelection();
  const selected = isSelected(linkId);
  const {
    size: [, viewportHeight],
    toViewportPoint
  } = useViewport();
  const { mapData, deleteLink } = useMap();

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
            <LinkPointOverlay key={point.id} point={point} linkId={linkId} />
          ))}
          <DeleteRectIcon
            location={[xMax, yMin]}
            onActivate={() => deleteLink(linkId)}
          />
        </>
      )}
    </>
  );
};

const LinkPointOverlay = ({ point, linkId }) => {
  const { toViewportPoint, fromViewportPoint } = useViewport();
  const { mapData, updateLinkPoint } = useMap();

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
