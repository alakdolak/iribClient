<template>
  <div class="container tags_container">
    <div class="row mt-5" v-for="(letter , index) in letters" :key="index">
      <div class="col-sm-3">
        <div class="tag_header">#{{uppercase(letter) }}</div>
      </div>
      <div class="col-sm-9 tags_button_container justify-content-center">
        <div class="row">
          <div v-for="(tag , index2) in group(letter)" class="col-md-4 col-sm-6" :key="index2">
            <button class="tag btn btn-block btn-outline-primary">#{{tag.englishTitle}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";

export default {
  name: "tags",
  layout: "default",
  data() {
    return {
      all_tags: [],
      letters: [],
      error: ""
    };
  },
  created() {
    this.$axios
      .$get("/api/tags")
      .then(tags => {
        this.all_tags = tags.tags;
        this.sort();
        this.getLetters();
      })
      .catch(err => {
        console.log(err);
        this.error =
          "something went wrong trying to get tags from the database";
      });
  },
  methods: {
    sort() {
      this.all_tags = lodash.sortBy(
        this.all_tags,
        [tag => tag.englishTitle.toLowerCase()],
        ["desc"]
      );
    },
    group(letter) {
      return lodash.filter(this.all_tags, function(tag) {
        return tag.englishTitle.toLowerCase().charAt(0) === letter;
      });
    },
    inArray: function(letter) {
      let length = this.letters.length;
      for (let i = 0; i < length; i++) {
        if (this.letters[i] === letter) return true;
      }
      return false;
    },
    getLetters() {
      let length = this.all_tags.length;
      for (let i = 0; i < length; i++) {
        if (
          !this.inArray(this.all_tags[i].englishTitle.toLowerCase().charAt(0))
        )
          this.letters.push(
            this.all_tags[i].englishTitle.toLowerCase().charAt(0)
          );
      }
      this.letters = lodash.sortBy(this.letters, "desc");
    },
    uppercase(letter) {
      return letter.toUpperCase();
    }
  }
};
</script>

<style scoped>
.tags_container {
  position: relative;
}

.tag_header {
  font-size: 15vmin;
  font-weight: bold;
  text-align: center;
}

..tags_button_container {
}

.tag {
  margin-top: 15px;
}
</style>
