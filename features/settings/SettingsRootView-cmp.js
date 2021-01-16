import React from "react";
import { Text } from "react-native";

import { VerticalBorderLayout } from "ezwn-ux-native/layouts/VerticalBorderLayout-cmp";
import { TitleBar } from "ezwn-ux-native/app-components/TitleBar-cmp";
import { Field } from "ezwn-ux-native/forms/Field-cmp";
import { TextInput } from "ezwn-ux-native/forms/TextInput-cmp";
import { useSettings } from "shared/settings/Settings-ctx";

export const SettingsRootView = () => {

  const { settings, updateSetting } = useSettings();

  return (
    <VerticalBorderLayout
      top={<TitleBar text="Settings" left={<TitleBar.BackButton />} />}
    >
      <Field>
        <Text>Data server url:</Text>
        <TextInput value={settings.dataServerUrl} onChange={(value) => updateSetting("dataServerUrl", value)} />
      </Field>
    </VerticalBorderLayout>
  );
};
