import {
  LOADING,
  SELECT_USER_TYPE,
  SIGNUP_USER,
  SIGNIN_USER,
  SIGN_OUT_USER,
} from '../actionTypes';

export const signinUser = userInfo => dispatch => {
  dispatch({type: LOADING, payload: {isFullScreenLoading: true}});

  // Faking Loader
  setTimeout(() => {
    dispatch({
      type: SIGNIN_USER,
      payload: {
        ...userInfo,
        fullName: 'karthikeyan',
        mobileNumber: '55234345634',
        isAuthenticated: true,
      },
    });
    dispatch({type: LOADING, payload: {isFullScreenLoading: false}});
  }, 1500);
};

export const signupUser = userInfo => dispatch => {
  console.log(userInfo, 'action');
  dispatch({type: LOADING, payload: {isFullScreenLoading: true}});
  // Faking Loader
  setTimeout(() => {
    dispatch({
      type: SIGNUP_USER,
      payload: {...userInfo, isAuthenticated: true},
    });
    dispatch({type: LOADING, payload: {isFullScreenLoading: false}});
  }, 1500);
};

export const signOut = () => dispatch => {
  dispatch({type: LOADING, payload: {isFullScreenLoading: true}});
  setTimeout(() => {
    dispatch({
      type: SIGN_OUT_USER,
      payload: {isAuthenticated: false, isOnboardingDone: false},
    });
    dispatch({type: LOADING, payload: {isFullScreenLoading: false}});
  }, 1500);
};

export const selectUserType = user => dispatch => {
  dispatch({type: SELECT_USER_TYPE, payload: {currentUserType: user}});
};
