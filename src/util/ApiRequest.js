// import axios from "axios";
// import LocalStorageUtils from "./LocalStorageUtils";

// const instance = axios.create({
//     baseURL: process.env.REACT_APP_BASEURL,
// });

// const token = LocalStorageUtils.getToken();
// // console.log(token);

// if (token) {
//     instance.defaults.headers.common["Authorization"] = token;
// }

// export default {
//     request: async function(url, method) {
//         let response = null;

//         try {
//             const apiResponse = await instance(url, {

//                 method,

//             });
//             response = apiResponse.data;
// //            console.log(response);
//         } catch (error) {

//             if (error.response) {
//                 if (error.response.status === 401) {
//                     LocalStorageUtils.removeUserFromLocalStorage();
//                     let location = window.location.href.split("#");
//                     let baseUrl = location[0];
//                     window.location.href = `${baseUrl}#/login`;
//                 } else if (error.response.status === 400) {
//                     response = error.response.data;
//                 } else if (error.response.status === 404) {} else {
//                     // Toaster.error("Something went wrong");
//   //                  console.log("wrong");
//                 }
//             }
//         }
//         return response;
//     },

//     setAuthToken: function(token) {
//         if (token) {
//             instance.defaults.headers.common["Authorization"] = token;
//         } else {
//             delete instance.defaults.headers.common["Authorization"];
//         }
//     },
// };
