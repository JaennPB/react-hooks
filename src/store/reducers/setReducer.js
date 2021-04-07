import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuth: false,
};

const setReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.SET_AUTH_STATE:
      return {
        ...state,
        isAuth: true,
      };
  }
  return state;
};

export default setReducer;
