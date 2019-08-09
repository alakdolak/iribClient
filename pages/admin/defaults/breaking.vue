<template>
  <div>
    <div class="alert alert-danger text-center" v-if="error">{{error}}</div>
    <div v-else-if="design">
      <div class="row justify-content-center preview">
        <div class="col-sm-10">
          <breaking-news :texts="texts" :design="design"></breaking-news>
        </div>
      </div>
      <div class="row justify-content-center mt-4">
        <div class="col-sm-10">
          <div class="card">
            <div class="card-header">
              <h2>Setting</h2>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for>Interval:</label>
                <input type="number" class="form-control" v-model="design.interval" step="500">
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-6">
                    <label for>Background Color:</label>
                    <input type="text" v-model="design.backgroundColor" class="form-control">
                    <verte
                      v-model="design.backgroundColor"
                      display="widget"
                      picker="square"
                      :enableAlpha="false"
                      :recentColors="false"
                      model="hex"
                      :rgbSliders="true"
                    ></verte>
                  </div>
                  <div class="col-sm-6">
                    <label for>Color:</label>
                    <input type="text" v-model="design.textColor" class="form-control">
                    <verte
                      v-model="design.textColor"
                      display="widget"
                      picker="square"
                      :enableAlpha="false"
                      :recentColors="false"
                      model="hex"
                      :rgbSliders="true"
                    ></verte>
                  </div>
                </div>
              </div>
              <div class="form-group mt-5">
                <button
                  class="btn btn-primary btn-block btn-lg"
                  @click="updateSetting"
                >Update Setting</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breakingNews from "~/components/root/mainModules/breakingNews";
import verte from "verte";
export default {
  name: "breakingNewsPage",
  layout: "adminPanel",
  components: {
    breakingNews,
    verte
  },
  data() {
    return {
      design: null,
      error: "",
      texts: [
        "this is test numbe 1",
        "this is test numbe 2",
        "this is test numbe 3",
        "this is test numbe 4"
      ]
    };
  },
  created() {
    this.$store.commit("setAdminTitle", "Breaking News");
    this.getBreakingNewsDesign();
  },
  methods: {
    getBreakingNewsDesign() {
      this.$axios
        .$get("/api/breaking")
        .then(data => {
          this.design = data.breakingDesign;
          this.error = "";
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    updateSetting() {
      this.$axios
        .post("/api/breaking", {
          id: this.design.id,
          textColor: this.design.textColor,
          backgroundColor: this.design.backgroundColor,
          interval: this.design.interval
        })
        .then(data => {
          this.design = data.breakingDesign;
          this.error = "";
        })
        .catch(err => {
          console.log(err);
          this.error = "someting went wrong trying to update data";
        });
    }
  }
};
</script>

