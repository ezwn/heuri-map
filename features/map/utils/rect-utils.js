import { fromRectToDiagram, vectFromDiagramToRect } from "./geom";

export const lineEndToPoint = (location, ref, mapData) => {
  const { rects } = mapData;

  if (ref) {
    const rect = rects.find((rect) => rect.id === ref);
    return fromRectToDiagram(rect, location);
  } else {
    return location;
  }
};

export const pointToLineEnd = (location, ref, mapData) => {
  const { rects } = mapData;

  if (ref) {
    const rect = rects.find((rect) => rect.id === ref);
    return vectFromDiagramToRect(rect, location);
  } else {
    return location;
  }
};
