import { LOGIN, LOGOUT } from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        uid: action.uid, // set authenticated uid
      };
    case LOGOUT:
      return {}; // unset authenticated uid
    default:
      return state;
  }
};
