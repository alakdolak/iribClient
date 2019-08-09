<template>
  <div class="row justify-content-center mt-2 mb-2">
    <div v-for="column in row.row_columns" class="col-md-12" :key="column.id">
      <main-module-container
        :columnModules="column.column_modules"
        :size="column.size"
        :type="1"
        :length="column.column_modules.length"
      ></main-module-container>
    </div>
  </div>
</template>

<script>
import mainModuleContainer from "~/components/root/mainModuleContainer";

export default {
  name: "responsiveStickyRows",
  props: ["row"],
  components: { mainModuleContainer }
};
</script>
