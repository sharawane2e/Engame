class LocalStorageUtils {
  // static setUserIntoLocalStorage(user) {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }

  static getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem("auth"));
  }

  static removeUserFromLocalStorage() {
    localStorage.removeItem("auth");
  }

  static setLocalStorage(method, key, value) {
    if (method == "set") {
      localStorage.setItem(key, value);
    } else if (method == "remove") {
      localStorage.removeItem(key);
    } else if (method == "clear") {
      localStorage.clear();
    }
  }

  static getToken() {
    const user = this.getUserFromLocalStorage();
    //console.log("user", user);
    if (user) {
      return user.token;
    } else {
      return undefined;
    }
  }

  // static isUserloggedIn = () => {
  //   if (this.getToken()) return true;
  //   return false;
  // };
}

export default LocalStorageUtils;
