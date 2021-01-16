import React from "react";

import { MapProvider } from "shared/map/Map-ctx";

import * as MapFeature from "features/map/manifest";
import * as SettingsFeature from "features/settings/manifest";
import { SettingsProvider } from "shared/settings/Settings-ctx.js";

export const features = [MapFeature, SettingsFeature];

export const GlobalProvider = ({ children }) => (
  <SettingsProvider>
    <MapProvider>{children}</MapProvider>
  </SettingsProvider>
);
