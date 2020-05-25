const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_ORDER':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
