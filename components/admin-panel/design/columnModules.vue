<template>
  <div>
    <div v-if="column.column_type === 2" class="col-sm-12">
      <grid2-column-module :columnModules="column.column_modules" :showModals="showModals"></grid2-column-module>
    </div>
    <div v-else-if="column.column_type === 3" class="col-sm-12">
      <grid3-column-module :columnModules="column.column_modules" :showModals="showModals"></grid3-column-module>
    </div>
    <div v-else-if="column.column_type === 4" class="col-sm-12">
      <grid5-column-module :columnModules="column.column_modules" :showModals="showModals"></grid5-column-module>
    </div>
    <div v-else-if="column.column_type === 5" class="col-sm-12">
      <grid7-column-module :columnModules="column.column_modules" :showModals="showModals"></grid7-column-module>
    </div>
    <div
      v-else-if="column.column_type === 0 || column.column_type === 1"
      :class="[(column.column_type === 1 && column.column_modules.length > 1) ? 'col-sm-6' : 'col-sm-12']"
      v-for="(columnModule,index) in column.column_modules"
      :key="columnModule.id"
    >
      <module-setting :columnModule="columnModule" :index="index" :showModals="showModals"></module-setting>
    </div>
  </div>
</template>

<script>
import moduleSettingModal from "~/components/admin-panel/design/settingModules/setting";
import moduleSetting from "~/components/admin-panel/design/moduleSetting";
import grid2ColumnModule from "~/components/admin-panel/design/columnModules/grid2";
import grid3ColumnModule from "~/components/admin-panel/design/columnModules/grid3";
import grid5ColumnModule from "~/components/admin-panel/design/columnModules/grid5";
import grid7ColumnModule from "~/components/admin-panel/design/columnModules/grid7";

export default {
  name: "columnModules",
  props: ["column", "row"],
  components: {
    moduleSettingModal,
    moduleSetting,
    grid2ColumnModule,
    grid3ColumnModule,
    grid5ColumnModule,
    grid7ColumnModule
  },
  data() {
    return {
      showModals: []
    };
  },
  mounted() {
    for (let i = 0; i < this.column.column_modules.length; i++) {
      this.showModals.push({
        id: this.column.column_modules[i].id,
        status: false
      });
    }
  },
  methods: {
    getSetting(id) {
      for (let i = 0; i < this.showModals.length; i++) {
        if (this.showModals[i].id === id) {
          return this.showModals[i].status;
        }
      }
    },
    showModal(id) {
      for (let i = 0; i < this.showModals.length; i++) {
        if (this.showModals[i].id === id) {
          this.showModals[i].status = true;
        }
      }
    },
    hideAll() {
      for (let i = 0; i < this.showModals.length; i++) {
        this.showModals[i].status = false;
      }
    },
    hideModal(id) {
      for (let i = 0; i < this.showModals.length; i++) {
        console.log(i + " --> " + this.showModals[i].id);
        if (this.showModals[i].id === id) {
          console.log("found here");
          //   this.showModals[i].status = false;
        }
      }
    },
    updateSetting(data) {
      let index = data.index;
      let columnModule = data.columnModule;
      this.$root.$emit("updateRows");
      // this.column.column_modules[index] = columnModule;
    },
    deleteModule(module_id, row_id, column_id) {
      this.$axios
        .$get("/api/mainRows/deleteModule?columnModuleId=" + module_id)
        .then(data => {
          this.$root.$emit("updateRows");
        })
        .catch(err => {
          this.$emit("rowsAdded");
        });
    },
    changeShowTitle(row_id, column_id, column_module_id, status) {
      this.$axios
        .post("/api/columnModules/showTitle", {
          column_module_id: column_module_id,
          show_title: status
        })
        .then(data => {
          this.$root.$emit("updateRows");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
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
