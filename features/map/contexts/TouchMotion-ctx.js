import React, { useContext, useState } from "react";

/**
 * TouchMotionContext
 */
const TouchMotionContext = React.createContext();

export const TouchMotionProvider = ({ children }) => {
  const [draggedElementId, setDraggedElementId] = useState(null);
  const [motionStartPoint, setMotionStartPoint] = useState(null);
  const [motionTranslation, setMotionTranslation] = useState([0, 0]);
  const [initialBounds, setInitialBounds] = useState(null);
  const [hasBeenDragged, setHasBeenDragged] = useState(false);

  const startDragging = (event, draggedElementId, initialBounds) => {
    if (!event.button) {
      event.stopPropagation();
      event.preventDefault();

      const { clientX, clientY } = event;
      setMotionStartPoint([clientX, clientY]);
      setDraggedElementId(draggedElementId);
      setInitialBounds(initialBounds);
      setHasBeenDragged(false);
    }
  };

  const onMove = (event) => {
    if (motionStartPoint) {
      event.stopPropagation();
      event.preventDefault();
      const { clientX, clientY } = event;
      const [motionStartPointX, motionStartPointY] = motionStartPoint;
      setMotionTranslation([
        clientX - motionStartPointX,
        clientY - motionStartPointY
      ]);
      if (clientX !== motionStartPointX || clientY !== motionStartPointY) {
        setHasBeenDragged(true);
      }
    }
  };

  const onPressOut = (event) => {
    if (motionStartPoint) {
      event.stopPropagation();
      event.preventDefault();
      setMotionStartPoint(null);
      setInitialBounds(null);
      setMotionTranslation([0, 0]);
    }
  };

  return (
    <TouchMotionContext.Provider
      value={{
        initialBounds,
        motionTranslation,
        startDragging,
        onMove,
        onPressOut,
        draggedElementId,
        hasBeenDragged
      }}
    >
      {React.Children.only(children)}
    </TouchMotionContext.Provider>
  );
};

export const useTouchMotion = () => {
  return useContext(TouchMotionContext);
};
