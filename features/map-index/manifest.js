import React from "react";
import { Route } from "react-router-native";

import { NavigationMenu } from "ezwn-ux-native/app-components/NavigationMenu-cmp";

import { MapIndexRoot } from "./MapIndexRoot-cmp";
import { FontAwesomeTextIcon } from "ezwn-ux-native/text-icons/FontAwsomeTextIcon-cmp";

export const id = "MapIndexFeature";

export const routes = (
  <React.Fragment>
    <Route exact path="/index">
      <MapIndexRoot />
    </Route>
  </React.Fragment>
);

export const navigationMenuItems = (
  <>
    <NavigationMenu.Choice routerPush="/index">
      <FontAwesomeTextIcon fontAwesomeIcon="faFolderOpen" text="Index" />
    </NavigationMenu.Choice>
  </>
);
