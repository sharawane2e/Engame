import axios from "axios";
import LocalStorageUtils from "./LocalStorageUtils";
//import Toaster from "../util/Toaster";
import LocalStorageType from "../config/LocalStorageType";

const instance = axios.create({
  baseURL: process.env.REACT_APP_Dev_BaseUrl,
});

const ApiRequest = {
  request: async function (url, method, data, parses) {
    let response = null;
    const token = LocalStorageUtils.getToken();
    if (token) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.access_token}`;
    } else {
      delete instance.defaults.headers.common["Authorization"];
    }
    try {
      const apiResponse = await instance(url, {
        method,
        data,
        parses,
      });
      response = apiResponse.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          LocalStorageUtils.setLocalStorage(LocalStorageType.CLEAR);
          window.location.reload();
        } else if (error.response.status === 400) {
          response = error.response.data;
          // Toaster.error("400");
        } else if (error.response.status === 404) {
          // Toaster.error("404");
        } else if (error.response.status === 500) {
          // Toaster.error("500");
        } else {
          // Toaster.error("Something went wrong");
        }
      }
    }
    return response;
  },
};

export default ApiRequest;
