<template>
  <div class="row justify-content-center">
    <div class="col-sm-12" v-if="columnModules[0]">
      <div
        class="module_header text-primary"
        v-if="!columnModules[0].default && columnModules[0].show_title"
      >{{columnModules[0].module.name}}</div>
      <show-main-module :columnModule="columnModules[0]"></show-main-module>
    </div>
    <div class="col-sm-12 mt-4" v-if="columnModules[1]">
      <div
        class="module_header text-primary"
        v-if="!columnModules[1].default && columnModules[1].show_title"
      >{{columnModules[1].module.name}}</div>
      <show-main-module :columnModule="columnModules[1]"></show-main-module>
    </div>
  </div>
</template>


<script>
import showMainModule from "~/components/root/showMainModule";
export default {
  name: "grid2",
  components: { showMainModule },
  props: ["columnModules"],
  data() {
    return {
      localColumnModules: []
    };
  }
};
</script>

<style scoped>
.columnContainer {
  min-height: 100px;
  height: auto;
}
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

