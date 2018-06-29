import { firebase, googleAuthProvider } from '../firebase/firebase';
import { LOGIN, LOGOUT } from '../constants';

// --------------------------------------------------
// ASYNC ACTION CREATORS FOR AUTH REDUCER
// --------------------------------------------------

// will set uid if startLogin has been dispatch
export const login = uid => ({
  type: LOGIN,
  uid,
});

// return firebase authentications for promise chaining
export const startLogin = () => () =>
  // start the auth process & Pick login
  firebase.auth().signInWithPopup(googleAuthProvider);

// will unset uid if startLogout has been dispatch
export const logout = () => ({
  type: LOGOUT,
});

// return firebase authentications for promise chaining
export const startLogout = () => () => firebase.auth().signOut();
