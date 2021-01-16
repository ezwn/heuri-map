import React from "react";

import { VerticalBorderLayout } from "ezwn-ux-native/layouts/VerticalBorderLayout-cmp";
import { TitleBar } from "ezwn-ux-native/app-components/TitleBar-cmp";
import { MapComponent } from "./components/Map-cmp";
import { TouchMotionProvider } from "./contexts/TouchMotion-ctx";
import { ViewportProvider } from "shared/viewport/Viewport-ctx";
import { SelectionProvider } from "./contexts/Selection-ctx";

export const MapRoot = () => {
  return (
    <VerticalBorderLayout
      top={<TitleBar text="Map" left={<TitleBar.SettingsButton />} />}
    >
      <ViewportProvider format={9 / 16}>
        <TouchMotionProvider>
          <SelectionProvider>
            <MapComponent />
          </SelectionProvider>
        </TouchMotionProvider>
      </ViewportProvider>
    </VerticalBorderLayout>
  );
};
