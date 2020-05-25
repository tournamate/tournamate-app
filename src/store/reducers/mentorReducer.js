import {ADD_SKILLS, REMOVE_SKILLS, ADD_DETAILS} from '../actionTypes';

function removeSkill(category, skill, skills) {
  return {
    ...skills,
    [category]: skills[category].filter(obj => obj !== skill),
  };
}

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_SKILLS:
      return {
        ...state,
        skills: action.payload,
      };
    case REMOVE_SKILLS:
      return {
        ...state,
        skills: removeSkill(
          action.payload.category,
          action.payload.skill,
          state.skills,
        ),
      };
    case ADD_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
