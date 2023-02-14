<template>
  <Toast position="bottom-right" />
  <div class="grid surface-section text-800">
    <router-view v-slot="{ Component }">
      <transition name="page-opacity" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </div>
</template>
<script>
import EventBus from "./common/EventBus";
import AuthService from "@/services/auth.service";

export default {
  components: {},
  data() {
    return {
      navigation: false,
    };
  },
  created() {},
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  },

  methods: {
    logOut() {
      AuthService.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
// colors
$main-color: #031624;
$secondary-color: rgb(145, 149, 197);
$accent-color: #5c4bda;
$accent-color-two: #e1c940;
$neutral-two: #575777;
$neutral-color: #f2f2f2;

@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "IBM Plex Sans", sans-serif;
}

body {
  background-color: $neutral-color;
  overflow-x: hidden !important;
}
.btn {
  display: inline;
  border: none;
  font-size: 1rem;
  font-weight: 400;
  color: black;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid;
  text-transform: uppercase;
  &:focus {
    outline: none;
  }
  &:hover {
    color: rgba(48, 48, 48, 0.7);
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.01);
    }
  }
}
.btn.cta {
  color: $accent-color;
  border-color: $accent-color;
}
h1 {
  color: $main-color;
  span {
    text-decoration: underline;
    color: $accent-color;
  }
}

.img-pop {
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }
}
.p-scrollpanel-bar .p-scrollpanel-bar-y {
  background-color: #1976d2 !important;
  opacity: 1;
  transition: background-color 0.3s;
}

.p-scrollpanel-bar:hover {
  background-color: #135ba1;
}

// Page Transition

.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: 350ms ease all;
}

.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
}
.primaryBtn {
  background-color: $accent-color !important;
  border-color: $secondary-color !important;
}
</style>
