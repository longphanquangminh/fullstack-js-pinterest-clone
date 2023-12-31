export const userLocalStorage = {
  get: () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  },
  set: (userDataContentInfo: any) => {
    const dataJson = JSON.stringify(userDataContentInfo);
    localStorage.setItem("user", dataJson);
  },
  remove: () => {
    localStorage.removeItem("user");
  },
};
