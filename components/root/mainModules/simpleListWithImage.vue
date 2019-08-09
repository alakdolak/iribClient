<template>
  <div>
    <ul
      class="list-group"
      :style="{fontFamily: getFont(columnModule.font), color: columnModule.color , backgroundColor: columnModule.backgroundColor}"
    >
      <nuxt-link
        :to="{name: 'details-id' , params: {id: item.id}}"
        v-for="item in getNews(moduleNews)"
        :key="item.id"
      >
        <li
          class="list-group-item list-group-item-action list_distance"
          style="background-color: inherit; color: inherit"
        >
          <div class="image text-center" v-if="item.mainphoto">
            <img
              :src=" imageRoot + item.mainphoto.originalName"
              :alt="item.mainphoto.originalName"
              class="img-fluid"
            />
          </div>
          <div class="image" v-else>
            <img src="/placeholders/placeholder.jpg" alt="image" class="img-fluid" />
          </div>
          <span class="title" v-if="columnModule.showDescription">
            {{truncate(translate_description(item , columnModule.descriptionType) , 70)}}
            <div class="time">{{ getTime(item.createdAt) }}</div>
          </span>
        </li>
      </nuxt-link>
    </ul>
  </div>
</template>


<script>
import mainModuleMixins from "~/mixins/mainModules";
import fontMixin from "~/mixins/fonts";
export default {
  name: "simpleList",
  props: ["columnModule", "moduleNews"],
  mixins: [mainModuleMixins, fontMixin],
  computed: {
    imageRoot() {
      return this.$store.state.imageRoot;
    }
  },
  data() {
    return {};
  }
};
</script>


<style scoped>
.list-group {
  margin-top: 21px;
}

.list-group-item {
  height: 114.5px !important;
}

.image {
  float: left;
  height: 100%;
  width: 120px !important;
  margin-right: 20px;
  clear: left;
}

.title {
  height: 100%;
  float: right;
  width: calc(100% - 140px);
  color: inherit;
  padding: 5px 5px 5px 0;
  overflow: hidden;
  box-sizing: border-box;
}

.time {
  text-align: right;
  font-size: 0.8em;
  padding-top: 5px;
}

.list_distance {
  padding: 0;
}
</style>
