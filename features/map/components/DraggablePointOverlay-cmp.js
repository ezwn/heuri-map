import React from "react";
import { View } from "react-native";
import { useTouchMotion } from "../contexts/TouchMotion-ctx";

export const DraggablePointOverlay = ({ location, id, initialBounds }) => {
  const { startDragging } = useTouchMotion();

  const onPressIn = (event) => startDragging(event, id, initialBounds);

  const [x, y] = location;
  const ray = 5;

  return (
    <View
      onPressIn={onPressIn}
      onMouseDown={onPressIn}
      style={{
        position: "absolute",
        left: x - ray,
        top: y - ray,
        width: ray * 2,
        height: ray * 2,
        backgroundColor: "red"
      }}
    ></View>
  );
};
