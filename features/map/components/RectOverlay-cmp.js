import React, { useEffect, useState } from "react";
import { useMap } from "shared/map/Map-ctx";
import { Text, TextInput, View } from "react-native";
import { useViewport } from "features/map/contexts/Viewport-ctx";
import { useTouchMotion } from "../contexts/TouchMotion-ctx";
import {
  boundsIncreaseWidth,
  boundsTranslate,
  boundsCenterRefFrameToLeftTopRefFrame,
  boundsIncreaseHeight
} from "../utils/geom";
import { DraggablePointOverlay } from "./DraggablePointOverlay-cmp";
import { DeleteRectIcon } from "./DeleteRectIcon-cmp";
import { CreateLinkIcon } from "./CreateLinkIcon-cmp";
import { useSelection } from "../contexts/Selection-ctx";

const computeRectStyle = (selected = false, edited = false) => {
  const borderColor = edited
    ? "rgb(255,0,0)"
    : selected
    ? "rgb(0,0,255)"
    : "rgb(0,0,0)";
  return {
    backgroundColor: "rgb(255,255,255)",
    borderColor: borderColor,
    borderWidth: 2
  };
};

export const RectOverlay = ({ id, bounds, label }) => {
  const leftPointId = `${id}-left`;
  const rightPointId = `${id}-right`;
  const topPointId = `${id}-top`;
  const bottomPointId = `${id}-bottom`;

  const { toViewportBounds, fromViewportPoint } = useViewport();
  const { isSelected, addToSelection } = useSelection();

  const selected = isSelected(id);

  const {
    startDragging,
    motionTranslation,
    initialBounds,
    draggedElementId,
    hasBeenDragged
  } = useTouchMotion();
  const { updateRect } = useMap();

  useEffect(() => {
    if (
      initialBounds &&
      draggedElementId &&
      (motionTranslation[0] !== 0 || motionTranslation[1] !== 0)
    ) {
      const diagramTranslation = fromViewportPoint(motionTranslation);
      const [tx, ty] = diagramTranslation;

      switch (draggedElementId) {
        case id:
          updateRect(
            id,
            "bounds",
            boundsTranslate(initialBounds, diagramTranslation)
          );
          break;
        case leftPointId:
          updateRect(
            id,
            "bounds",
            boundsTranslate(boundsIncreaseWidth(initialBounds, -tx), [
              tx / 2,
              0
            ])
          );
          break;
        case rightPointId:
          updateRect(
            id,
            "bounds",
            boundsTranslate(boundsIncreaseWidth(initialBounds, tx), [tx / 2, 0])
          );
          break;
        case topPointId:
          updateRect(
            id,
            "bounds",
            boundsTranslate(boundsIncreaseHeight(initialBounds, -ty), [
              0,
              ty / 2
            ])
          );
          break;
        case bottomPointId:
          updateRect(
            id,
            "bounds",
            boundsTranslate(boundsIncreaseHeight(initialBounds, ty), [
              0,
              ty / 2
            ])
          );
          break;
      }
    }
  }, [
    initialBounds,
    draggedElementId,
    motionTranslation[0],
    motionTranslation[1]
  ]);

  const onPressIn = (event) => !selected && startDragging(event, id, bounds);

  const onPress = (event) => {
    if (!hasBeenDragged) {
      addToSelection(id);
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const projectedBounds = boundsCenterRefFrameToLeftTopRefFrame(
    toViewportBounds(bounds)
  );
  const [x, y, width, height] = projectedBounds;

  return (
    <View
      onMouseDown={onPressIn}
      onPressIn={onPressIn}
      onPress={onPress}
      onClick={onPress}
      style={{
        ...computeRectStyle(draggedElementId === id, selected),
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        display: "flex"
      }}
    >
      {selected ? (
        <RectEditionOverlay label={label} bounds={bounds} id={id} />
      ) : (
        <>
          <View style={{ flex: 1 }}></View>
          <Text
            style={{
              textAlignVertical: "center",
              textAlign: "center",
              adjustsFontSizeToFit: true
            }}
          >
            {label}
          </Text>
          <View style={{ flex: 1 }}></View>
        </>
      )}
    </View>
  );
};

export const RectEditionOverlay = ({ label, bounds, id }) => {
  const leftPointId = `${id}-left`;
  const rightPointId = `${id}-right`;
  const topPointId = `${id}-top`;
  const bottomPointId = `${id}-bottom`;

  const [newLabel, setNewLabel] = useState(label);
  const { updateRect, deleteRect, createLink } = useMap();
  const { toViewportBounds } = useViewport();

  const projectedBounds = boundsCenterRefFrameToLeftTopRefFrame(
    toViewportBounds(bounds)
  );
  const [x, y, width, height] = projectedBounds;

  const { selection, setSelection } = useSelection();

  const onLabelChanged = (newLabel) => {
    setNewLabel(newLabel);
  };

  useEffect(
    () => () => {
      if (label !== newLabel) {
        updateRect(id, "label", newLabel);
      }
    },
    [newLabel, label]
  );

  return (
    <>
      <DeleteRectIcon location={[width, 0]} onActivate={() => deleteRect(id)} />
      {selection.length > 1 && (
        <CreateLinkIcon
          location={[width - 40, 0]}
          onActivate={() => {
            const newLink = createLink(selection);
            if (newLink) {
              setSelection([newLink.id]);
            } else {
              console.error("Something went wrong with createLink", selection);
            }
          }}
        />
      )}
      <DraggablePointOverlay
        id={leftPointId}
        location={[0, height / 2]}
        initialBounds={bounds}
      />
      <DraggablePointOverlay
        id={rightPointId}
        location={[width - 3, height / 2]}
        initialBounds={bounds}
      />
      <DraggablePointOverlay
        id={topPointId}
        location={[width / 2, 0]}
        initialBounds={bounds}
      />
      <DraggablePointOverlay
        id={bottomPointId}
        location={[width / 2, height - 3]}
        initialBounds={bounds}
      />
      <TextInput
        onMouseDown={(event) => event.stopPropagation()}
        multiline={true}
        blurOnSubmit={true}
        autoFocus={true}
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          textAlignVertical: "center",
          textAlign: "center",
          adjustsFontSizeToFit: true,
          flex: 1
        }}
        value={newLabel}
        onChangeText={onLabelChanged}
      />
    </>
  );
};
