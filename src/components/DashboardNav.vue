<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-8 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"
      >
        <router-link
          :to="{ name: 'home' }"
          class="flex justify-between items-center mb-8"
        >
          <img src="@/assets/logo.png" alt="logo" class="w-1/4" />
          <h5>Name</h5>
        </router-link>
        <h6 class="orgName"></h6>
        <hr class="my-12 md:min-w-full" />
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="flex" v-for="(item, index) in NavItems" :key="index">
            <router-link
              :to="{ name: item.path }"
              class="mb-4 w-full img-pop rounded py-2 px-4"
              :class="{ active: route === item.path }"
            >
              <div class="flex items-center">
                <i :class="item.icon" class="mr-2"></i>

                {{ item.name }}
              </div>
            </router-link>
          </li>
        </ul>
        <hr class="my-12 md:min-w-full" />

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="flex">
            <router-link
              :to="{ name: 'home' }"
              class="mb-4 w-full img-pop rounded py-2 px-4"
            >
              <i class="pi pi-info-circle mr-2"></i>
              Get Help
            </router-link>
          </li>
        </ul>
      </div>
      <div class="btn flex justify-around items-center" @click="logout">
        Sign Out
        <i class="pi pi-sign-out"></i>
      </div>
    </div>
  </nav>
</template>

<script>
import EventBus from "@/common/EventBus";

export default {
  name: "dashboardNav",
  props: ["data"],
  components: {},
  data() {
    return {
      NavItems: [
        {
          name: "tab-1",
          path: "home",
          icon: "pi pi-desktop",
        },
        // {
        //   name: "tab-2",
        //   path: "lossOptions",
        //   icon: "pi pi-sort-numeric-down-alt",
        // },
        // {
        //   name: "tab-3",
        //   path: "bookBusiness",
        //   icon: "pi pi-money-bill",
        // },
        // {
        //   name: "tab-4",
        //   path: "wimms",
        //   icon: "pi pi-flag",
        // },
        // {
        //   name: "tab-5",
        //   path: "manageAgency",
        //   icon: "pi pi-briefcase",
        // },
        // {
        //   name: "tab-6",
        //   path: "uploadData",
        //   icon: "pi pi-folder",
        // },
      ],
    };
  },

  methods: {
    logout() {
      EventBus.dispatch("logout");
    },
  },
  mounted() {},
  computed: {
    route() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss" scoped>
$main-color: #031624;
$secondary-color: rgb(145, 149, 197);
$accent-color: #5c4bda;
$accent-color-two: #e1c940;
$neutral-two: #575777;
$neutral-color: #f2f2f2;
nav {
  background-color: $main-color;
  color: $neutral-color;
  .orgName {
    color: $accent-color-two;
  }
  .img-pop {
    &:hover {
      background-color: rgba(242, 242, 242, 0.1);
    }
  }
  .btn {
    color: $neutral-color;
  }
}
.btn {
  cursor: pointer;
}
.active {
  background-color: rgba(242, 242, 242, 0.1);
}
</style>
