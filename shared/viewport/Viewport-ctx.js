import React, { useContext, useState } from "react";

const ViewportContext = React.createContext();

export const ViewportProvider = ({ children, format }) => {
  const [size, setSize] = useState([400, 400]);

  const toViewportPoint = (point) => {
    const [viewportWidth, viewportHeight] = size;
    const [x, y] = point;
    return [x * viewportWidth, y * viewportHeight];
  };

  const fromViewportPoint = (point) => {
    const [viewportWidth, viewportHeight] = size;
    const [x, y] = point;
    return [x / viewportWidth, y / viewportHeight];
  };

  const toViewportBounds = (bounds) => {
    const [viewportWidth, viewportHeight] = size;
    const [x, y, width, height] = bounds;
    return [
      x * viewportWidth,
      y * viewportHeight,
      width * viewportWidth,
      height * viewportHeight
    ];
  };

  const onLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;

    const maxWidth = height * format;
    const maxHeight = width / format;

    setSize(maxWidth < width ? [maxWidth, height] : [width, maxHeight]);
  };

  return (
    <ViewportContext.Provider
      value={{
        size,
        onLayout,
        toViewportPoint,
        toViewportBounds,
        fromViewportPoint
      }}
    >
      {React.Children.only(children)}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => {
  return useContext(ViewportContext);
};
