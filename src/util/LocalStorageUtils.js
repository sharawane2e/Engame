class LocalStorageUtils {

    static #userToken = "012123asd";

    static getUserFromLocalStorage() {
        return JSON.parse(localStorage.getItem(this.#userToken));
    }
    static getToken() {
        const user = this.getUserFromLocalStorage();
        console.log(user);
        if (user) {
            return user.Token;
        } else {
            return undefined;
        }
    }

    static isUserloggedIn = () => {
        if (this.getToken()) return true;
        return false;
    }
}

export default LocalStorageUtils;