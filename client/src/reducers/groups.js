import {
  GET_GROUPS,
  GROUPS_ERR,
  CREATE_GROUP,
  SET_CURRENT,
} from '../actions/types';

const initialState = {
  groups: [],
  currentGroup: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
      };
    case CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };

    case SET_CURRENT:
      return {
        ...state,
        currentGroup: action.payload,
      };

    case GROUPS_ERR:
      return {
        ...state,
      };

    default:
      return state;
  }
}
