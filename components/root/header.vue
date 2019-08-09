<template>
  <div>
    <div
      class="header"
      :style="[{color: color, backgroundColor: backgroundColor, borderColor: color, height: height+'px'} , backgroundStyle]"
    >
      <div class="row justify-content-center">
        <div class="col-sm-2"></div>
        <div class="col-sm-9 pl-0 mt-2 top_container">
          <div class="top_media">
            <div class="media">
              <i class="fa fa-youtube icon"></i>
            </div>
            <div class="media">
              <i class="fa fa-twitter icon"></i>
            </div>
            <div class="media">
              <i class="fa fa-instagram icon"></i>
            </div>
            <div class="media">
              <i class="fa fa-facebook-f icon"></i>
            </div>
          </div>
          <div class="top_links_container">
            <div class="top_link border-0">Archive</div>
            <div class="top_link">WatchLive</div>
            <div class="top_link">Schedule</div>
            <div class="top_link">PressRelease</div>
            <div class="top_link">Media</div>
            <div class="top_link">Tags</div>
            <div class="top_link">UGC</div>
          </div>
        </div>
        <div class="col-sm-1"></div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-sm-2"></div>
        <div class="col-sm-9 pl-0 mt-2 top_container">
          <nuxt-link to="/users">
            <b-img src="/header/header.jpg" fluid right alt="header" class="img_top_margin" />
          </nuxt-link>
        </div>
        <div class="col-sm-1"></div>
      </div>
    </div>
    <div
      class="navigation_bar"
      :class="{'sticky' : scroll > 200 && header.type === 1}"
      :style="{color: color, backgroundColor: backgroundColor, borderColor: color}"
    >
      <div class="hidden_menu" :class="{'hidden_menu_active': showHidden}">
        <div class="row justify-content-center">
          <div class="col-sm-10 mt-4">
            <input
              type="text"
              class="search_input mb-4"
              v-model="search"
              name="search"
              placeholder="Search IranPress..."
            />
          </div>
          <div
            class="col-md-4 col-sm-6 hidden_link"
            v-for="item in headerItems"
            :key="item.id"
            v-if="!item.isMenu"
          >{{ item.text}}</div>
        </div>
      </div>
      <div class="search_input_container" :class="{ 'search_input_container_active': showSearch}">
        <input
          type="text"
          class="search_input"
          name="search"
          v-model="search"
          placeholder="Search IranPress..."
        />
      </div>
      <div class="search_bar_container">
        <i
          class="fa fa-search search_icon"
          aria-hidden="true"
          @click="toggleSearch"
          v-if="!needResponsive"
        ></i>
        <i class="fa fa-bars bars_icon" aria-hidden="true" @click="toggleHidden" v-else></i>
      </div>

      <div class="links_container" style="direction: rtl">
        <ul class="Menu -horizontal">
          <li
            v-for="item in headerItems"
            :key="item.id"
            class="main_menu_items"
            :class="{ '-hasSubmenu': item.hasMenu }"
            v-if="!item.isMenu && !needResponsive"
          >
            <a :href="getLink(item.redirectType,item.redirect)">{{ item.text }}</a>
            <ul
              v-if="item.hasMenu && getSubMenus(item.id).length"
              :style="[{color: color, backgroundColor: backgroundColor}]"
            >
              <li
                v-for="subItem in getSubMenus(item.id)"
                :key="subItem.id"
                :class="{ '-hasSubmenu': subItem.hasMenu }"
              >
                <a :href="getLink(subItem.redirectType,subItem.redirect)">{{ subItem.text }}</a>
                <ul
                  v-if="subItem.hasMenu && getSubMenus(subItem.id).length "
                  :style="[{color: color, backgroundColor: backgroundColor}]"
                >
                  <li
                    v-for="subsubItem in getSubMenus(subItem.id)"
                    :key="subsubItem.id"
                    :class="{ '-hasSubmenu': subsubItem.hasMenu }"
                  >
                    <a
                      :href="getLink(subsubItem.redirectType,subsubItem.redirect)"
                    >{{ subsubItem.text }}</a>
                    <ul v-if="subsubItem.hasMenu && getSubMenus(subsubItem.id).length">
                      <li
                        v-for="subsubsubItem in getSubMenus(subsubItem.id)"
                        :key="subsubsubItem.id"
                        :class="{ '-hasSubmenu': subsubsubItem.hasMenu }"
                      >
                        <a
                          :href="getLink(subsubsubItem.redirectType,subsubsubItem.redirect)"
                        >{{ subsubsubItem.text }}</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="logo_container">
        <nuxt-link to="/">
          <img src="/logo/logo.png" alt="logo" class="logo" v-if="!needResponsive" />
          <img src="/logo/logo_text.png" alt="logo" class="logo_text img-fluid" v-else />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainHeader",
  data() {
    return {
      error: "",
      links: [],
      headerItems: [],
      backgroundColor: "#203E90",
      color: "#ffffff",
      height: 250,
      showSearch: false,
      showHidden: false,
      needResponsive: false,
      categories: [],
      subCategories: [],
      linksCount: 4,
      search: "",
      width: 0,
      pages: [],
      backgroundStyle: {},
      image: null,
      header: null,
      backgroundImage: null,
      scroll: 0
    };
  },
  created() {
    this.getData();
    if (process.client) {
      window.addEventListener("resize", this.handleResize);
      window.addEventListener("scroll", this.handleScroll);
      this.handleResize();
      this.handleScroll();
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    backendRoot() {
      return this.$store.state.backendRoot;
    }
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
    },
    handleScroll() {
      this.scroll = window.scrollY;
    },
    translateItemName(redirect, redirectType) {
      switch (redirectType) {
        case 0:
          for (let i = 0; i < this.pages.length; i++) {
            if (this.pages[i].id === redirect) {
              return this.pages[i].name;
            }
          }
          break;
        case 1:
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id === redirect) {
              return this.categories[i].englishTitle;
            }
          }
          break;
        case 2:
          for (let i = 0; i < this.subCategories.length; i++) {
            if (this.subCategories[i].id === redirect) {
              return this.subCategories[i].englishTitle;
            }
          }
          break;
      }
      // return redirect;
    },
    getLink(redirectType, redirect) {
      if (redirectType === 0) {
        if (redirect === 1) return "/";
        else if (redirect == 2) return "#;";
        return "/" + redirect;
      } else if (redirectType === 2) {
        if (redirect) {
          return "/sub_categories/" + redirect;
        } else if (redirectType === 3) {
          return "/tags/" + redirect;
        }
      } else return "#";
    },
    getData() {
      this.$axios
        .$get("/api/header/all")
        .then(data => {
          this.pages = data.pages;
          this.categories = data.categories;
          this.subCategories = data.subCategories;
          this.image = data.image;
          this.header = data.header;
          this.linksCount = data.header.menuItems;
          this.color = data.header.textColor;
          this.backgroundColor = data.header.backgroundColor;
          this.height = data.header.height;
          this.headerItems = data.items;
          if (this.image) {
            this.backgroundStyle = {
              backgroundImage:
                "url(" +
                this.backendRoot +
                "?type=3&name=" +
                this.image.name +
                ")",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%"
              // backgroundAttachment: "fixed"
            };
          }
        })
        .catch(err => {
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    getSubMenus(id) {
      let subItems = [];
      for (let i = 0; i < this.headerItems.length; i++) {
        if (this.headerItems[i].isMenu && this.headerItems[i].parentId == id) {
          subItems.push(this.headerItems[i]);
        }
        if (i == this.headerItems.length - 1) {
          return subItems;
        }
      }
    },
    getStyle() {
      if (this.header)
        return {
          color: this.color,
          borderColor: this.color,
          backgroundColor: this.backgroundColor
        };
      else {
        return {
          color: "red",
          borderColor: "red",
          backgroundColor: "red"
        };
      }
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    toggleHidden() {
      this.showHidden = !this.showHidden;
    }
  },
  watch: {
    width: function(newVal) {
      switch (this.linksCount) {
        case 4:
          this.needResponsive = newVal < 750;
          break;
        case 5:
          this.needResponsive = newVal < 930;
          break;
        case 6:
          this.needResponsive = newVal < 1100;
          break;
        case 7:
          this.needResponsive = newVal < 1300;
          break;
        default:
          this.needResponsive = newVal < 1400;
      }
    }
  }
};
</script>

<style scoped>
.-hasSubmenu {
  background-color: inherit;
  color: inherit;
}
.-active {
  z-index: 99999999 !important;
  background-color: inherit;
  color: inherit;
}
.-visible {
  z-index: 99999999 !important;
  background-color: inherit;
  color: inherit;
}

.dropdown-submenu {
  position: relative;
}

.Menu {
  color: inherit;
}

ul > li {
  min-height: 50px;
  line-height: 50px;
}

.main_menu_items {
  color: inherit;
  font-size: 1.5em;
  margin-right: 20px;
}

.dropdown-submenu > .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -6px;
  margin-left: -1px;
  -webkit-border-radius: 0 6px 6px 6px;
  -moz-border-radius: 0 6px 6px;
  border-radius: 0 6px 6px 6px;
}

.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}

