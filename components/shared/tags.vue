<template>
  <div>
    <div class="row" v-if="tags && tags.length">
      <div class="col-sm-12">
        <div class="news_detail_tag_container">
          <div class="news_detail_tag_tile text-secondary">Tags</div>
          <div class="news_detail_tags">
            <button
              type="button"
              class="btn btn-outline-dark btn-sm btn_tag"
              v-for="tag in tags"
              :key="tag.id"
            >{{tag.englishTitle}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tags",
  props: ["tags"]
};
</script>

<style scoped>
</style>
