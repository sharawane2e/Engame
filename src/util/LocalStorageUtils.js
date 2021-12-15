class LocalStorageUtils {
  static setLocalStorage(method, key, value) {
    if (method === "set") {
      localStorage.setItem(key, value);
    } else if (method === "remove") {
      localStorage.removeItem(key);
    } else if (method === "clear") {
      localStorage.clear();
    }
  }

  static getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem("auth"));
  }
  static getToken() {
    const user = this.getUserFromLocalStorage();
    if (user) {
      return user.token;
    } else {
      return undefined;
    }
  }
}

export default LocalStorageUtils;
