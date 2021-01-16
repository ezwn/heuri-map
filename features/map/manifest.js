import React from "react";
import { Route } from "react-router-native";

import { NavigationMenu } from "ezwn-ux-native/app-components/NavigationMenu-cmp";

import { MapRoot } from "./MapRoot-cmp";
import { FontAwesomeTextIcon } from "ezwn-ux-native/text-icons/FontAwsomeTextIcon-cmp";

export const id = "MapFeature";

export const routes = (
  <React.Fragment>
    <Route exact path="/map">
      <MapRoot />
    </Route>
  </React.Fragment>
);

export const navigationMenuItems = (
  <>
    <NavigationMenu.Choice routerPush="/map">
      <FontAwesomeTextIcon fontAwesomeIcon="faCalendarPlus" text="Map" />
    </NavigationMenu.Choice>
  </>
);
