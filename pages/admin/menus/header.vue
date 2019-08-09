<template>
  <div>
    <div class="alert alert-danger text-center" v-if="error">{{error}}</div>
    <div class="container mt-4" v-else>
      <div class="row mb-4 mt-2">
        <div class="col-sm-4">
          <b-button
            variant="outline-secondary"
            class="btn btn-block btn-outline-secondary btn-lg"
            v-b-modal.newHeaderItem
          >Add Item</b-button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-6" v-for="item in headerItems" :key="item.id" v-if="!item.isMenu">
          <div class="card">
            <div class="card-header">
              <header-item
                v-on:onEditItem="onEditItem"
                v-on:onItemAdded="onItemAdded"
                v-on:onItemDeleted="onItemDeleted"
                :item="item"
                :pages="pages"
                :categories="categories"
                :subCategories="subCategories"
              ></header-item>
            </div>
            <ul class="list-group" v-if="getSubMenus(item.id).length">
              <!-- first level -->
              <li
                class="list-group-item list-group-item-action border-0"
                style="padding-right: 1.25rem !important;"
                v-for="subItem in getSubMenus(item.id)"
                :key="subItem.id"
              >
                <header-item
                  v-on:onEditItem="onEditItem"
                  v-on:onItemAdded="onItemAdded"
                  v-on:onItemDeleted="onItemDeleted"
                  :item="subItem"
                  :pages="pages"
                  :categories="categories"
                  :subCategories="subCategories"
                  :level="1"
                ></header-item>
                <ul class="list-group mt-5" v-if="getSubMenus(subItem.id).length">
                  <!-- second level -->
                  <li
                    class="list-group-item list-group-item-action border-0"
                    v-for="subsubItem in getSubMenus(subItem.id)"
                    :key="subsubItem.id"
                  >
                    <header-item
                      v-on:onEditItem="onEditItem"
                      v-on:onItemAdded="onItemAdded"
                      v-on:onItemDeleted="onItemDeleted"
                      :item="subsubItem"
                      :pages="pages"
                      :categories="categories"
                      :subCategories="subCategories"
                      :level="2"
                    ></header-item>
                    <ul class="list-group mt-5" v-if="getSubMenus(subsubItem.id).length">
                      <!-- third level here -->
                      <li
                        class="list-group-item list-group-item-action border-0 border-top"
                        v-for="subsubsubItem in getSubMenus(subsubItem.id)"
                        :key="subsubsubItem.id"
                      >
                        <header-item
                          v-on:onEditItem="onEditItem"
                          v-on:onItemAdded="onItemAdded"
                          v-on:onItemDeleted="onItemDeleted"
                          :item="subsubsubItem"
                          :pages="pages"
                          :categories="categories"
                          :subCategories="subCategories"
                          :addButton="false"
                          :level="3"
                        ></header-item>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-10">
          <!-- <div class="row mb-4 mt-2">
            <div class="col header_option" v-for="index in menuItems" :key="index.id">
              <select
                v-model="selectedPages[index - 1]"
                class="form-control"
                @change="updateHeader"
              >
                <option :value="0">-</option>
                <option :value="page.id" v-for="page in pages" :key="page.id">{{page.name}}</option>
              </select>
            </div>
          </div>-->
          <div class="card mt-3 mb-5">
            <div class="card-header">
              <h4>
                <i class="fa fa-cog"></i> Setting
              </h4>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for class="label">Header type:</label>
                <select v-model="type" class="form-control" @change="updateHeader">
                  <option :value="0">Default</option>
                  <option :value="1">Sticky</option>
                </select>
              </div>
              <div class="form-group">
                <label for>Height:</label>
                <input type="number" min="100" step="5" v-model="height" class="form-control" />
              </div>
              <div class="form-group">
                <label for class="label">Number of menu items:</label>
                <select v-model="menuItems" class="form-control" @change="updateHeader">
                  <option :value="4">4</option>
                  <option :value="5">5</option>
                  <option :value="6">6</option>
                  <option :value="7">7</option>
                  <option :value="8">8</option>
                  <option :value="9">9</option>
                </select>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-6">
                    <label for class="label">background color:</label>
                    <input type="text" class="form-control" v-model="backgroundColor" />
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
                    <label for class="label">text color:</label>
                    <input type="text" class="form-control" v-model="textColor" />
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
              <div class="form-group"></div>
              <div class="form-group">
                <label class="label">Upload background Images:</label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="customFile" @change="getFile" />
                  <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
              </div>
              <div class="form-group">
                <label class="label">Choose Background</label>
                <multiselect
                  v-model="selectedImage"
                  placeholder="Choose header background"
                  label="name"
                  track-by="id"
                  openDirection="below"
                  :options="images"
                  :maxHeight="400"
                  :option-height="200"
                >
                  <template slot="singleLabel" slot-scope="props">
                    <img
                      class="option__image img-fluid"
                      :src="backendRoot + '?type=3&name=' + props.option.name"
                      alt="No Man’s Sky"
                    />
                    <span class="option__desc"></span>
                  </template>
                  <template slot="option" slot-scope="props">
                    <img
                      class="option__image"
                      :src="backendRoot + '?type=3&name='+props.option.name"
                      alt="background"
                    />
                  </template>
                </multiselect>
              </div>
              <div class="form-group">
                <button
                  class="btn btn-lg btn-block btn-primary"
                  @click="updateHeader"
                >UPDATE SETTING</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 400px; clear: both;"></div>
    </div>

    <!-- new header item modal  -->
    <b-modal id="newHeaderItem" ref="newHeaderItem" title="Add new header item" hide-footer>
      <div class="form-group">
        <div class="alert alert-danger text-center" v-if="modalError">{{modalError}}</div>
      </div>
      <div class="form-group">
        <label for>Name:</label>
        <input type="text" class="form-control" placeholder="Enter item name here" v-model="text" />
      </div>
      <div class="form-group">
        <label for>Redirect Type:</label>
        <select class="form-control" v-model="redirectType" @change="changeRedirectType">
          <option :value="0">Page</option>
          <!-- <option :value="1">Category</option> -->
          <option :value="2">Sub Category</option>
        </select>
      </div>
      <div class="form-group">
        <label>Redirect To :</label>
        <select class="form-control" v-model="redirect">
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >{{option.text}}</option>
        </select>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block" @click="addHeaderItem">Add Item</button>
      </div>
    </b-modal>
  </div>
