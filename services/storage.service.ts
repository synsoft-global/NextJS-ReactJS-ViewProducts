class Storage {
  getItem(key) {
    const remember_me = localStorage.getItem("remember_me");
    if (remember_me) {
      return localStorage.getItem(key);
    } else {
      return localStorage.getItem(key);
    }
  }
  setItem(key, data) {
    const remember_me = localStorage.getItem("remember_me");
    if (remember_me) {
      return localStorage.setItem(key, data);
    } else {
      return localStorage.setItem(key, data);
    }
  }
  removeItem(key) {
    const remember_me = localStorage.getItem("remember_me");
    if (remember_me) {
      return localStorage.removeItem(key);
    } else {
      return localStorage.removeItem(key);
    }
  }
  clear() {
    const remember_me = localStorage.getItem("remember_me");
    if (remember_me) {
      return localStorage.clear();
    } else {
      return localStorage.clear();
    }
  }
}

const StorageApi = new Storage();

export default StorageApi;
