<template>
  <div>
    <div class="col-sm-8 mt-3 horizental_distance" v-if="columnModules[0]">
      <img
        :src="imageRoot + columnModules[0].module.module_news[0].news.images[0].originalName"
        alt
        class="img-fluid mt-3"
        v-if="columnModules[0].module.module_news[0].news.images.length"
      >
      <img src="/placeholders/placeholder.jpg" alt class="img-fluid mt-3" v-else>
    </div>
    <div class="col-sm-4 mt-3 horizental_distance" v-if="columnModules[1]">
      <img
        :src="imageRoot + columnModules[1].module.module_news[0].news.images[0].originalName"
        alt
        class="img-fluid mt-3"
        style="height: 310px; width: 250px"
        v-if="columnModules[1].module.module_news[0].news.images.length"
      >
      <img
        src="/placeholders/placeholder.jpg"
        alt
        class="img-fluid mt-3"
        style="height: 331px; width: 250px"
        v-else
      >
    </div>
    <div class="col-sm-12 p-0 m-0">
      <div class="row m-0">
        <div class="col-sm-4 horizental_distance" v-if="columnModules[2]">
          <img
            :src="imageRoot + columnModules[2].module.module_news[0].news.images[0].originalName"
            alt
            class="img-fluid mt-3"
            style="height: 320px;"
            v-if="columnModules[2].module.module_news[0].news.images.length"
          >
          <img
            src="/placeholders/placeholder.jpg"
            alt
            class="img-fluid mt-3"
            style="height: 341px;"
            v-else
          >
        </div>
        <div class="col-sm-8 p-0 m-0">
          <div class="row m-0">
            <div class="col-sm-6 horizental_distance" v-if="columnModules[3]">
              <img
                :src="imageRoot + columnModules[3].module.module_news[0].news.images[0].originalName"
                alt
                class="img-fluid mt-3"
                v-if="columnModules[3].module.module_news[0].news.images.length"
              >
              <img src="/placeholders/placeholder.jpg" alt class="img-fluid mt-3" v-else>
            </div>
            <div class="col-sm-6 horizental_distance" v-if="columnModules[4]">
              <img
                :src="imageRoot + columnModules[4].module.module_news[0].news.images[0].originalName"
                alt
                class="img-fluid mt-3"
                v-if="columnModules[4].module.module_news[0].news.images.length"
              >
              <img src="/placeholders/placeholder.jpg" alt class="img-fluid mt-3" v-else>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-sm-6 horizental_distance" v-if="columnModules[5]">
              <img
                :src="imageRoot + columnModules[5].module.module_news[0].news.images[0].originalName"
                alt
                class="img-fluid mt-3"
                v-if="columnModules[5].module.module_news[0].news.images.length"
              >
              <img src="/placeholders/placeholder.jpg" alt class="img-fluid mt-3" v-else>
            </div>
            <div class="col-sm-6 horizental_distance" v-if="columnModules[6]">
              <img
                :src="imageRoot + columnModules[6].module.module_news[0].news.images[0].originalName"
                alt
                class="img-fluid mt-3"
                v-if="columnModules[6].module.module_news[0].news.images.length"
              >
              <img src="/placeholders/placeholder.jpg" alt class="img-fluid mt-3" v-else>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "simpleList",
  props: ["columnModules"],
  computed: {
    imageRoot() {
      return this.$store.state.imageRoot;
    }
  }
};
</script>

<style scoped>
img {
}
.item_container {
  margin-bottom: 30px;
}

.image_container {
  /*max-height: 200px !important;*/
}

.title {
  font-size: 1.4em;
  padding: 10px;
  background-color: white;
}

.module_distance {
  height: 15px;
}

.horizental_distance {
  padding-right: 5px !important;
  padding-left: 5px !important;
  margin-right: 0 !important;
  margin-left: 0 !important;
}
</style>
