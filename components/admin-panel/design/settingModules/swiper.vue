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
        <label>
          Tag:
          <span class="text-muted pl-2">(top left corner of the image)</span>
        </label>
        <select class="form-control" v-model="showTag">
          <option :value="true">Show</option>
          <option :value="false">Hide</option>
        </select>
      </div>
      <div class="form-group" v-if="showTag">
        <label for>Tag Text:</label>
        <select class="form-control" v-model="tagText">
          <option :value="1">News category</option>
          <option :value="2">News sub category</option>
          <option :value="3">News tag</option>
        </select>
      </div>
      <div class="form-group">
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
      <div class="form-group mt-4">
        <label for>Slide show mode:</label>
        <select class="form-control" v-model="automatic">
          <option :value="true">Automatic</option>
          <option :value="false">Manual</option>
        </select>
      </div>
      <div class="form-group" v-if="automatic">
        <label for>
          Interval:
          <span class="text-muted pl-2">(miliseconds)</span>
        </label>
        <input type="number" class="form-control" v-model="interval">
      </div>
      <div class="form-group">
        <label>Animation:</label>
        <select class="form-control" v-model="animation">
          <option :value="true">Simple</option>
          <option :value="false">None</option>
        </select>
      </div>
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
  name: "swiperSettingModal",
  props: ["columnModule", "showModal", "index"],
  mixins: [fontMixins],
  components: { verte },
  data() {
    return {
      id: null,
      interval: 3000,
      automatic: true,
      animation: true,
      showTag: false,
      font: 1,
      color: "#000000",
      backgroundColor: "#ffffff",
      showDescription: true,
      descriptionType: 1,
      tagText: 1,
      selectedTab: 1,
      error: ""
    };
  },
  created() {
    if (this.columnModule) {
      this.id = this.columnModule.id;
      this.automatic = this.columnModule.swiperAutomatic;
      this.interval = this.columnModule.swiperInterval;
      this.animation = this.columnModule.swiperAnimations;
      this.showTag = this.columnModule.showTag;
      this.tagText = this.columnModule.tagText;
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
        .post("/api/columnModules/swiper/update", {
          swiperInterval: this.interval,
          swiperAnimations: this.animation,
          swiperAutomatic: this.automatic,
          showTag: this.showTag,
          tagText: this.tagText,
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
      this.automatic = newVal.swiperAutomatic;
      this.interval = newVal.swiperInterval;
      this.animation = newVal.swiperAnimations;
      this.showTag = newVal.showTag;
      this.tagText = newVal.tagText;
      this.showDescription = newVal.showDescription;
      this.descriptionType = newVal.descriptionType;
      this.font = newVal.font;
      this.backgroundColor = newVal.backgroundColor;
      this.font = newVal.font;
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


