import {
  GET_GROUPS,
  GET_MESSAGES,
  GROUPS_ERR,
  CREATE_GROUP,
  SET_CURRENT,
  UPDATE_MESSAGES,
} from '../actions/types';

const initialState = {
  groups: [],
  currentGroup: null,
  loading: true,
  storedMessages: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
        loading: false,
      };
    case GET_MESSAGES:
      return {
        ...state,
        storedMessages: action.payload,
        loading: false,
      };
    case CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
        loading: false,
      };
    case UPDATE_MESSAGES:
      return {
        ...state,
        loading: false,
      };

    case SET_CURRENT:
      return {
        ...state,
        currentGroup: action.payload,
        loading: false,
      };

    case GROUPS_ERR:
      return {
        ...state,
      };

    default:
      return state;
  }
}
