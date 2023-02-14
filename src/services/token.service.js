class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }
  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
  }
  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  clearUser() {
    localStorage.removeItem("user");
  }

  trySaveToken = (tokenData) => {
    tokenData.accessToken && this.setUser(tokenData);
    return tokenData;
  };
}
export default new TokenService();
