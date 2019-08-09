<template>
  <b-modal
    :ref="columnModule.id"
    hide-footer
    title="Update setting"
    size="lg"
    v-if="id"
    @hide="hideAll"
  >
    <div class="row">
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
      <div class="form-group mt-4">
        <label>Description:</label>
        <select class="form-control" v-model="showDescription">
          <option :value="true">Show</option>
          <option :value="false">Hide</option>
        </select>
      </div>
      <div class="form-group" v-if="showDescription">
        <label>Description type:</label>
        <select class="form-control" v-model="descriptionType">
          <option :value="1">title</option>
          <option :value="2">title 2</option>
          <option :value="3">lead</option>
          <option :value="4">content</option>
        </select>
      </div>
      <div class="form-group">
        <label>Font:</label>
        <select class="form-control" v-model="font">
          <option :value="font.value" v-for="font in fonts" :key="font.value">{{font.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-sm-6">
            <label for class="label">background color:</label>
            <input type="text" class="form-control" v-model="backgroundColor">
            <verte
              v-model="backgroundColor"
              display="widget"
              picker="wheel"
              :enableAlpha="false"
              :recentColors="false"
              model="hex"
              :rgbSliders="true"
            ></verte>
          </div>
          <div class="col-sm-6">
            <label for class="label">color:</label>
            <input type="text" class="form-control" v-model="color">
            <verte
              v-model="color"
              display="widget"
              picker="wheel"
              :enableAlpha="false"
              :recentColors="false"
              model="hex"
              :rgbSliders="true"
            ></verte>
          </div>
        </div>
      </div>
    </div>
    <!-- module design setting -->
    <div v-else>
      <h4 class="text-center mt-4 mb-4 text-info">No setting here yet !!</h4>
    </div>
    <div class="form-group">
      <button class="btn btn-block btn-lg btn-primary" @click="updateSetting">Update Setting</button>
    </div>
  </b-modal>
</template>

<script>
import fontMixins from "~/mixins/fonts";
import verte from "verte";

export default {
  name: "horizontalListModal",
  props: ["columnModule", "showModal", "index"],
  mixins: [fontMixins],
  components: { verte },
  data() {
    return {
      id: null,
      showDescription: true,
      descriptionType: 1,
      selectedTab: 1,
      font: 1,
      color: "#000000",
      backgroundColor: "#ffffff",
      error: ""
    };
  },
  created() {
    if (this.columnModule) {
      this.id = this.columnModule.id;
      this.showDescription = this.columnModule.showDescription;
      this.descriptionType = this.columnModule.descriptionType;
      this.font = this.columnModule.font;
      this.color = this.columnModule.color;
      this.backgroundColor = this.columnModule.backgroundColor;
    }
  },
  methods: {
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
      this.$axios
        .post("/api/columnModules/horizontalList/update", {
          showDescription: this.showDescription,
          descriptionType: this.descriptionType,
          font: this.font,
          color: this.color,
          backgroundColor: this.backgroundColor,
          id: this.id
        })
        .then(result => {
          this.$emit("updateSetting", result.data.columnModule);
          this.hide();
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to update simple list setting";
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
      this.showDescription = newVal.showDescription;
      this.descriptionType = newVal.descriptionType;
      this.font = newVal.font;
      this.color = newVal.color;
      this.backgroundColor = newVal.backgroundColor;
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


