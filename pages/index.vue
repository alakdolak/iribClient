<template>
  <div class="bg-gray">
    <show-main-rows :mainRows="mainRows"></show-main-rows>
    <!-- <index-black></index-black> ح -->
    <!-- <events></events> -->
  </div>
</template>

<script>
import showMainRows from "~/components/root/showMainRows";
import indexBlack from "~/components/root/index_black";
import events from "~/components/root/events";

export default {
  name: "index",
  layout: "default",
  components: {
    showMainRows,
    indexBlack,
    events
  },
  data() {
    return {
      // mainRows: []
    };
  },
  asyncData({ $axios }) {
    return $axios.get(`api`).then(res => {
      return { mainRows: res.data.mainRows };
    });
  },
  created() {
    // this.$axios
    //   .get("api")
    //   .then(data => {
    //     this.mainRows = data.data.mainRows;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
};
</script>

