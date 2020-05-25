import {
  ADD_SKILLS,
  REMOVE_SKILLS,
  ADD_DETAILS,
  LOADING,
  COMPLETE_ONBOARDING,
} from '../actionTypes';

export const addSkillsForMentors = skills => dispatch => {
  dispatch({type: ADD_SKILLS, payload: skills});
};

export const removeSkillsForMentors = data => dispatch => {
  dispatch({type: REMOVE_SKILLS, payload: data});
};

export const addMentorDetails = data => dispatch => {
  dispatch({type: LOADING, payload: {isFullScreenLoading: true}});
  dispatch({type: ADD_DETAILS, payload: data});
  setTimeout(() => {
    dispatch({type: LOADING, payload: {isFullScreenLoading: false}});
  }, 1000);
  dispatch({type: COMPLETE_ONBOARDING, payload: {isOnboardingDone: true}});
};
