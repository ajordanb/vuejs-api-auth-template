import api from "./api";
import getEnv from "@/utils/env";
class UserService {
  get() {
    return api.getData("/user");
  }
  forgot_password(email) {
    return api.postData("/user/forgot_password", {
      email,
      base_url: getEnv("VUE_APP_API") + "/forgot",
    });
  }
  reset_password(password) {
    return api.postData("/user/forgot_password", { password });
  }
  send_verify_email(email) {
    return api.post("/user/send_verification_email", {
      email,
      base_url: window.location.origin + "/verify",
    });
  }
  verify_email(token) {
    return api.post("/user/verify_email", null, { params: { token } });
  }
}
export default new UserService();
