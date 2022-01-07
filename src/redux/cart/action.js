import * as actionTypes from "./types";
import { ADD_TO_CART, CART_DETAILS, GET_FROM_CART } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import ApiRequest from "../../util/ApiRequest";

export const addToCart = (userData) => (dispatch) => {
  dispatch(loadingStart());

  ApiRequest.request(ADD_TO_CART, "POST", userData)
    .then((res) => {
      // dispatch({ type: actionTypes.CART_ADD_ITEM, payload: res.data });
      dispatch(getItemFromCart());
    })
    .finally(() => {
      dispatch(loadingStop());
    });
};

export const getItemFromCart =
  (cbFinally = undefined) =>
  (dispatch) => {
    // dispatch(loadingStart());
    ApiRequest.request(GET_FROM_CART, "GET")
      .then((res) => {
        dispatch({ type: actionTypes.CART_ITEM_GET, payload: res.data });
      })
      .catch((error) => {})
      .finally(() => {
        if (cbFinally && typeof cbFinally === "function") {
          cbFinally();
        }
      });
  };

export const updateCartIteam = (updatedid, plans) => (dispatch) => {
  ApiRequest.request(CART_DETAILS`${updatedid}/`, "PUT", plans).then((res) => {
    dispatch({ type: actionTypes.CART_ITEM_UPDATE, payload: res.data });
  });
};

export const removeFromCart = (productId) => (dispatch) => {
  if (productId) {
    ApiRequest.request(CART_DETAILS + `${productId}/`, "DELETE")
      .then((res) => {
        dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: productId });
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  }
};
