import axiosInstance from "./api";
import TokenService from "./token.service";
import AuthService from "@/services/auth.service";

const setup = (app) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
        config.headers["Access-Control-Allow_Origin"] = "Bearer " + token; // for Spring Boot back-end
        // for Spring Boot back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url === "/refresh") {
        await AuthService.logout();
        location.href = "/login";
        return Promise.reject(err);
      }
      if (originalConfig.url === "/login") return Promise.reject(err);

      if (err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await axiosInstance.post("/refresh", null, {
              params: { token: TokenService.getLocalRefreshToken() },
            });
            const { accessToken } = rs.data;
            TokenService.updateLocalAccessToken(accessToken);
            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      const kind = err.response?.data?.detail?.kind;

      if (kind === "subscription expired") {
        app.config.globalProperties.$toast.add({
          severity: "warn",
          summary: err.response.statusText,
          detail: err.response?.data?.detail.msg,
          life: 3000,
        });
        console.log("Redirect to pay for subscription here?");
        return;
      }

      return Promise.reject(err);
    }
  );
};
export default setup;
