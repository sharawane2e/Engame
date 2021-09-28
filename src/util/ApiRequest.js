import axios from "axios";
import LocalStorageUtils from "./LocalStorageUtils";

const instance = axios.create({
  baseURL: process.env.REACT_APP_Dev_BaseUrl,
});
//console.log("instance", instance);

const token = LocalStorageUtils.getToken();
//console.log("token",token.access_token)
if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token.access_token}`;
}

export default {
  request: async function (url, method, data, parses) {
    let response = null;
     //console.log("url=", url);
    //console.log("method=", method);
    console.log("data=", data);
    // console.log("parses=", parses);
    try {
     // console.log(apiResponse);
      const apiResponse = await instance(url, {
        method,
        data,
        parses,
      });
      response = apiResponse.data;
      //console.log(response);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          LocalStorageUtils.removeUserFromLocalStorage();
          let location = window.location.href.split("#");
          let baseUrl = location[0];
          window.location.href = `${baseUrl}#/`;
        } else if (error.response.status === 400) {
           response = error.response.data;
        } else if (error.response.status === 404) {
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
      instance.defaults.headers.common["Authorization"] = `Bearer ${token.access_token}`;
    } else {
      delete instance.defaults.headers.common["Authorization"];
    }
  },
};
