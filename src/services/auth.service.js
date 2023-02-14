import api from "./api";
import TokenService from "./token.service";

class AuthService {
  google_login(token) {
    return api
      .getData("/google_auth", { params: { token } })
      .then(TokenService.trySaveToken);
  }

  login(username, password) {
    const form_data = new FormData();
    form_data.append("username", username);
    form_data.append("password", password);
    return api.postData("/login", form_data).then(TokenService.trySaveToken);
  }

  tokenLogin(token) {
    const headers = { Authorization: "Bearer " + token };
    return api
      .postData("/token_login", { headers })
      .then(TokenService.trySaveToken);
  }

  logout() {
    TokenService.clearUser();
  }

  register(email, password) {
    this.setLastEmail(email);
    return api.postData("/user", {
      email,
      password,
    });
  }

  setLastEmail(email) {
    localStorage.setItem("LastRegisteredEmail", email);
  }

  getLastEmail() {
    return localStorage.getItem("LastRegisteredEmail");
  }
}

export default new AuthService();
