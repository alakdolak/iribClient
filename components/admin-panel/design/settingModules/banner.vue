<template>
  <b-modal
    :ref="columnModule.id"
    hide-footer
    title="Update setting"
    size="lg"
    v-if="id"
    @hide="hideAll"
  >
    <div class="row p-3">
      <div class="col-sm-12">
        <ul class="nav nav-tabs nav-fill nav-justified">
          <li class="nav-item" @click="changeTab(1)">
            <a class="nav-link" :class="[selectedTab === 1 ? 'active' : '']">General Setting</a>
          </li>
          <li class="nav-item" @click="changeTab(2)">
            <a class="nav-link" :class="[selectedTab === 2 ? 'active' : '']">Module Setting</a>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="selectedTab === 1">
      <h4 class="text-center mt-4 mb-4 text-info">No setting here yet !!</h4>
    </div>
    <!-- module design setting -->
    <div v-else>
      <div class="form-group pt-4">
        <label for>Redirect Height:</label>
        <input type="number" class="form-control" v-model="height">
      </div>
    </div>
    <div class="form-group mt-4 p-2">
      <button class="btn btn-block btn-lg btn-primary" @click="updateSetting">Update Setting</button>
    </div>
  </b-modal>
</template>

<script>
import fontMixins from "~/mixins/fonts";
export default {
  name: "bannerModal",
  props: ["columnModule", "showModal", "index"],
  mixins: [fontMixins],
  data() {
    return {
      id: null,
      selectedTab: 1,
      defaultId: null,
      height: 100,
      error: ""
    };
  },
  created() {
    if (this.columnModule) {
      this.id = this.columnModule.id;
      this.defaultId = this.columnModule.defaultId;
      this.getBanner();
    }
  },
  methods: {
    getBanner() {
      this.$axios
        .post("/api/banners/main", { id: this.defaultId })
        .then(data => {
          this.height = data.data.banner.height;
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to get banner from the database";
        });
    },
    hide() {
      if (this.id) this.$refs[this.id].hide();
    },
    show() {
      if (this.id) this.$refs[this.id].show();
    },
    hideAll() {
      this.$emit("hideAll");
    },
    changeTab(tab) {
      this.selectedTab = tab;
    },
    updateSetting() {
      // TODO: update banner but return column Module
      this.$axios
        .post("/api/columnModules/banner/update", {
          id: this.id,
          defaultId: this.defaultId,
          height: this.height
        })
        .then(result => {
          this.$emit("updateSetting", result.data.columnModule);
          this.hide();
        })
        .catch(err => {
          console.log(err);
          this.error = "something went wrong trying to update swiper setting";
        });
    }
  },
  watch: {
    showModal: function(newVal) {
      if (newVal) this.show();
      else this.hide();
    },
    columnModule: function(newVal) {
      this.id = newVal.id;
      this.defaultId = newVal.defaultId;
      this.getBanner();
    }
  }
};
</script>

<style scoped>
.nav-item {
  cursor: pointer;
  color: black !important;
}
.active {
  color: black !important;
}
</style>


