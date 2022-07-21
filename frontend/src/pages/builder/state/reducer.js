import { TOGGLE_SIDEBAR_CONTENT } from "./actions";

/**
 * @typedef {Object} Action
 * @property {string} type
 * @property {any} payload
 */

/**
 *
 * @param {any} state
 * @param {Action} action
 */
const webXBuilderReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR_CONTENT:
      console.log("Update from reduce");
      return { ...state, sideBarExpanded: action.payload };
    default:
      return state;
  }
};

export default webXBuilderReducer;
