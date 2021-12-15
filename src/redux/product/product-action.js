import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "./products";
import { FILTER_WIDGET_LIST, WIDGET_LIST } from "../../config/ApiUrl";
import ApiRequest from "../../util/ApiRequest";

export const listProducts = (filterData) => (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });

  if (filterData?.isFilter) {
    ApiRequest.request(FILTER_WIDGET_LIST, "POST", filterData)
      .then((res) => {
        if (res.status) {
          dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
        }
      })
      .catch((error) => {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
      });
  } else {
    ApiRequest.request(WIDGET_LIST, "GET")
      .then((res) => {
        if (res.status) {
          dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
        }
      })
      .catch((error) => {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
      });
  }

  //   ApiRequest.request(FILTER_WIDGET_LIST, "POST", filterData)
  //     .then((res) => {
  //       if (res.status) {
  //         dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
  //       }
  //     })
  //     .catch((error) => {
  //       dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  //     });
};
