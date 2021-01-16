import React, { useContext } from "react";
import { useStorage } from "ezwn-storage-native/JSONAsyncStorage";

const STORAGE_KEY = "heuristic-settings";

const SettingsContext = React.createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings, loaded] = useStorage(
    STORAGE_KEY,
    () => ({
      "dataServerUrl": "http://B85M:9080",
      // "dataServerUrl": "http://ideapad:8080"
    })
  );

  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  }

  return loaded ? (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting
      }}
    >
      {children}
    </SettingsContext.Provider>
  ) : null;
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
