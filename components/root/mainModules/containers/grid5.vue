<template>
  <div>
    <div class="row rtl">
      <div class="col-sm-4" v-if="columnModules[0]" style="direction: ltr !important">
        <div
          class="module_header text-primary"
          v-if="!columnModules[0].default && columnModules[0].show_title"
        >{{columnModules[0].module.name}}</div>
        <show-main-module :columnModule="columnModules[0]"></show-main-module>
      </div>
      <div class="col-sm-8" style="direction: ltr !important">
        <div class="row">
          <div class="col-sm-6" v-if="columnModules[1]">
            <div
              class="module_header text-primary"
              v-if="!columnModules[1].default && columnModules[1].show_title"
            >{{columnModules[1].module.name}}</div>
            <show-main-module :columnModule="columnModules[1]"></show-main-module>
          </div>
          <div class="col-sm-6 mt-1" v-if="columnModules[2]">
            <div
              class="module_header text-primary"
              v-if="!columnModules[2].default && columnModules[2].show_title"
            >{{columnModules[2].module.name}}</div>
            <show-main-module :columnModule="columnModules[2]"></show-main-module>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6" v-if="columnModules[3]">
            <div
              class="module_header text-primary"
              v-if="!columnModules[3].default && columnModules[3].show_title"
            >{{columnModules[3].module.name}}</div>
            <show-main-module :columnModule="columnModules[3]"></show-main-module>
          </div>
          <div class="col-sm-6 mt-1" v-if="columnModules[4]">
            <div
              class="module_header text-primary"
              v-if="!columnModules[4].default && columnModules[4].show_title"
            >{{columnModules[4].module.name}}</div>
            <show-main-module :columnModule="columnModules[4]"></show-main-module>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import showMainModule from "~/components/root/showMainModule";

export default {
  name: "grid5",
  props: ["columnModules"],
  components: { showMainModule }
};
</script>

<style scoped>
.columnContainer {
  border: 1px solid red;
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

