<template>
  <div>
    <div
      v-for="row in mainRows"
      v-if="row.type !== 0"
      :key="row.id"
      :style="sticky_styles(row.height , row.width , row.top , row.right , row.backgroundColor , row.headerBackgroundColor , row.color)"
      class="hide_1200"
    >
      <div class="row" :style="{backgroundColor: row.headerBackgroundColor , color: row.color}">
        <div class="col-md-12">
          <div class="row_header" v-if="row.title">{{row.title}}</div>
        </div>
      </div>
      <div v-for="column in row.row_columns" class="col-md-12" :key="column.id">
        <main-module-container
          :columnModules="column.column_modules"
          :size="column.size"
          :type="column.column_type"
          :length="column.column_modules.length"
        ></main-module-container>
      </div>
    </div>
    <div
      v-for="(row , index) in mainRows"
      :class="[row.fluid ? 'container-fluid' : 'container']"
      class="p-0"
      :style="{backgroundColor: row.backgroundColor}"
      v-if="row.type === 0"
      :key="row.id"
    >
      <div class="row" :style="{backgroundColor: row.headerBackgroundColor , color: row.color}">
        <div class="col-md-12">
          <div class="row_header" v-if="row.title">{{row.title}}</div>
        </div>
      </div>
      <div class="row distance_0 p-2 mt-2s">
        <div
          v-for="column in row.row_columns"
          :class="column_size(column.size)"
          class="mt-3"
          :key="column.id"
        >
          <main-module-container
            :columnModules="column.column_modules"
            :size="column.size"
            :type="column.column_type"
            :length="column.column_modules.length"
          ></main-module-container>
        </div>
      </div>
      <div v-if="index === 2">
        <responsive-sticky-rows
          v-for="row in mainRows"
          :key="row.id + 100"
          v-if="row.type !== 0"
          class="show_1200"
          :row="row"
        ></responsive-sticky-rows>
      </div>
    </div>
  </div>
</template>


<script>
import mainModuleContainer from "~/components/root/mainModuleContainer";
import responsiveStickyRows from "~/components/root/responsiveStickyRows";
export default {
  name: "showMainRows",
  props: ["mainRows"],
  components: {
    mainModuleContainer,
    responsiveStickyRows
  },
  methods: {
    column_size(size) {
      return {
        "col-md-12": size === 12,
        "col-md-11": size === 11,
        "col-md-10": size === 10,
        "col-md-9": size === 9,
        "col-md-8": size === 8,
        "col-md-7": size === 7,
        "col-md-6": size === 6,
        "col-md-5": size === 5,
        "col-md-4": size === 4,
        "col-md-3": size === 3,
        "col-md-2": size === 2,
        "col-md-1": size === 1
      };
    },
    sticky_styles: function(
      height,
      width,
      top,
      right,
      backgroundColor,
      headerBackgroundColor,
      color
    ) {
      return {
        position: "absolute",
        "z-index": "10",
        "background-color": "white",
        // 'overflow-y': 'scroll',
        width: width + "px",
        height: height + "px !important",
        "overflow-y": "scroll",
        top: top + "px",
        right: right + "px",
        backgroundColor: backgroundColor,
        color: color
      };
    }
  }
};
</script>

<style scoped>
.row_header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 1.5em;
  border-left: 10px solid;
  color: inherit;
  background-color: inherit;
  box-sizing: border-box;
  padding-left: 10px;
}
</style>
