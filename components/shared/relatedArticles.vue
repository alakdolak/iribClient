<template>
  <div>
    <div class="row related_article_container">
      <div class="col-sm-12">
        <div class="news_detail_tag_container">
          <div class="news_detail_tag_tile text-secondary">Related Articles</div>
          <div class="row">
            <div class="col-sm-3 related_article">
              <img src="/placeholders/placeholder.jpg" class="img-fluid img-thumbnail" alt>
              <div class="related_article_description text-muted">title is here</div>
            </div>
            <div class="col-sm-3 related_article">
              <img src="/placeholders/placeholder.jpg" class="img-fluid img-thumbnail" alt>
              <div class="related_article_description text-muted">title is here</div>
            </div>
            <div class="col-sm-3 related_article">
              <img src="/placeholders/placeholder.jpg" class="img-fluid img-thumbnail" alt>
              <div class="related_article_description text-muted">title is here</div>
            </div>
            <div class="col-sm-3 related_article">
              <img src="/placeholders/placeholder.jpg" class="img-fluid img-thumbnail" alt>
              <div class="related_article_description text-muted">title is here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "relatedArticles"
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  /* img {
    max-height: 300px;
    margin-top: 150px;
  } */

  .related_article {
    height: 400px;
  }

  .related_article_container {
    clear: both;
    height: auto;
    margin-bottom: 30px;
  }
}
</style>
