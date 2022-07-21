import { createContext, useReducer } from "react";
// Import Reducer
import webXBuilderReducer from "./reducer";
// Import Actions
import { TOGGLE_SIDEBAR_CONTENT } from "./actions";

const initialState = {
  sideBarExpanded: false,
};
export const WebXBuilderContext = createContext();

const WebXProvider = ({ children }) => {
  const [state, dispatch] = useReducer(webXBuilderReducer, initialState);
  console.log("State from context def: ", state);
  console.log("State from context def: ", dispatch);

  // Update sideBarExpanded
  const updateSideBarExpanded = (sideBarExpanded) => {
    dispatch({ type: TOGGLE_SIDEBAR_CONTENT, payload: sideBarExpanded });
  };

  return (
    <WebXBuilderContext.Provider value={(state, updateSideBarExpanded)}>
      {children}
    </WebXBuilderContext.Provider>
  );
};

export default WebXProvider;
