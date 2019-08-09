<template>
  <div>
    <div class="row">
      <nuxt-link
        :to="{name: 'details-id' , params:{id: getNews(moduleNews)[0].id}}"
        class="col-sm-12"
      >
        <div
          class="col-sm-12 p-0 m-0 item_container text-center"
          v-if="getNews(moduleNews)[0].mainphoto"
        >
          <img
            :src=" imageRoot + getNews(moduleNews)[0].mainphoto.originalName"
            :alt="getNews(moduleNews)[0].mainphoto.originalName"
            class="img-fluid"
          />
        </div>
        <div
          class="col-sm-12 p-0 m-0 item_container text-center"
          style="text-align: center;"
          v-else
        >
          <img src="/placeholders/placeholder2.jpg" alt class="img-fluid" />
        </div>
      </nuxt-link>
    </div>
  </div>
</template>


<script>
import lodash from "lodash";
import mainModuleMixins from "~/mixins/mainModules";

export default {
  name: "oneImage",
  props: ["moduleNews"],
  mixins: [mainModuleMixins],
  data() {
    return {
      images: []
    };
  },
  computed: {
    imageRoot() {
      return this.$store.state.imageRoot;
    }
  },
  created() {
    this.images = this.sortWithActiveSince();
  },
  methods: {
    sortWithActiveSince() {
      return lodash.sortBy(this.images, ["active_since"]).reverse();
    }
  }
};
</script>

<style scoped>
img {
  max-height: 500px;
  margin: 0 auto;
}
</style>
