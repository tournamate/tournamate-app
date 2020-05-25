import {combineReducers} from 'redux';
import AuthReducer from './authReducers';
import HomeReducer from './homeReducers';
import MentorReducer from './mentorReducer';

export default combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
  mentor: MentorReducer,
});
