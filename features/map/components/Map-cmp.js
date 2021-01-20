import React from "react";
import { useMap } from "shared/map/Map-ctx";
import Svg from "react-native-svg";
import { useViewport } from "shared/viewport/Viewport-ctx";
import { LinkOverlay, LinkRep } from "./LinkRep-cmp";
import { useTouchMotion } from "../contexts/TouchMotion-ctx";
import { View } from "react-native";
import { RectOverlay } from "./RectOverlay-cmp";
import { useSelection } from "../contexts/Selection-ctx";

export const MapComponent = () => {
  const mapId = "MAP";

  const {
    onMove,
    onPressOut,
    startDragging,
    draggedElementId
  } = useTouchMotion();

  const {
    size: [viewportWidth, viewportHeight],
    onLayout
  } = useViewport();
  const { mapData } = useMap();
  const { rects, links } = mapData;

  const { createRect } = useMap();

  const { setSelection } = useSelection();

  const onPressIn = (event) => {
    if (draggedElementId === mapId) {
      event.stopPropagation();
      event.preventDefault();

      const { clientX, clientY } = event;
      createRect(clientX / viewportWidth, clientY / viewportHeight);
    } else {
      startDragging(event, mapId);
      setSelection([]);
    }
  };

  return (
    <View
      onLayout={onLayout}
      style={{ flex: 1 }}
      onMouseDown={onPressIn}
      onPressIn={onPressIn}
      onMouseMove={onMove}
      onResponderMove={onMove}
      onMouseUp={onPressOut}
      onPressOut={onPressOut}
    >
      <Svg
        width={viewportWidth}
        height={viewportHeight}
        style={{ backgroundColor: "rgb(220,220,220)", position: "absolute" }}
      >
        {links.map((link) => (
          <LinkRep key={link.id} {...link} />
        ))}
      </Svg>
      {rects.map((rect) => (
        <RectOverlay key={rect.id} {...rect} />
      ))}
      {links.map((link) => (
        <LinkOverlay key={link.id} {...link} />
      ))}
    </View>
  );
};
