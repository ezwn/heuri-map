import React, { useContext, useState } from "react";
import { stopEvent } from "shared/stopEvent";

/**
 * SelectionContext
 */
const SelectionContext = React.createContext();

export const SelectionProvider = ({ children }) => {
  const [selection, setSelection] = useState([]);

  const addToSelection = (id) =>
    setSelection((selection) => [
      ...selection.filter((selected) => selected !== id),
      id
    ]);

  const removeFromSelection = (id) =>
    setSelection((selection) =>
      selection.filter((selected) => selected !== id)
    );

  const onPress = (event, id) => {
    if (selection.find((selected) => selected === id)) {
      removeFromSelection(id);
    } else {
      addToSelection(id);
    }

    stopEvent(event);
  };

  const isSelected = (id) => {
    return selection.indexOf(id) !== -1;
  };

  return (
    <SelectionContext.Provider
      value={{
        selection,
        isSelected,
        onPress,
        setSelection,
        addToSelection,
        removeFromSelection
      }}
    >
      {React.Children.only(children)}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  return useContext(SelectionContext);
};
