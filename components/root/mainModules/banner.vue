<template>
  <div>
    <nuxt-link to v-if="banner">
      <img
        :src="backendRoot + '?type=1&name=' + banner.image"
        :alt="banner.name"
        class="mb-4"
        :style="{ height: columnModule.height + 'px' }"
      >
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "banner",
  props: ["columnModule"],
  data() {
    return {
      banner: null,
      error: ""
    };
  },
  computed: {
    backendRoot() {
      return this.$store.state.backendRoot;
    }
  },
  created() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      this.$axios
        .post("/api/banners/main", { id: this.columnModule.defaultId })
        .then(data => {
          this.error = "";
          this.banner = data.data.banner;
        })
        .catch(err => {
          console.log(err);
          this.error = "something went wrong trying to get data";
        });
    }
  }
};
</script>

<style scoped>
img {
  width: 100% !important;
}
</style>


