import * as actionTypes from "./loader-types";

export const loadingStart = () => {
  return {
    type: actionTypes.LOADING_START,
  };
};
export const loadingStop = () => {
  return {
    type: actionTypes.LOADING_END,
  };
};
