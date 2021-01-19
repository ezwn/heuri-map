import React, { useContext, useState } from "react";
import { useStorage } from "ezwn-storage-native/JSONAsyncStorage";
import { mock } from "./mock";

const STORAGE_KEY = "heuri-map-index";

const MapIndexContext = React.createContext();

export const MapIndexProvider = ({ children }) => {
  const [maps, setMaps, loaded] = useStorage(STORAGE_KEY, () => mock);
  const [currentMap, setCurrentMap] = useState("default");

  return loaded ? (
    <MapIndexContext.Provider
      value={{
        maps,
        currentMap,
        setCurrentMap
      }}
    >
      {children}
    </MapIndexContext.Provider>
  ) : null;
};

export const useMapIndex = () => {
  return useContext(MapIndexContext);
};
