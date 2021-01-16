import React from "react";
import { NativeRouter, Redirect } from "react-router-native";

import { VerticalBorderLayout } from "ezwn-ux-native/layouts/VerticalBorderLayout-cmp";

import { AppViewport } from "ezwn-ux-native/layouts/AppViewport-cmp";
import { AppProvider } from "ezwn-react-app/App-ctx";

import { features, GlobalProvider } from "./features";

import { AppRoutes } from "ezwn-react-app/AppRoutes-cmp";
import { AppNavigationMenu } from "ezwn-react-app-ux-native/AppNavigationMenu-cmp";
import { ScrollView } from "react-native";

const HeuristicApp = () => (
  <AppViewport>
    <VerticalBorderLayout bottom={<AppNavigationMenu />}>
        <AppRoutes />
    </VerticalBorderLayout>
  </AppViewport>
);

export const ContextualizedApp = () => (
  <AppProvider features={features}>
    <NativeRouter>
      <Redirect from="/" to="/map" />
      <GlobalProvider>
        <HeuristicApp />
      </GlobalProvider>
    </NativeRouter>
  </AppProvider>
);