.dropdown-submenu > a:after {
  display: block;
  content: " ";
  float: right;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px 0 5px 5px;
  border-left-color: #ccc;
  margin-top: 5px;
  margin-right: -10px;
}

.dropdown-submenu:hover > a:after {
  border-left-color: #fff;
}

.dropdown-submenu.pull-left {
  float: none;
}

.dropdown-submenu.pull-left > .dropdown-menu {
  left: -100%;
  margin-left: 10px;
  -webkit-border-radius: 6px 0 6px 6px;
  -moz-border-radius: 6px 0 6px 6px;
  border-radius: 6px 0 6px 6px;
}
.header {
  /* min-height: 250px; */
  width: 100%;
}

.top_container {
  height: 50px;
}

.top_media {
  height: 100%;
  float: right;
  width: 20%;
}

.top_links_container {
  height: 100%;
  width: 75%;
  float: right;
  padding: 13px;
  box-sizing: border-box;
}

.media {
  border: 2px;
  border-style: solid;
  text-align: center;
  float: right;
  height: 40px;
  width: 40px;
  margin-right: 10px;
  border-radius: 100%;
  color: inherit;
  margin-top: 3px;
}

.icon {
  margin: 0 auto;
  line-height: 36px;
  font-size: 1.1em;
}

.top_link {
  height: 100%;
  line-height: 16px;
  border-right-width: 2px;
  border-right-style: solid;
  float: right;
  color: inherit;
  text-align: center;
  padding: 0 7px;
  font-size: 1.2em;
  font-weight: bold;
}

