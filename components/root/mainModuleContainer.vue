<template>
  <div>
    <div v-if="type === 2">
      <!-- <boxes class="row" :columnModules="columnModules"></boxes> -->
      <grid2 :columnModules="columnModules"></grid2>
    </div>
    <div v-else-if="type === 3">
      <grid3 :columnModules="columnModules"></grid3>
    </div>
    <div v-else-if="type === 4">
      <grid5 :columnModules="columnModules"></grid5>
    </div>
    <div v-else-if="type === 5">
      <grid7 :columnModules="columnModules"></grid7>
    </div>
    <div class="row" v-else>
      <div
        :class="[(type == 1 && length > 1) ? 'col-sm-6' : 'col-sm-12' , type === 0 ? 'distance_0' : '']"
        v-for="columnModule in columnModules"
        :key="columnModule.id"
        v-if="type !== 2"
      >
        <div class="module_distance"></div>
        <div
          class="module_header text-primary"
          v-if="!columnModule.default && columnModule.show_title"
        >{{columnModule.module.name}}</div>
        <div class="module_container">
          <show-main-module :columnModule="columnModule"></show-main-module>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import showMainModule from "~/components/root/showMainModule";
import boxes from "~/components/root/mainModules/boxes";
import grid2 from "~/components/root/mainModules/containers/grid2";
import grid3 from "~/components/root/mainModules/containers/grid3";
import grid5 from "~/components/root/mainModules/containers/grid5";
import grid7 from "~/components/root/mainModules/containers/grid7";
export default {
  name: "mainModuleContainer",
  props: ["columnModules", "size", "length", "type"],
  components: {
    showMainModule,
    boxes,
    grid2,
    grid3,
    grid5,
    grid7
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
