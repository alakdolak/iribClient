<template>
  <div>
    <div v-if="error" class="alert alert-danger text-center">{{error}}</div>
    <div class="footer_container" v-else>
      <div class="footer_list_container">
        <div class="row footerRowContainer mt-4" v-for="(row,index) in numberOfRows" :key="index">
          <div
            class="col footerColContainer"
            v-for="(col, index2) in numberOfListsPerRow"
            :key="index2"
          >
            <footerList
              :data="data"
              v-on:addItem="addItem"
              :list="footerLists[((row - 1) * numberOfListsPerRow) + col - 1]"
              v-if="loaded"
            ></footerList>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-10">
          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <label class="label">Number of rows:</label>
                <input
                  type="number"
                  min="1"
                  v-model.number="numberOfRows"
                  class="form-control"
                  @change="updateFooter"
                >
              </div>
              <div class="form-group">
                <label class="label">Number of lists per row:</label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  v-model.number="numberOfListsPerRow"
                  class="form-control"
                  @change="updateFooter"
                >
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-6">
                    <label for>Background Color:</label>
                    <input type="text" v-model="backgroundColor" class="form-control">
                    <verte
                      v-model="backgroundColor"
                      display="widget"
                      picker="square"
                      :enableAlpha="false"
                      :recentColors="false"
                      model="hex"
                      :rgbSliders="true"
                    ></verte>
                  </div>
                  <div class="col-sm-6">
                    <label for>Text Color:</label>
                    <input type="text" v-model="textColor" class="form-control">
                    <verte
                      v-model="textColor"
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
                  class="btn btn-lg btn-primary btn-block"
                  @click="updateFooter"
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
import verte from "verte";
import footerList from "~/components/admin-panel/menus/footerList";

export default {
  name: "footerDesign",
  layout: "adminPanel",
  components: {
    verte,
    footerList
  },
  data() {
    return {
      error: "",
      numberOfRows: 1,
      numberOfListsPerRow: 3,
      textColor: "#ffffff",
      backgroundColor: "#000000",
      footerLists: [],
      data: {
        pages: [],
        categories: [],
        subCategories: []
      },
      loaded: false
    };
  },
  created() {
    this.$store.commit("setAdminTitle", "Footer menu");
    this.getFooter();
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .$get("/api/footer/data")
        .then(data => {
          console.log(data);
          this.data.pages = data.pages;
          this.data.pages.splice(1);
          this.data.categories = data.categories;
          this.data.subCategories = data.subCategories;
          this.error = "";
          this.loaded = true;
        })
        .catch(err => {
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    getFooter() {
      this.$axios
        .$get("/api/footer")
        .then(data => {
          this.numberOfRows = parseInt(data.footerDesign.numberOfRows);
          this.numberOfListsPerRow = parseInt(
            data.footerDesign.numberOfListsPerRow
          );
          this.textColor = data.footerDesign.textColor;
          this.backgroundColor = data.footerDesign.backgroundColor;
          this.footerLists = data.footerLists;
          this.error = "";
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    updateFooter() {
      this.$axios
        .post("api/footer", {
          numberOfRows: this.numberOfRows,
          numberOfListsPerRow: this.numberOfListsPerRow,
          textColor: this.textColor,
          backgroundColor: this.backgroundColor
        })
        .then(data => {
          this.numberOfRows = parseInt(data.data.footerDesign.numberOfRows);
          this.numberOfListsPerRow = parseInt(
            data.data.footerDesign.numberOfListsPerRow
          );
          this.textColor = data.data.footerDesign.textColor;
          this.backgroundColor = data.data.footerDesign.backgroundColor;
          this.footerLists = data.data.footerLists;
          this.error = "";
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to save data to the database";
        });
    },
    addItem() {
      this.getFooter();
    }
  }
};
</script>


<style scoped>
.label {
  font-weight: bold;
  font-size: 1.2em;
}


.footer_list_container {
  background-color: white;
  margin-bottom: 100px;
  margin-top: 20px;
}
</style>
