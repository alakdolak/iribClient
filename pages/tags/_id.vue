<template>
  <div>
    <show-main-rows :mainRows="mainRows"></show-main-rows>
  </div>
</template>

<script>
import showMainRows from "~/components/root/showMainRows";

export default {
  name: "tag_id",
  layout: "default",
  components: {
    showMainRows
  },
  data() {
    return {
      pageId: 3,
      page: null,
      design: null,
      tagId: null,
      mainRows: []
    };
  },
  created() {
    this.tagId = this.$route.params.id;
    this.getPage();
  },
  methods: {
    getPage() {
      this.$axios
        .post("/api/page", {
          pageId: this.pageId
        })
        .then(data => {
          this.page = data.data.page;
          this.getMainRows();
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to get page from the database";
        });
    },
    getMainRows() {
      this.$axios
        .get("api?page=3&tagId=" + this.tagId)
        .then(data => {
          this.mainRows = data.data.mainRows;
        })
        .catch(err => {
          this.error = "something went wrong trying to create page";
          console.log(err);
        });
    }
  }
};
</script>

