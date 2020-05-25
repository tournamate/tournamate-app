import {
  LOADING,
  AUTHENTICATED,
  SELECT_USER_TYPE,
  SIGNUP_USER,
  SIGNIN_USER,
  SIGN_OUT_USER,
  COMPLETE_ONBOARDING,
} from '../actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case SIGNIN_USER:
      return {
        ...state,
        ...action.payload,
      };
    case AUTHENTICATED:
      return {
        ...state,
        ...action.payload,
      };
    case SELECT_USER_TYPE:
      return {
        ...state,
        ...action.payload,
      };
    case SIGNUP_USER:
      return {
        ...state,
        ...action.payload,
      };
    case SIGN_OUT_USER:
      return {
        ...action.payload,
      };
    case COMPLETE_ONBOARDING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
