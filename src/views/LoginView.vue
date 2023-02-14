<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'createAccount' }"
          >Create Account</router-link
        >
      </p>
      <h4>Login</h4>
      <div class="inputs">
        <div class="input">
          <input
            type="email"
            placeholder="Email Address"
            class="rounded"
            v-model="email"
          />
          <i class="fa-solid fa-envelope icon"></i>
        </div>
        <div class="input">
          <input
            type="password"
            placeholder="Password"
            class="rounded"
            v-model="password"
          />
          <i class="fa-solid fa-lock icon"></i>
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="login" class="btn mt-6">Login</button>
      <br />
      <div id="google_login"></div>
    </form>
    <div
      class="background flex flex-col justify-center items-center p-5"
      :class="[{ 'h-screen': !mobile }, { 'pt-32': mobile }]"
    ></div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";
import googleOneTap from "google-one-tap";
import getEnv from "@/utils/env";
import TokenService from "@/services/token.service";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: null,
      errorMsg: "",
      mobile: false,
    };
  },
  mounted() {
    const user = TokenService.getUser();
    if (user) {
      this.$router.push({ name: "home" });
    } else {
      const options = {
        client_id: getEnv("VUE_APP_GOOGLE_OAUTH_CLIENT_ID"),
        context: "signin",
        prompt_parent_id: "google_login",
      };
      googleOneTap(options, (response) => {
        AuthService.google_login(response.credential)
          .then(() => {
            this.$router.push({ name: "getStarted" });
          })
          .catch((e) => {
            this.error = true;
            this.errorMsg =
              e?.response?.data?.detail || "An unknown error occurred";
            console.log("Error logging in", e);
          });
      });
    }
  },
  methods: {
    async login() {
      if (!this.email) {
        this.error = true;
        this.errorMsg = "Please provide an email address";
        return;
      }
      if (!this.password) {
        this.error = true;
        this.errorMsg = "Please provide a password";
        return;
      }
      AuthService.login(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "getStarted" });
        })
        .catch((e) => {
          this.error = true;
          const errorMsg =
            e?.response?.data?.detail || "An unknown error occurred";
          this.errorMsg = errorMsg;
          console.log("Error logging in", e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }
  .register {
    h2 {
      max-width: 350px;
    }
  }
  .login-register {
    margin-bottom: 32px;
    .router-link {
      color: #ff4d3d;
    }
  }
  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }
    h4 {
      text-align: center;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }
    .inputs {
      width: 100%;
      max-width: 350px;
      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;
          &:focus {
            outline: none;
          }
        }
        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
      }
    }
    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 48px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;
      &:hover {
        border-color: #303030;
      }
    }
  }
  .background {
    flex: 2;
    background-image: url("@/assets/logo.png");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    @media (max-width: 900px) {
      display: none;
    }
    h1 {
      color: #f2f2f2;
    }
  }
}
.signInBtn {
  background-color: orange;
  transition: 0.5s ease all;
  padding: 6px 24px;
  font-size: 14px;
  font-weight: 400;
}
.error {
  color: #e2000b;
  text-align: center;
}
</style>
