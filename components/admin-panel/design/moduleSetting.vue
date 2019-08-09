<template>
  <div class="module_container border border-secondary rounded bg-gray-light mt-4 p-1">
    <div class="module_header row mb-3">
      <div class="col-sm-6 distance_0">
        <!-- <nuxt-link
          :to="{name: 'admin-modules-id', params: { id:columnModule.module.id} }"
          class="icon_container float-left pl-1"
          v-b-tooltip.hover
          title="Module Setting"
          v-if="!columnModule.default"
        >
          <i class="fa fa-cog" aria-hidden="true" style="font-size: 20px;padding-top: 7px"></i>
        </nuxt-link>-->
        <i
          class="fa fa-cog"
          aria-hidden="true"
          v-b-tooltip.hover
          title="Module setting"
          style="font-size: 25px;padding-top: 15px; padding-left: 20px;cursor: pointer"
          @click="showModal(columnModule.id)"
        ></i>
        <module-setting-modal
          :type="1"
          :showModal="getSetting(columnModule.id)"
          :columnModule="columnModule"
          :index="index"
          v-on:updateSetting="updateSetting"
          v-on:hideAll="hideAll"
        ></module-setting-modal>
      </div>
      <div class="col-sm-6 distance_0">
        <i
          class="fa fa-times-circle-o"
          aria-hidden="true"
          v-b-tooltip.hover
          title="Delete module from row"
          style="font-size: 25px;padding-top:15px; padding-right: -10px; cursor: pointer;float: right;"
          @click="deleteModule(columnModule.id)"
        ></i>
      </div>
    </div>
    <hr>
    <h4
      class="text-info text-center"
      v-if="columnModule.default && columnModule.defaultType === 1"
    >Banner</h4>
    <h4
      class="text-info text-center"
      v-else-if="columnModule.default && columnModule.defaultType === 2"
    >Redirect</h4>
    <h4
      class="text-info text-center"
      v-else-if="columnModule.default && columnModule.defaultType === 3"
    >Live Feed</h4>
    <h4 class="text-info text-center" v-else>{{columnModule.module.name}}</h4>
    <div class="row justify-content-center mt-3">
      <div class="col-sm-12 text-center">
        <div class="btn-group justify-content-center" v-if="!columnModule.default">
          <button
            class="btn btn-sm"
            @click="changeShowTitle(columnModule.id , true)"
            :class="[columnModule.show_title? 'btn-primary' : 'btn-outline-primary']"
          >SHOW TITLE</button>
          <button
            class="btn btn-sm"
            @click="changeShowTitle(columnModule.id , false)"
            :class="[!columnModule.show_title? 'btn-danger' : 'btn-outline-danger']"
          >HIDE TITLE</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import moduleSettingModal from "~/components/admin-panel/design/settingModules/setting";
export default {
  name: "moduleSetting",
  props: ["columnModule", "index", "showModals"],
  components: { moduleSettingModal },
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
    deleteModule(module_id) {
      this.$axios
        .$get("/api/mainRows/deleteModule?columnModuleId=" + module_id)
        .then(data => {
          this.$root.$emit("updateRows");
        })
        .catch(err => {
          this.$emit("rowsAdded");
        });
    },
    changeShowTitle(column_module_id, status) {
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


