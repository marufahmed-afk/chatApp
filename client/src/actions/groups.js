import axios from "axios";

import { GET_GROUPS, GROUPS_ERR } from "./types";

export const getGroups = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/room/");

    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUPS_ERR,
    });
  }
};
