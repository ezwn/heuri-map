export const boundsTranslate = (bounds, motionTranslation) => {
  const [x, y, width, height] = bounds;
  const [tx, ty] = motionTranslation;
  return [x + tx, y + ty, width, height];
};

export const boundsIncreaseWidth = (bounds, value) => {
  const [x, y, width, height] = bounds;
  return [x, y, width + value, height];
};

export const boundsIncreaseHeight = (bounds, value) => {
  const [x, y, width, height] = bounds;
  return [x, y, width, height + value];
};

export const boundsCenterRefFrameToLeftTopRefFrame = (bounds) => {
  const [x, y, width, height] = bounds;
  return [x - width / 2, y - height / 2, width, height];
};

export const fromRectToDiagram = (rect, point) => {
  const { bounds: rawBounds } = rect;
  const [x, y, w, h] = boundsCenterRefFrameToLeftTopRefFrame(rawBounds);
  return [x + w * point[0], y + h * point[1]];
};

export const vectFromDiagramToRect = (rect, point) => {
  const { bounds: rawBounds } = rect;
  const [x, y, w, h] = boundsCenterRefFrameToLeftTopRefFrame(rawBounds);
  return [point[0] / w, point[1] / h];
};
