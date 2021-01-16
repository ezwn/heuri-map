import React, { useContext } from "react";
import { useStorage } from "ezwn-storage-native/JSONAsyncStorage";
import { mock } from "./mock";

// const map = "spring-rest";
const map = "spring-rest";

const STORAGE_KEY = "heuri-map-" + map;

const MapContext = React.createContext();

const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";

export function generateId(length = 10) {
  let str = "";
  const { length: n } = chars;
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * n));
  }
  return str;
}

export const MapProvider = ({ children }) => {
  const [map, setMap, loaded] = useStorage(STORAGE_KEY, () => mock);

  // Map
  // ---

  const getMapData = () => {
    return map;
  };

  // Rects
  // -----

  const createRect = (x, y) => {
    const rect = {
      id: "rect-" + generateId(),
      label: "Text",
      bounds: [x, y - 0.045, 0.3, 0.05],
      style: "note"
    };

    setMap({
      ...map,
      rects: [...map.rects, rect]
    });
  };

  const updateRect = (rectId, key, value) => {
    setMap({
      ...map,
      rects: map.rects.map((rect) =>
        rect.id === rectId ? { ...rect, [key]: value } : rect
      )
    });
  };

  const deleteRect = (rectId) => {
    setMap({ ...map, rects: map.rects.filter((rect) => rect.id !== rectId) });
  };

  // Links
  // -----

  const updateLinkPoint = (linkId, pointId, key, value) => {
    setMap({
      ...map,
      links: map.links.map((link) =>
        link.id !== linkId
          ? link
          : {
              ...link,
              points: link.points.map((point) =>
                point.id !== pointId ? point : { ...point, [key]: value }
              )
            }
      )
    });
  };

  const deleteLink = (linkId) => {
    setMap({ ...map, links: map.links.filter((link) => link.id !== linkId) });
  };

  const createLink = (selection) => {
    const id = "link-" + generateId();

    const newLink = {
      id: id,
      points: selection.map((rectId, i) => ({
        id: id + "-point-" + i,
        ref: rectId,
        location: [0.0, 0.0]
      })),
      lines: [
        { id: id + "-line", point1: id + "-point-0", point2: id + "-point-1" }
      ]
    };

    setMap({
      ...map,
      links: [...map.links, newLink]
    });
  };

  //
  // ---

  return loaded ? (
    <MapContext.Provider
      value={{
        getMapData,
        updateRect,
        createRect,
        deleteRect,
        updateLinkPoint,
        deleteLink,
        createLink
      }}
    >
      {children}
    </MapContext.Provider>
  ) : null;
};

export const useMap = () => {
  return useContext(MapContext);
};