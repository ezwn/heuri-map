import React from "react";

import { VerticalBorderLayout } from "ezwn-ux-native/layouts/VerticalBorderLayout-cmp";
import { TitleBar } from "ezwn-ux-native/app-components/TitleBar-cmp";
import { ListItem } from "ezwn-ux-native/list/ListItem-cmp";
import { useMapIndex } from "shared/map-index/MapIndex-ctx";
import { useHistory } from "react-router-native";

export const MapIndexRoot = () => {
  const { maps } = useMapIndex();

  return (
    <VerticalBorderLayout
      top={<TitleBar text="Index" left={<TitleBar.SettingsButton />} />}
    >
      {maps.map((m) => (
        <MapButton key={m.id} {...m} />
      ))}
    </VerticalBorderLayout>
  );
};

export const MapButton = ({ id, label }) => {
  const { setCurrentMap } = useMapIndex();
  const history = useHistory();

  const mapSelect = () => {
    setCurrentMap(id);
    history.replace("/map");
  };

  return (
    <ListItem onPress={mapSelect}>
      <ListItem.Title>{label}</ListItem.Title>
    </ListItem>
  );
};
