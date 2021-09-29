import * as actionTypes from "./types";
// import axios from "axios";
import { ADD_CART, CART_DETAIL } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import ApiRequest from "../../util/ApiRequest";

export const addToCart = (userData) => (dispatch) => {
  dispatch(loadingStart());
  ApiRequest.request(ADD_CART, "POST", userData)
    .then((res) => {
      dispatch({ type: actionTypes.CART_ADD_ITEM, payload: res });
    })
    .catch((error) => {
      // this.setState({ disableSubmit: false });
      console.log(error);
    })
    .finally(() => {
      dispatch(loadingStop());
    });
};

export const getItemFromCart = () => (dispatch) => {
  dispatch(loadingStart());
  ApiRequest.request(ADD_CART, "GET")
    .then((res) => {
      dispatch({ type: actionTypes.CART_ITEM_GET, payload: res });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      dispatch(loadingStop());
    });
};

export const updateCartIteam = (updatedid, plans) => (dispatch) => {
  dispatch(loadingStart());

  ApiRequest.request(CART_DETAIL`${updatedid}/`, "PUT", plans)
    .then((res) => {
      dispatch({ type: actionTypes.CART_ITEM_UPDATE, payload: res });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      dispatch(loadingStop());
    });
};

export const removeFromCart = (productId) => (dispatch) => {
  dispatch(loadingStart());
  ApiRequest.request(CART_DETAIL + `${productId}/`, "DELETE")
    .then((res) => {
      dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: res });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      dispatch(loadingStop());
    });
};
