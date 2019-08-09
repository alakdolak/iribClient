<template>
  <div v-if="this.redirect">
    <img
      :src="backendRoot + '?type=2&name=' + redirect.image"
      :alt="redirect.name"
      :style="{ height: columnModule.height + 'px' }"
    />
  </div>
</template>
<script>
export default {
  name: "redirect",
  props: ["columnModule"],
  data() {
    return {
      redirect: null,
      error: ""
    };
  },
  computed: {
    backendRoot() {
      return this.$store.state.backendRoot;
    }
  },
  created() {
    console.log(this.columnModule);
    this.getRedirect();
  },
  methods: {
    getRedirect() {
      this.$axios
        .post("/api/redirects/main", { id: this.columnModule.defaultId })
        .then(data => {
          this.redirect = data.data.redirect;
          this.error = "";
        })
        .catch(err => {
          console.log(err);
          this.error = "something went wrong trying to get data ";
        });
    },
    getLink(type, redirect) {
      if (type === 0) {
        return "/" + redirect;
      } else if (type === 2) {
      } else if (type === 3) {
      }
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>


