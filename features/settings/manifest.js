import React from "react";
import { Route } from "react-router-native";

import { SettingsRootView } from "./SettingsRootView-cmp";

export const id = "SettingsFeature";

export const routes = (
  <Route exact path="/settings" component={SettingsRootView} />
);
