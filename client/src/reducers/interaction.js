import { TOGGLE_SIDEBAR } from "../actions/types";

const initialState = {
  openSidebar: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        openSidebar: !state.openSidebar,
      };
    default:
      return state;
  }
}
