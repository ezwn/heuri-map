import React from "react";

import { SettingsProvider } from "shared/settings/Settings-ctx.js";
import * as SettingsFeature from "features/settings/manifest";

import { MapIndexProvider } from "shared/map-index/MapIndex-ctx";
import * as MapIndexFeature from "features/map-index/manifest";

import { MapProvider } from "shared/map/Map-ctx";
import * as MapFeature from "features/map/manifest";

export const features = [SettingsFeature, MapIndexFeature, MapFeature];

export const GlobalProvider = ({ children }) => (
  <SettingsProvider>
    <MapIndexProvider>
      <MapProvider>{children}</MapProvider>
    </MapIndexProvider>
  </SettingsProvider>
);
