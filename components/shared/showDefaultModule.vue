<template>
  <div>
    <comments v-if="type == 1"></comments>
    <tags v-if="type == 2" :tags="tags"></tags>
    <related-articles v-if="type == 3"></related-articles>
  </div>
</template>

<script>
import comments from "~/components/shared/comments";
import tags from "~/components/shared/tags";
import relatedArticles from "~/components/shared/relatedArticles";

export default {
  name: "showDefaultModule",
  props: ["type", "tags"],
  components: {
    comments,
    tags,
    relatedArticles
  }
};
</script>

<style scopeds></style>
