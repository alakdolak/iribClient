<template>
  <div>
    <footer
      :style="{color: footer.textColor , backgroundColor: footer.backgroundColor, borderColor: footer.textColor}"
      v-if="footer"
    >
      <div class="container">
        <div class="weather_container">
          <weather></weather>
          <!--<weather :type="1"></weather>-->
        </div>
        <div
          class="row justify-content-center mt-4 mb-4"
          v-for="(row, index) in footer.numberOfRows"
          :key="index"
        >
          <div class="col" v-for="(column,index) in footer.numberOfListsPerRow" :key="index">
            <div
              class="footer_title"
            >{{ footerLists[((row - 1) * footer.numberOfListsPerRow) + column - 1 ].title }}</div>
            <a
              class="footer_item"
              :href="getLink(item)"
              :target="{'_blank' : item.type === 3}"
              v-for="item in footerLists[((row - 1) * footer.numberOfListsPerRow) + column - 1 ].footerListItems"
              :key="item.id"
            >{{ item.text}}</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import weather from "~/components/shared/weather";

export default {
  name: "mainFooter",
  components: { weather },
  data() {
    return {
      error: "",
      footerLists: [],
      footer: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .$get("/api/footer/all")
        .then(data => {
          this.error = "";
          this.footer = data.footer;
          this.footerLists = data.footerLists;
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    getLink(item) {
      if (item.type === 0) {
        if (item.pageId === 1) return "/";
        else if (item.pageId == 2) return "#;";
        else return "/" + item.pageId;
      } else if (item.type === 2) {
        return "/sub_categories" + item.subCategoryId;
      } else if (item.type === 3) {
        return item.url;
      } else return "#";
    }
  }
};
</script>


<style scoped>
footer {
  color: white;
  padding: 25px 0;
  width: 100%;
  overflow: hidden !important;
}

.footer_logo img {
  width: 100px;
  height: auto;
}

.footer_logo_text {
  width: 100%;
  height: 100px;
  color: inherit;
  margin-top: 10px;
}

.weather_container {
  /*border: 1px solid red;*/
  /*float: left;*/
  height: auto;
  width: 400px;
  clear: both;
  margin-bottom: 40px;
}

.footer_title {
  /*text-align: center;*/
  width: 100%;
  margin: 0 auto;
  height: 40px;
  line-height: 40px;
  font-size: 2em;
  font-weight: bolder;
  letter-spacing: 0.2em;
  text-align: center;
}

.footer_item {
  width: 100%;
  margin: 15px auto;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: block;
  font-size: 1.3em;
}

.footer_item a {
  color: inherit;
  text-decoration: none;
}

.social_icon_container {
  width: 70%;
  box-sizing: border-box;
  margin: 0 auto;
}

.social_icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: inherit;
  border-width: 2px;
  border-style: solid;
  text-align: center;
  cursor: pointer;
  font-size: 1.4em;
  margin: 0 auto;
  margin-top: 5px;
}

.social_icon:hover {
  color: #0f2757;
  background-color: #fff;
}
</style>
