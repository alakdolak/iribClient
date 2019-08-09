<template>
  <div>
    <banner-modal
      :columnModule="columnModule"
      v-if="columnModule && columnModule.default && columnModule.defaultType === 1 "
      :showModal="showModal"
      v-on:updateSetting="updateSetting"
      v-on:hideAll="hideAll"
    ></banner-modal>
    <banner-modal
      :columnModule="columnModule"
      v-if="columnModule && columnModule.default && columnModule.defaultType === 2 "
      :showModal="showModal"
      v-on:updateSetting="updateSetting"
      v-on:hideAll="hideAll"
    ></banner-modal>
    <swiper-setting-modal
      :columnModule="columnModule"
      v-else-if="type === 1 && columnModule && !columnModule.default && columnModule.module_type === 3"
      :showModal="showModal"
      v-on:updateSetting="updateSetting"
      v-on:hideAll="hideAll"
    ></swiper-setting-modal>
    <simple-list-modal
      :columnModule="columnModule"
      v-else-if="type === 1 && columnModule && !columnModule.default && columnModule.module_type === 0"
      :showModal="showModal"
      v-on:updateSetting="updateSetting"
      v-on:hideAll="hideAll"
    ></simple-list-modal>
    <horizontal-list-modal
      :columnModule="columnModule"
      v-else-if="type === 1 && columnModule && !columnModule.default && columnModule.module_type === 5"
      :showModal="showModal"
      v-on:updateSetting="updateSetting"
      v-on:hideAll="hideAll"
    ></horizontal-list-modal>
    <simple-list-with-images-modal
      :columnModule="columnModule"
      v-else-if="type === 1 && columnModule && !columnModule.default && columnModule.module_type === 1"
      :showModal="showModal"
      v-on:updateSetting="updateSetting"
      v-on:hideAll="hideAll"
    ></simple-list-with-images-modal>
  </div>
</template>

<script>
import swiperSettingModal from "~/components/admin-panel/design/settingModules/swiper";
import simpleListModal from "~/components/admin-panel/design/settingModules/simpleList";
import horizontalListModal from "~/components/admin-panel/design/settingModules/horizontalList";
import simpleListWithImagesModal from "~/components/admin-panel/design/settingModules/simpleListWithImages";
import bannerModal from "~/components/admin-panel/design/settingModules/banner";
export default {
  name: "settingModal",
  components: {
    swiperSettingModal,
    simpleListModal,
    simpleListWithImagesModal,
    bannerModal,
    horizontalListModal
  },
  props: ["type", "columnModule", "showModal", "index"],
  methods: {
    updateSetting(columnModule) {
      this.$emit("updateSetting", {
        index: this.index,
        columnModule: columnModule
      });
    },
    hideAll() {
      this.$emit("hideAll");
    }
  }
};
</script>

