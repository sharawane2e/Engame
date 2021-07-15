import * as actionTypes from "./loader-types";

const intialState = {
  loading: false,
  loaderText: "",
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_START:
      return { ...state, loading: true };
    case actionTypes.LOADING_END:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};

export default reducer;
