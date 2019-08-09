<template>
  <div class="container">
    <div
      class="row news_detail_container news_container justify-content-center mt-4"
      :class="preview_container_style()"
    >
      <div class="main_container" :class="main_style()">
        <div class="row">
          <div class="col-sm-12">
            <h1 class="news_detail_top_title text-secondary">{{news.title}}</h1>
            <div class="news_detail_writer_container">
              <div class="row justify-content-center">
                <div class="col-sm-6">
                  <div class="news_detail_writer_image">
                    <a
                      class="news_detail_writer_description text-muted"
                      href="#"
                    >{{ getWriter(news) }}</a>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="news_detail_time text-muted">{{ show_time(news.createdAt) }}</div>
                </div>
              </div>
            </div>
            <hr />
            <div class="news_detail_description text-default">
              <p v-html="news.content"></p>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <h5>Share:</h5>
                <share-module :news="news"></share-module>
              </div>
            </div>

            <div class="clearfix"></div>
            <div class="main_module_container mt-4" v-for="module in mainModules" :key="module.id">
              <show-custom-module
                v-if="module.module.type === 0"
                :show="2"
                :module_id="module.moduleId"
              ></show-custom-module>
              <show-default-module v-else :type="module.module.type" :tags="news.tags"></show-default-module>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar_container col" v-if="design.sidebar">
        <div class="sidebar_module_container" v-for="module in sidebarModules" :key="module.id">
          <show-custom-module
            v-if="module.module.type === 0"
            :show="0"
            :module_id="module.moduleId"
          ></show-custom-module>
        </div>
      </div>
    </div>
  </div>
</template>
p
<script>
import showCustomModule from "~/components/shared/showCustomModule";
import showDefaultModule from "~/components/shared/showDefaultModule";
import shareModule from "~/components/root/mainModules/share";
import moment from "moment";

export default {
  name: "detailsPage",
  layout: "default",
  components: {
    showCustomModule,
    showDefaultModule,
    shareModule
  },
  props: ["newsTest"],
  data() {
    return {
      news: [],
      sidebarModules: [],
      mainModules: [],
      design: []
    };
  },

  created() {
    this.$axios
      .get("/api/news/details?news_id=" + this.$route.params.id)
      .then(res => {
        this.news = res.data.news;
        this.sidebarModules = res.data.sidebarModules;
        this.mainModules = res.data.mainModules;
        this.design = res.data.design;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    show_time(createdAt) {
      return moment(createdAt);
    },
    getWriter(news) {
      return "";
    },
    preview_container_style() {
      return {
        rtl: !this.design.direction
      };
    },
    main_style() {
      return {
        "col-sm-12": !this.design.sidebar,
        "col-sm-9": this.design.sidebar && this.design.sidebar_size == 1,
        "col-sm-8": this.design.sidebar && this.design.sidebar_size == 2,
        "col-sm-7": this.design.sidebar && this.design.sidebar_size == 3
      };
    }
  }
};
</script>
<style scoped>
.news_container {
  max-width: 1200px !important;
}
</style>
