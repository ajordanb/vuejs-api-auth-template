import { createRouter, createWebHistory } from "vue-router";
import TokenService from "@/services/token.service";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import createAccountView from "@/views/CreateAccount.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home",
      // requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/create-account",
    name: "createAccount",
    component: createAccountView,
    meta: {
      title: "Create Account",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Template`;
  next();
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isGuestOnly = to.matched.some((record) => record.meta.guestOnly);

  const currentUser = TokenService.getUser();

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (isGuestOnly && currentUser) {
    next("/account");
  } else {
    next();
  }
});

export default router;
