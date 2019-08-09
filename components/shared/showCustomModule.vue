<template>
  <div>
    <div v-if="show === 0 && module && news.length">
      <div class="news_detail_side_top_news_container mt-4">
        <div class="news_detail_side_top_news_title top_first title_line">{{module.name}}</div>
        <nuxt-link
          :to="{name: 'details-id' , params: {id: item.news.id} }"
          v-for="item in news"
          :key="item.news.id"
        >
          <div class="news_detail_side_item_container distance_0 mt-2">
            <div class="row">
              <div class="col-sm-6">
                <div class="news_detail_side_item_image">
                  <img
                    src="/images/1.jpg"
                    class="img-fluid img-thumbnail"
                    alt
                    v-if="item.news.images.length"
                  >
                  <img
                    src="/placeholders/placeholder.jpg"
                    class="img-fluid img-thumbnail"
                    alt
                    v-else
                  >
                </div>
              </div>
              <div class="col-sm-6 padding_0">
                <div class="news_detail_side_item_description">{{item.news.title2}}</div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div v-if="show == 2 && module && news.length">
      <div class="row related_article_container">
        <div class="col-sm-12">
          <div class="news_detail_tag_container">
            <div class="news_detail_tag_tile text-secondary mb-3">{{module.name}}</div>
            <div class="row">
              <nuxt-link
                class="col-sm-3 related_article distance_0"
                :to="{name: 'details-id' , params: {id: item.news.id} }"
                v-for="(item , index) in news"
                :key="item.news.id"
                v-if="index <= 3"
              >
                <img
                  src="/images/1.jpg"
                  class="img-fluid img-thumbnail"
                  alt
                  v-if="item.news.images.length"
                >
                <img src="/placeholders/placeholder.jpg" class="img-fluid img-thumbnail" alt v-else>
                <div class="related_article_description text-muted">{{item.news.title2}}</div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  // 0 --> vertical
  // 1 --> list
  // 2 --> horizontal box
  // 3 --> slide show
  // 4 --> boxing size
  name: "showCustomModule",
  props: ["module_id", "show"],
  data() {
    return {
      news: [],
      module: null,
      error: ""
    };
  },
  created() {
    this.$axios
      .$get("/api/moduleNews/actives?module_id=" + this.module_id)
      .then(data => {
        this.news = data.moduleNews;
        this.module = data.module;
        console.log(this.module);
      })
      .catch(err => {
        this.error =
          "something went wrong trying to fetch data from the database";
      });
  }
};
</script>

<style scoped>
</style>