.sticky {
  position: fixed !important;
  top: -2px !important;
  z-index: 99999999;
}

@media only screen and (max-width: 1100px) {
  .top_link {
    font-size: 1.1em;
    font-weight: normal;
    border-right-width: 1px;
    padding: 0 5px;
  }

  .img_top_margin {
    margin-top: 20px;
    width: 85% !important;
  }
}

@media only screen and (max-width: 950px) {
  .top_media {
    width: 30%;
  }

  .top_links_container {
    width: 70%;
  }

  .media {
    margin-right: 5px;
    width: 35px;
    height: 35px;
    line-height: 25px;
  }

  .icon {
    margin-top: -3px;
  }

  .top_link {
    font-size: 1.1em;
    font-weight: normal;
    border-right-width: 1px;
    border-right-style: solid;
    padding: 0 5px;
  }
}

@media only screen and (max-width: 730px) {
  .top_media {
    width: 100% !important;
    clear: both;
  }

  .top_links_container {
    width: 100% !important;
    clear: both;
  }

  .img_top_margin {
    margin-top: 45px;
  }
}

.logo_container {
  height: 100%;
  width: 20%;
  float: right;
  /* border: 1px solid red; */
  /* text-align: right; */
  /* justify-content: center; */
}
.logo {
  position: absolute;
  left: 140px;
  bottom: 3px;
  height: 480% !important;
}

.logo_text {
  position: absolute;
  left: 10px;
  bottom: 10px;
}

@media only screen and (max-width: 1300px) {
  .logo {
    position: absolute;
    left: 10px;
    bottom: 3px;
  }
}

@media only screen and (max-width: 950px) {
  .logo {
    height: 250px;
  }
}

.navigation_bar {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-top: 2px;
  position: relative;
}

.links_container {
  height: 100%;
  width: 70%;
  float: right;
}

.search_bar_container {
  height: 100%;
  width: 10%;
  float: right;
  cursor: pointer;
  line-height: 50px;
  box-sizing: border-box;
  padding: 10px;
}

.search_icon {
  font-size: 1.7em;
  color: inherit;
  float: left;
  margin-left: 5px;
}

.bars_icon {
  font-size: 1.7em;
  color: inherit;
  float: left;
  margin-left: 5px;
}

.search_input_container {
  position: absolute;
  height: 85%;
  top: 5%;
  right: 10%;
  width: 0;
  overflow: hidden;
  z-index: 999;
  float: right;
  -moz-transition: width 0.3s ease-in-out;
  -o-transition: width 0.3s ease-in-out;
  -webkit-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
}

.search_input_container_active {
  width: 55%;
}

.search_input {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  font-size: 1.1em;
  padding-left: 10px;
  border-radius: 20px;
  border: none;
}

.link {
  float: right;
  color: inherit;
  padding: 0 10px;
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
}

.hidden_menu {
  position: absolute;
  top: 50px;
  width: 100%;
  background-color: inherit;
  z-index: 99999999;
  height: 0;
  overflow: hidden;
  -moz-transition: height 0.3s ease-in-out;
  -o-transition: height 0.3s ease-in-out;
  -webkit-transition: height 0.3s ease-in-out;
  transition: height 0.3s ease-in-out;
}

.hidden_menu_active {
  height: auto;
}

.hidden_link {
  color: inherit;
  font-size: 1.4em;
  font-weight: bold;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
}

@media only screen and (max-width: 1450px) {
  .link {
    font-size: 1.2em;
    padding: 0 8px;
  }
}

@media only screen and (max-width: 575px) {
  .img_top_margin {
    width: 95% !important;
  }
}
.links_container {
  padding-left: 80px;
}

.item_container {
  float: left;
}
</style>
