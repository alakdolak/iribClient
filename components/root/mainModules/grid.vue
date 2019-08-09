<template>
  <div>
    <div class="row">
      <nuxt-link
        class="col-sm-6 item_container"
        :to="{name: 'details-id' , params: {id: item.id} }"
        v-for="item in getNews(moduleNews)"
        :key="item.id"
      >
        <div class="image_container text-center" v-if="item.mainphoto">
          <img
            :src="imageRoot + item.mainphoto.originalName"
            class="img-fluid module_image"
          />
        </div>
        <div class="image_container text-center" v-else>
          <img src="/placeholders/placeholder.jpg" alt class="img-fluid module_image" />
        </div>
        <div class="title text-secondary">{{item.title}}</div>
      </nuxt-link>
    </div>
  </div>
</template>


<script>
import mainModuleMixins from "~/mixins/mainModules.js";

export default {
  name: "simpleList",
  props: ["moduleNews"],
  mixins: [mainModuleMixins],
  computed: {
    imageRoot() {
      return this.$store.state.imageRoot;
    }
  }
};
</script>

<style scoped>
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
</style>
