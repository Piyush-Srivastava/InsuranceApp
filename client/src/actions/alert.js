import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// action
export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4(); // unique long string
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id}
  })
}