class LocalStorageUtils {
  static #userToken = "012123asd";

  static getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem("auth"));
  }

  // static removeUserFromLocalStorage() {
  //   localStorage.removeItem("auth");
  // }

  static getToken() {
    const user = this.getUserFromLocalStorage();
    //console.log("user", user);
    // console.log(user);
    if (user) {
      return user.token;
    } else {
      return undefined;
    }
  }

  static isUserloggedIn = () => {
    if (this.getToken()) return true;
    return false;
  };
}

export default LocalStorageUtils;
