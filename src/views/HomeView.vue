<template>
  <div>
    <Loading v-if="loading" />
    <dashboard-layout v-else>
      <div class="flex justify-between items-center mb-6">
        <h5>Home</h5>
      </div>
      <hr class="mb-12" />
      <div
        class="flex flex-col w-full rounded bg-white shadow-lg p-3 py-10"
      ></div>
    </dashboard-layout>
  </div>
</template>

<script>
import dashboardLayout from "@/layouts/Layout";
import Loading from "@/components/Loading.vue";
export default {
  name: "HomeView",
  components: { dashboardLayout, Loading },
  data() {
    return {
      windowWidth: null,
      mobile: null,
      loading: null,
    };
  },
  computed: {},
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
    // this.loading = true;
  },
  mounted() {},
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  padding-bottom: 1rem;
}
</style>
