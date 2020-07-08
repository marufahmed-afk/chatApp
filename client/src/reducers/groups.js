import { GET_GROUPS, GROUPS_ERR } from "../actions/types";

const initialState = {
  groups: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
      };

    case GROUPS_ERR:
      return {
        ...state,
        groups: null,
      };

    default:
      return state;
  }
}
