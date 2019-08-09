p<template>
  <div>
    <div v-if="!columnModule.default && columnModule.module_type === 0">
      <simple-list
        :columnModule="columnModule"
        :moduleNews="columnModule.module.module_news"
        v-if="columnModule.module.module_news.length"
      ></simple-list>
    </div>
    <div v-else-if="!columnModule.default && columnModule.module_type === 1">
      <simple-list-with-image
        :columnModule="columnModule"
        :moduleNews="columnModule.module.module_news"
        v-if="columnModule.module.module_news.length"
      ></simple-list-with-image>
    </div>
    <div v-else-if="!columnModule.default && columnModule.module_type === 2">
      <grid
        :moduleNews="columnModule.module.module_news"
        v-if="columnModule.module.module_news.length"
      ></grid>
    </div>
    <div v-else-if="!columnModule.default && columnModule.module_type === 3">
      <swiper
        v-if="columnModule.module.module_news.length"
        :columnModule="columnModule"
        :moduleNews="columnModule.module.module_news"
      ></swiper>
    </div>
    <div v-else-if="!columnModule.default && columnModule.module_type === 4">
      <one-image
        :moduleNews="columnModule.module.module_news"
        v-if="columnModule.module.module_news.length"
      ></one-image>
    </div>
    <div v-else-if="!columnModule.default && columnModule.module_type === 5">
      <horizontal-list
        :moduleNews="columnModule.module.module_news"
        :columnModule="columnModule"
        v-if="columnModule.module.module_news.length"
      ></horizontal-list>
    </div>
    <div v-else-if="columnModule.default && columnModule.defaultType === 1">
      <banner :columnModule="columnModule"></banner>
    </div>
    <div v-else-if="columnModule.default && columnModule.defaultType === 2">
      <redirect :columnModule="columnModule"></redirect>
    </div>
    <div v-else-if="columnModule.default && columnModule.defaultType === 3">
      <live :columnModule="columnModule"></live>
    </div>
  </div>
</template>

<script>
import simpleList from "~/components/root/mainModules/simpleList";
import simpleListWithImage from "~/components/root/mainModules/simpleListWithImage";
import grid from "~/components/root/mainModules/grid";
import swiper from "~/components/root/mainModules/swiper";
import oneImage from "~/components/root/mainModules/oneImage";
import banner from "~/components/root/mainModules/banner";
import live from "~/components/root/mainModules/live";
import redirect from "~/components/root/mainModules/redirect";
import horizontalList from "~/components/root/mainModules/horizontalList";

export default {
  name: "showMainModule",
  props: ["columnModule"],
  components: {
    simpleList,
    simpleListWithImage,
    grid,
    swiper,
    oneImage,
    banner,
    live,
    horizontalList,
    redirect
  }
};
</script>

<style scoped>
.module_container {
  margin-top: 5px;
}

.module_header {
  font-size: 1.4em;
  padding-left: 10px;
  height: 40px;
  line-height: 40px;
  border-left: 10px solid #e31e24;
  font-weight: bolder;
}

.module_distance {
  width: 100%;
  height: 10px;
}
</style>
