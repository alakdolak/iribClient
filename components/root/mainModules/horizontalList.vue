<template>
  <div
    class="row justify-content-center"
    :style="{fontFamily: getFont(columnModule.font) , color: columnModule.color , backgroundColor: columnModule.backgroundColor , paddingTop: '20px'}"
  >
    <nuxt-link
      :to="{name: 'details-id' , params: {id: item.id} }"
      class="col-sm-4"
      v-for="item in getNews(moduleNews)"
      :key="item.id"
    >
      <div class="box">
        <img class="img-fluid img" src="/placeholders/placeholder.jpg" alt="hello" />
        <div
          class="description"
          v-if="columnModule.showDescription"
        >{{truncate(translate_description(item , columnModule.descriptionType) , 70)}}</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import mainModulesMixin from "~/mixins/mainModules.js";
import fontMixins from "~/mixins/fonts";
export default {
  name: "horizontalList",
  props: ["moduleNews", "columnModule"],
  mixins: [mainModulesMixin, fontMixins],
  data() {
    return {};
  },
  created() {
    this.test();
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: auto;
  margin-bottom: 30px;
}

img {
  width: 100%;
  height: 100%;
  max-height: 250px;
}

.description {
  width: 100%;
  height: 80px;
  clear: both;
  padding-top: 10px;
  box-sizing: border-box;
}
</style>


