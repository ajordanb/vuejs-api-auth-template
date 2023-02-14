<template>
  <div>
    <Loading v-if="loading" />
    <Navbar v-if="!mobile && !loading" />
    <div class="flex pr-5" v-if="!loading">
      <div class="flex w-64 order-1" v-if="!mobile"></div>
      <div class="flex w-full flex-col order-2 px-16 py-12">
        <Button
          icon="pi pi-align-left"
          @click="toggleVisibleLeft"
          v-if="mobile"
        />
        <Sidebar v-model:visible="visibleLeft" v-if="mobile"></Sidebar>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import Navbar from "@/components/DashboardNav";

export default {
  name: "dashboardLayout",
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      windowWidth: null,
      mobile: null,
      loading: null,
      visibleLeft: null,
      orgData: null,
    };
  },
  computed: {},

  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },

  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      this.mobile = this.windowWidth <= 750;
    },
    toggleVisibleLeft() {
      this.visibleLeft = !this.visibleLeft;
    },
  },
};
</script>
<style></style>
