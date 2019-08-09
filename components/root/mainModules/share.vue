<template>
  <div class="share_container">
    <social-sharing
      :url="url"
      :title="news.title"
      :description="news.title2"
      :quote="news.title2"
      hashtags="IranPress"
      twitter-user="IranPress"
      inline-template
      v-for="share in shares"
      :key="share.id"
      v-if="findShare(share.name)"
      class="social_sharing"
    >
      <div>
        <network :network="share.name" class="social_network">
          <i :class="'fa ' + share.icon"></i>
          <!--<span v-if="share.showTitle">{{share.title}}</span>-->
        </network>
      </div>
    </social-sharing>
  </div>
</template>


<script>
export default {
  name: "shareModule",
  props: ["news"],
  data() {
    return {
      shares: [],
      error: "",
      url: ""
    };
  },
  created() {
    this.getShares();
    this.url = window.location.href;
    1;
  },
  methods: {
    findShare(name) {
      for (let i = 0; i < this.shares.length; i++) {
        if (this.shares[i].name === name && this.shares[i].enabled) return true;
      }
      return false;
    },
    getShares() {
      this.$axios
        .$get("/api/shares")
        .then(data => {
          this.shares = data.shares;
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to get data from the database";
        });
    }
  }
};
</script>

<style scoped>
.share_container {
  clear: both;
  width: 100%;
}

.social_sharing {
  float: left;
  margin-left: 15px;
  font-size: 1.3em;
  cursor: pointer;
}
</style>

