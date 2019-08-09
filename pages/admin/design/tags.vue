<template>
  <div>
    <div v-if="page">
      <main-design :pageId="3" :page="pageId"></main-design>
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
      pageId: 3,
      page: null
    };
  },
  created() {
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
};
</script>
