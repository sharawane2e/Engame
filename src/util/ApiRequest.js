import axios from "axios";
import LocalStorageUtils from "./LocalStorageUtils";
import Toaster from "../util/Toaster";

const instance = axios.create({
  baseURL: process.env.REACT_APP_Dev_BaseUrl,
});

const token = LocalStorageUtils.getToken();

if (token) {
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token.access_token}`;
}

export default {
  request: async function (url, method, data, parses) {
    let response = null;
    try {
      const apiResponse = await instance(url, {
        method,
        data,
        parses,
      });
      response = apiResponse.data;
    } catch (error) {
      // console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          LocalStorageUtils.removeUserFromLocalStorage();
          let location = window.location.href.split("#");
          let baseUrl = location[0];
          localStorage.removeItem("auth");
          window.location.href = `${baseUrl}#/`;
          //window.location.reload();
        } else if (error.response.status === 400) {
          response = error.response.data;
          Toaster.error("Something went wrong", "topCenter");
        } else if (error.response.status === 404) {
          localStorage.removeItem("auth");
          // Toaster.error("Something went wrong");
        } else {
          // Toaster.error("Something went wrong");
          //                  console.log("wrong");
        }
      }
    }
    return response;
  },

  setAuthToken: function (token) {
    if (token) {
      // console.log("token" , token)
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.access_token}`;
    } else {
      delete instance.defaults.headers.common["Authorization"];
    }
  },
};
