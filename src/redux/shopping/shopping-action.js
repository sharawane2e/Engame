// import * as actionTypes from "./shopping-types";

// // export const addToCart = (productId) => {
// //   return {
// //     type: actionTypes.ADD_TO_CART,
// //     payload: {
// //       id: productId,
// //     },
// //   };
// // };

// // export const removeFromCart = (itemId) => {
// //   return {
// //     type: actionTypes.REMOVE_FROM_CART,
// //     payload: {
// //       id: itemId,
// //     },
// //   };
// // };

// // export const adjustQty = (itemId, value) => {
// //   return {
// //     type: actionTypes.ADJUST_QTY,
// //     payload: {
// //       id: itemId,
// //       qty: value,
// //     },
// //   };
// // };

// // export const loadCurrentItem = (item) => {
// //   return {
// //     type: actionTypes.LOAD_CURRENT_ITEM,
// //     payload: item,
// //   };
// // };

// export const addToCart = (productId, qty) => async (dispatch, getState) => {
//   let auth = localStorage.getItem("auth");
//   let res = JSON.parse(auth);
//   const { data } = await axios.get(`${BASE_URL}widget/detail/${productId}/`);
//   dispatch({
//     type: actionTypes.CART_ADD_ITEM,
//     payload: {
//       name: data.name,
//       image: data.imgUrl,
//       widgetType: data.widget_type,
//       price: data.price,
//       currency: data.currency,
//       product: data.id,
//       qty: 1,
//     },
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

//   const user = {
//     user: res.token.user.pk,
//     widget: productId,
//     plan_type: "hits",
//     plan_value: "2700",
//     price: 110,
//     currency: "$",
//   };
//   fetch(BASE_URL + "cart/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${res.token.access_token}`,
//     },
//     body: JSON.stringify(user),
//   })
//     .then((response) => response.json())
//     .then((result) => console.log(result));
// };

// // GET ITEM FROM CART

// export const getItemFromCart = () => async (dispatch) => {
//   let auth = localStorage.getItem("auth");
//   let res = JSON.parse(auth);
//   const { data } = await axios.get(BASE_URL + "cart/", {
//     headers: { Authorization: `Bearer ${res.token.access_token}` },
//   });
//   dispatch({ type: actionTypes.GET_CART_ITEM, payload: data });
// };

// export const removeFromCart = (productId) => (dispatch, getState) => {
//   dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: productId });
//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// };

import * as actionTypes from "./types";
import axios from "axios";
import { BASE_URL } from "../../config/ApiUrl";
import React, { useState, useEffect } from "react";

export const addToCart = (user, qty) => async (dispatch, getState) => {
  // let auth = localStorage.getItem("auth");
  // let res = JSON.parse(auth);
  // alert(productId);
  // const { data } = await axios.get(`${BASE_URL}widget/detail/${productId}/`);
  // console.log("add data", data);
  // dispatch({
  //   type: actionTypes.CART_ADD_ITEM,
  //   payload: {
  //     name: data.name,
  //     image: data.imgUrl,
  //     widgetType: data.widget_type,
  //     price: data.price,
  //     currency: data.currency,
  //     product: data.id,
  //     qty: 1,
  //   },
  // });

  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  // const user = {
  //   user: res.token.user.pk,
  //   widget: productId,
  //   plan_type: "hits",
  //   plan_value: "15",
  //   price: 110,
  //   currency: "$",
  // };

  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);

  fetch(BASE_URL + "cart/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${res.token.access_token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((result) => {
      // history.push("/");
      // console.log("add to cart", result);
      // dispatch(addToCart(result.id));
      // dispatch(addToCart(result.id));
      // onClose();
      console.log("curent rtesult", result.id);
      dispatch({ type: actionTypes.GET_CART_ITEM, payload: result.id });
    });
};

// GET ITEM FROM CART

export const getItemFromCart = () => async (dispatch) => {
  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);
  const { data } = await axios.get(BASE_URL + "cart/", {
    headers: { Authorization: `Bearer ${res.token.access_token}` },
  });
  dispatch({ type: actionTypes.GET_CART_ITEM, payload: data });
};

export const removeFromCart = (productId) => async (dispatch) => {
  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);
  const { data } = await axios.delete(BASE_URL + `cart/detail/${productId}`, {
    headers: { Authorization: `Bearer ${res.token.access_token}` },
  });
  dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: productId });
};
