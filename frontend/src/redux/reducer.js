// reducer.js

const initialState = {
  user: null,
  // other states
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
      };
    // other cases
    default:
      return state;
  }
};

export default rootReducer;
