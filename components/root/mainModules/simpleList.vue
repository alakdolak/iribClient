<template>
  <div>
    <ul
      class="list-group list-group-flush"
      :style="{fontFamily: getFont(columnModule.font), color: columnModule.color, backgroundColor: columnModule.backgroundColor}"
    >
      <nuxt-link
        :to="{name: 'details-id' , params: {id: item.id} }"
        v-for="item in getNews(moduleNews)"
        :key="item.id"
      >
        <li
          class="list-group-item"
          style="background-color: inherit"
        >{{truncate(translate_description(item , columnModule.descriptionType) , 80)}}</li>
      </nuxt-link>
    </ul>
  </div>
</template>


<script>
import fontMixins from "~/mixins/fonts";
import mainModuleMixins from "~/mixins/mainModules.js";
export default {
  name: "simpleList",
  props: ["columnModule", "moduleNews"],
  mixins: [mainModuleMixins, fontMixins],
  methods: {},
  filters: {
    uppercase: function(v) {
      return v.toUpperCase();
    }
  }
};
</script>

<style scoped>
.list-group-item {
  min-height: 80px;
  font-size: 1.3em;
}
</style>
