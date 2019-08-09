<template>
  <div>
    <b-carousel
      id="carousel1"
      style="text-shadow: 1px 1px 2px #333; "
      controls
      :no-animation="!animation"
      indicators
      background="#ababab"
      :interval="interval"
      v-model="slide"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      :style="{backgroundColor: columnModule.backgroundColor}"
    >
      <!-- Text slides with image -->
      <div v-for="item in getNews(moduleNews)" :key="item.id">
        <b-carousel-slide>
          <nuxt-link slot="img" :to="{name: 'details-id' , params: {id: item.id} }">
            <div
              class="image_container"
              :style="{ backgroundImage: 'url('+ getBackgroundImage(item) +')' }"
            >
              <img
                :src="getBackgroundImage(item)"
                class="img-fluid"
                style="max-height: 400px;visibility: hidden"
              />
              <nuxt-link
                to="#"
                class="overlay top_left"
                v-if="columnModule.showTag && translate_tagText(item)"
                :style="{fontFamily: getFont(columnModule.font), color: columnModule.color + ' !important', backgroundColor: columnModule.backgroundColor}"
              >{{translate_tagText(item)}}</nuxt-link>
              <nuxt-link
                class="overlay"
                :class="[columnModule.showTag && translate_tagText(item) ? 'bottom_left' : 'bottom_left_alone']"
                :to="{name: 'details-id' , params: {id: item.id} }"
                :style="{fontFamily: getFont(columnModule.font), color: columnModule.color + ' !important', backgroundColor: columnModule.backgroundColor}"
              >{{item.title}}</nuxt-link>
            </div>
          </nuxt-link>
        </b-carousel-slide>
      </div>
    </b-carousel>

    <p
      class="mt-1"
      v-show="showDescription"
      v-html="truncate(translate_description(getNews(moduleNews)[slide] , columnModule.descriptionType) , 200)"
      style="height: 50px; overflow: hidden"
      :style="{fontFamily: getFont(columnModule.font), backgroundColor: columnModule.backgroundColor , color: columnModule.color , padding: '5px'}"
    >
      <br />
      <br />
    </p>
  </div>
</template>

<script>
import mainModuleMixins from "~/mixins/mainModules";
import fontMixins from "~/mixins/fonts";

export default {
  name: "swiper",
  mixins: [mainModuleMixins, fontMixins],
  props: ["moduleNews", "columnModule"],
  data() {
    return {
      slide: 0,
      sliding: null,
      interval: 4000,
      automatic: true,
      animation: true,
      showTag: false,
      backgroundImage: "/placeholders/placeholder.jpg",
      showDescription: true,
      descriptionType: 1,
      tagText: 1
    };
  },
  computed: {
    imageRoot() {
      return this.$store.state.imageRoot;
    }
  },
  created() {
    this.interval = this.columnModule.swiperInterval;
    this.automatic = this.columnModule.swiperAutomatic;
    this.animation = this.columnModule.swiperAnimations;
    this.showTag = this.columnModule.showTag;
    this.tagText = this.columnModule.tagText;
    this.showDescription = this.columnModule.showDescription;
    this.descriptionType = this.columnModule.descriptionType;
    if (!this.automatic) this.interval = 0;
  },
  methods: {
    translate_tagText(news) {
      // 1--> news category
      // 2--> news subcategory
      // 3--> news news tags
      switch (this.tagText) {
        case 1:
          if (news.categories.length) {
            return news.categories[0].englishTitle;
          } else return "";
          break;
        case 2:
          if (news.subCategories.length) {
            return news.subCategories[0].englishTitle;
          } else return "";
          break;
        case 3:
          if (news.tags.length) {
            return news.tags[0].englishTitle;
          } else return "";
          break;
        default:
          return "";
      }
    },
    getBackgroundImage(item) {
      if (item.mainphoto) {
        return this.imageRoot + item.mainphoto.originalName;
      } else {
        return "/placeholders/placeholder.jpg";
      }
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

<style scoped>
.image_container {
  width: 100%;
  height: 100%;
  min-height: 250px;
  height: auto;
  background-image: url("/placeholders/placeholder.jpg");
  background-repeat: no-repeat;
  /* background-size: auto; */
  background-size: 100% 100%;
  background-position: center center;
  /* position: absolute; */
}

.overlay {
  max-width: 70%;
  width: max-content;
  padding: 2px 8px !important;
  min-height: 40px;
  border-radius: 5px;
  line-height: 40px;
  text-align: center;
  /* background-color: inherit;
  color: inherit !important; */
  font-weight: bold;
  font-size: 1.3em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 10;
}

.top_left {
  position: relative;
  top: 10px;
  left: 10px;
}
.bottom_left {
  position: absolute;
  bottom: 40px;
  left: 10px;
}

.bottom_left_alone {
  position: absolute;
  bottom: 40px;
  left: 10px;
}
</style>
