import React from "react";
import { Text } from "react-native";
import { stopEvent } from "shared/stopEvent";

export const CreateLinkIcon = ({ location, onActivate }) => {
  const onPress = (event) => {
    stopEvent(event);
    onActivate();
  };

  const [x, y] = location;
  const ray = 15;

  return (
    <Text
      onMouseDown={stopEvent}
      onMouseUp={stopEvent}
      onPress={onPress}
      onClick={onPress}
      style={{
        position: "absolute",
        left: x - ray - 15,
        top: y - ray - 20,
        width: ray * 2,
        height: ray * 2,
        backgroundColor: "white",
        borderRadius: ray,
        textAlign: "center",
        textAlignVertical: "center"
      }}
    >
      -
    </Text>
  );
};
