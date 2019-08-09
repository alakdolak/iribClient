<template>
  <div>
    <div v-if="page">
      <main-design :page="pageId" v-if="pageId > 2"></main-design>
      <main-design v-else></main-design>
    </div>
  </div>
</template>

<script>
import mainDesign from "~/components/admin-panel/design/main";
import detailsDesign from "~/components/admin-panel/design/details";

export default {
  name: "mainPage",
  components: { mainDesign, detailsDesign },
  layout: "adminPanel",
  data() {
    return {
      pageId: 1,
      page: null
    };
  },
  created() {
    if (this.$route.params.page) {
      this.pageId = parseInt(this.$route.params.page);
      this.$axios
        .post("/api/page", {
          pageId: this.pageId
        })
        .then(data => {
          this.page = data.data.page;
        })
        .catch(err => {
          console.log("error happened trying to get page from the database");
          console.log(err);
        });
    }
  }
};
</script>