</template>



<script>
import Multiselect from "vue-multiselect";
import verte from "verte";
import headerItem from "~/components/admin-panel/menus/headerItem";
export default {
  name: "headerDesign",
  layout: "adminPanel",
  components: {
    Multiselect,
    verte,
    headerItem
  },
  data() {
    return {
      error: "",
      menuItems: 4,
      type: 1,
      backgroundColor: "#203E90",
      textColor: "#ffffff",
      height: 250,
      selectedPages: [],
      images: [],
      selectedImage: null,
      pagesString: "",
      file: null,
      headerItems: [],
      pages: [],
      categories: [],
      subCategories: [],
      options: [],
      modalError: "",

      // new header item modal
      text: "",
      redirect: null,
      redirectType: 0,
      parentId: null
    };
  },
  async created() {
    this.$store.commit("setAdminTitle", "Header menu");
    await this.getHeader();
    this.getHeaderItems();
    await this.unStringifyPages();
  },
  computed: {
    backendRoot() {
      return this.$store.state.backendRoot;
    }
  },
  methods: {
    onItemAdded(item) {
      this.headerItems.push(item);
    },
    onItemDeleted(id) {
      this.getHeaderItems();
    },
    onEditItem(item) {
      console.log("onEditItem");
      console.log(item);
      for (let i = 0; i < this.headerItems.length; i++) {
        if (this.headerItems[i].id === item.id) {
          console.log("item found");
          // this.headerItems[i] = item;
          this.$set(this.headerItems, i, item);
        }
      }
    },
    changeRedirectType() {
      this.options = [];
      if (this.redirectType === 0) {
        for (let i = 0; i < this.pages.length; i++) {
          this.options.push({
            text: this.pages[i].name,
            value: this.pages[i].id
          });
        }
      } else if (this.redirectType === 1) {
        for (let i = 0; i < this.categories.length; i++) {
          this.options.push({
            text: this.categories[i].englishTitle,
            value: this.categories[i].id
          });
        }
      } else {
        for (let i = 0; i < this.subCategories.length; i++) {
          this.options.push({
            text: this.subCategories[i].englishTitle,
            value: this.subCategories[i].id
          });
        }
      }
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

    addHeaderItem() {
      if (!this.text || !this.redirect) {
        this.modalError = "all inputs should be filled";
        return;
      } else {
        this.$axios
          .post("/api/header/items/add", {
            text: this.text,
            redirectType: this.redirectType,
            redirect: this.redirect
          })
          .then(data => {
            this.headerItems.push(data.data.headerItem);
            this.error = "";
            this.modalError = "";
            this.redirectType = 0;
            this.text = "";
            this.redirect = null;
            this.changeRedirectType();
            this.$refs.newHeaderItem.hide();
          })
          .catch(err => {
            this.error =
              "something went wrong trying to save data to the database";
          });
      }
    },
    getHeaderItems() {
      this.$axios
        .$get("/api/header/items")
        .then(data => {
          this.headerItems = data.headerItems;
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    getFile(event) {
      this.file = event.target.files[0];
      this.uploadFile();
    },
    uploadFile() {
      const fd = new FormData();
      fd.append("image", this.file, this.file.name);
      this.$axios
        .post("/api/header/image", fd, {
          onUploadProgress: uploadEvent => {
            console.log(
              "upload progress: " +
                Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
                "%"
            );
          }
        })
        .then(data => {
          this.images.push(data.data.image);
        })
        .catch(err => {});
    },
    getSelectedImage() {
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i].selected === true) {
          this.selectedImage = this.images[i];
        }
      }
    },
    getHeader() {
      this.$axios
        .$get("/api/header/setting")
        .then(data => {
          this.type = data.headerDesign.type;
          this.menuItems = data.headerDesign.menuItems;
          this.backgroundColor = data.headerDesign.backgroundColor;
          this.textColor = data.headerDesign.textColor;
          this.pagesString = String(data.headerDesign.pagesString);
          this.images = data.images;
          this.pages = data.pages;
          this.pages.splice(1);
          this.categories = data.categories;
          this.subCategories = data.subCategories;
          this.error = "";
          this.modalError = "";
          this.unStringifyPages();
          this.changeRedirectType();
        })
        .catch(err => {
          console.log("erroe happened");
          console.log(err);
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    updateHeader() {
      this.stringifyPages();
      this.$axios
        .$post("/api/header", {
          type: this.type,
          menuItems: this.menuItems,
          backgroundColor: this.backgroundColor,
          textColor: this.textColor,
          pagesString: this.pagesString,
          height: this.height
        })
        .then(data => {
          this.type = data.data.headerDesign.type;
          this.menuItems = data.data.headerDesign.menuItems;
          this.backgroundColor = data.data.headerDesign.backgroundColor;
          this.textColor = data.data.headerDesign.textColor;
          this.pagesString = String(data.data.headerDesign.pagesString);
          this.error = "";
        })
        .catch(err => {
          this.error = "something went wrong trying to update the database";
        });
    },
    stringifyPages() {
      this.pagesString = this.selectedPages.join("-");
    },
    unStringifyPages() {
      if (this.pagesString && this.pagesString.length)
        this.selectedPages = this.pagesString.split("-");
      for (let i = 0; i < this.selectedPages.length; i++)
        this.selectedPages[i] = parseInt(this.selectedPages[i]);
    },
    selectPhoto() {
      let id = this.selectedImage ? this.selectedImage.id : 0;
      this.$axios
        .post("/api/header/image/select", {
          imageId: id
        })
        .then(data => {
          this.image = data.data.images;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    pagesString: function(newVal) {
      this.unStringifyPages();
    },
    images: function(newVal) {
      this.getSelectedImage();
    },
    selectedImage: function(newVal) {
      this.selectPhoto();
    }
  }
};
</script>

<style scoped>
.label {
  font-weight: bold;
  font-size: 1.2em;
}

.title {
  font-size: 1.2em;
}

.option__image {
  margin: 0 auto;
  max-height: 150px;
}

.list-group-item {
  padding-right: 0 !important;
  /* padding-left: 10px !important; */
  margin: 0 !important;
}
</style>

