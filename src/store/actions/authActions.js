import {
  LOADING,
  SELECT_USER_TYPE,
  SIGNUP_USER,
  SIGNIN_USER,
  SIGN_OUT_USER,
} from '../actionTypes';

export const signinUser = (userInfo) => (dispatch) => {
  // Faking Loader
  dispatch({
    type: SIGNIN_USER,
    payload: {
      ...userInfo,
    },
  });
};

export const signupUser = (userInfo) => (dispatch) => {
  dispatch({
    type: SIGNUP_USER,
    payload: {...userInfo, isAuthenticated: true},
  });
};

export const signOut = () => (dispatch) => {
  dispatch({type: LOADING, payload: {isFullScreenLoading: true}});
  setTimeout(() => {
    dispatch({
      type: SIGN_OUT_USER,
      payload: {isAuthenticated: false, isOnboardingDone: false},
    });
    dispatch({type: LOADING, payload: {isFullScreenLoading: false}});
  }, 1500);
};

export const selectUserType = (user) => (dispatch) => {
  dispatch({type: SELECT_USER_TYPE, payload: {currentUserType: user}});
};
