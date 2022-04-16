import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_GROUPS,
  GROUPS_ERR,
  CREATE_GROUP,
  SET_CURRENT,
  UPDATE_MESSAGES,
  GET_MESSAGES,
} from './types';

export const getGroups = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/room/');

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

export const getMessages = (id) => async (dispatch) => {
  console.log('messsages');
  try {
    const res = await axios.get(`/api/room/${id}`);

    dispatch({
      type: GET_MESSAGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUPS_ERR,
    });
  }
};

export const updateMessages = (username, text, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`/api/room/${id}`, { username, text }, config);

    dispatch({
      type: UPDATE_MESSAGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUPS_ERR,
    });
  }
};

export const setCurrentGroup = (group) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    payload: group,
  });
};

export const createGroup = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const users = [];
  const messages = [];

  try {
    const res = await axios.post(
      '/api/room/',
      { ...formData, users, messages },
      config
    );

    dispatch({
      type: CREATE_GROUP,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;

    if (error) {
      dispatch(setAlert(error.msg, 'danger'));
    }
    dispatch({
      type: GROUPS_ERR,
    });
  }
};
