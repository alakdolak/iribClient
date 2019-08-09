<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-sm-12" v-if="columnModules[0]">
        <module-setting :columnModule="columnModules[0]" :index="0" :showModals="showModals"></module-setting>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6" v-if="columnModules[1]">
        <module-setting :columnModule="columnModules[1]" :index="1" :showModals="showModals"></module-setting>
      </div>
      <div class="col-sm-6" v-if="columnModules[2]">
        <module-setting :columnModule="columnModules[2]" :index="2" :showModals="showModals"></module-setting>
      </div>
    </div>
  </div>
</template>


<script>
import moduleSetting from "~/components/admin-panel/design/moduleSetting";

export default {
  name: "grid2ColumnModule",
  props: ["columnModules", "showModals", "index"],
  components: { moduleSetting }
};
</script>

<style scoped>
.module_container {
  height: 200px;
}

.module_header {
  width: 100%;
  height: 40px;
  line-height: 30px;
  margin-top: -5px;
}

.module_body {
  text-align: center;
  height: 40px;
  font-size: 1.4em;
  padding-bottom: 10px;
}

.icon_container {
  margin: 5px;
  margin-right: -20px;
  cursor: pointer;
  color: #000;
}

.icon_container:hover {
  color: #6c757d !important;
}
</style>
