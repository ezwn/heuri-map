import React from "react";
import { useMap } from "shared/map/Map-ctx";
import Svg from "react-native-svg";
import { useViewport } from "features/map/contexts/Viewport-ctx";
import { LinkSvg } from "./LinkSvg-cmp";
import { LinkOverlay } from "./LinkOverlay-cmp";
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
  const { createRect } = useMap();
  const { setSelection } = useSelection();

  const { rects, links } = mapData;

  const onPressIn = (event) => {
    if (draggedElementId === mapId) {
      event.stopPropagation();
      event.preventDefault();

      const { clientX, clientY } = event;
      const newRect = createRect(
        clientX / viewportWidth,
        clientY / viewportHeight
      );
      if (newRect) {
        setSelection([newRect.id]);
      } else {
        console.error("Something went wrong with rectangle creation");
      }
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
          <LinkSvg key={link.id} {...link} />
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
