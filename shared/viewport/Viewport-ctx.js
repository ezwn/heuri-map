import React, { useContext, useState } from "react";

const ViewportContext = React.createContext();

export const ViewportProvider = ({ children, format }) => {
  const [viewport, setViewport] = useState({
    size: [400, 400]
  });

  const [viewportWidth, viewportHeight] = viewport.size

  const toViewportPoint = (point) => {
    const [x, y] = point
    return [x*viewportWidth, y*viewportHeight]
  }

  const fromViewportPoint = (point) => {
    const [x, y] = point
    return [x/viewportWidth, y/viewportHeight]
  }

  const toViewportBounds = (bounds) => {
    const [x, y, width, height] = bounds
    return [x*viewportWidth, y*viewportHeight, width*viewportWidth, height*viewportHeight]
  }

  const onLayout = (event) => {
    const {x, y, width, height} = event.nativeEvent.layout;

    const maxWidth = height * format
    const maxHeight = width / format

    setViewport({
      size: maxWidth<width ? [maxWidth, height] : [width, maxHeight]
    });
  }

  return <ViewportContext.Provider
      value={{
        ...viewport,
        onLayout,
        toViewportPoint,
        toViewportBounds,
        fromViewportPoint
      }}
    >
      {React.Children.only(children)}
    </ViewportContext.Provider>
};

export const useViewport = () => {
  return useContext(ViewportContext);
};
