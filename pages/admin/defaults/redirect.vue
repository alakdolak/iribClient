<template>
  <div>
    <div class="alert alert-danger text-center" v-if="error">{{error}}</div>
    <div v-else>
      <div class="row">
        <div class="col-sm-4">
          <b-button
            variant="outline-secondary"
            class="btn btn-block btn-outline-secondary btn-lg"
            v-b-modal.addRedirect
          >Add new redirect</b-button>
        </div>
      </div>
      <div class="row justify-content-center mt-4">
        <div class="col-sm-10">
          <div class="row justify-content-start">
            <div class="col-sm-4 mt-3" v-for="(redirect,index) in redirects" :key="redirect.id">
              <div class="card">
                <img
                  :src=" backendRoot+ '?type=2&name=' + redirect.image"
                  :alt="redirect.name"
                  class="img-fluid card-img-top"
                />
                <div class="card-body" v-if="settingIndex !== index">
                  <div class="card-title">
                    <h2>{{redirect.name}}</h2>
                  </div>
                  <div class="card-title mt-4">Redirect type: {{translate_type(redirect.type)}}</div>
                  <div
                    class="card-title mt-4"
                  >Redirect To: {{translate_redirect(redirect.type , redirect.redirect, redirect.url)}}</div>
                  <div class="row mt-3">
                    <div class="col-sm-6">
                      <button class="btn btn-info btn-sm btn-block" @click="editButton(index)">Edit</button>
                    </div>
                    <div class="col-sm-6">
                      <button
                        class="btn btn-danger btn-sm btn-block"
                        @click="showAlert(redirect.redirectId,redirect.redirectName,index)"
                      >Delete</button>
                    </div>
                  </div>
                </div>
                <div class="card-body" v-else>
                  <div class="form-group">
                    <label for>Name:</label>
                    <input type="text" v-model="redirect.name" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label>Redirect Type:</label>
                    <select
                      class="form-control"
                      v-model="redirect.type"
                      @change="changeTypeSetting(redirect.type , index)"
                    >
                      <option :value="0">Page</option>
                      <!-- <option :value="1">Category</option> -->
                      <option :value="2">Sub categroy</option>
                      <option :value="3">Url</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Redirect to:</label>
                    <select
                      class="form-control"
                      v-model="redirect.redirec"
                      v-if="redirect.type !== 3"
                    >
                      <option
                        :value="option.value"
                        v-for="option in settingOptions"
                        :key="option.value"
                      >{{option.text}}</option>
                    </select>
                    <input type="text" v-model="redirect.url" class="form-control" v-else />
                  </div>
                  <div class="form-group" v-if="updateError">
                    <div class="alert alert-danger text-center">{{updateError}}</div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-block btn-warning" @click="cancelButton">Cancel</button>
                    <button class="btn btn-block btn-primary" @click="updateSetting(index)">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- adding new redirect -->
    <b-modal id="addRedirect" ref="addRedirect" title="Add Redirect" hide-footer>
      <div class="form-group">
        <div class="alert alert-danger text-center" v-if="modalError">{{modalError}}</div>
      </div>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" v-model="name" class="form-control" />
      </div>
      <div class="form-group">
        <label for>Image:</label>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="customFile" @change="getFile" />
          <label class="custom-file-label" for="customFile">Choose file</label>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block" @click="addRedirect">Add</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import lodash from "lodash";
export default {
  name: "redirectDefault",
  layout: "adminPanel",
  data() {
    return {
      error: "",
      redirects: [],
      name: "",
      file: null,
      modalError: "",
      categories: [],
      sibCategories: [],
      pages: [],
      settingOptions: [],
      settingIndex: -1,
      type: 0,
      redirect: 0,
      updateError: ""
    };
  },
  created() {
    this.$store.commit("setAdminTitle", "Redirect");
    this.getRedirects();
  },
  computed: {
    backendRoot() {
      return this.$store.state.backendRoot;
    }
  },
  methods: {
    showAlert(redirectId, redirectName, index) {
      this.$swal
        .fire({
          title: "deleting " + redirectName + " page",
          text: "are you sure ? You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it! "
        })
        .then(result => {
          if (result.value) {
            this.$axios
              .post("/api/redirects/delete", {
                redirectId: redirectId
              })
              .then(data => {
                this.redirects.splice(index, 1);
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
    },
    editButton(index) {
      this.settingIndex = index;
      this.updateError = "";
      this.changeType(this.redirects[index].type);
    },
    cancelButton() {
      this.settingIndex = -1;
      this.updateError = "";
    },
    translate_redirect(type, redirect, url) {
      let index = 0;
      switch (type) {
        case 0:
          index = lodash.findIndex(this.pages, { id: redirect });
          return this.pages[index].name;
          break;
        case 1:
          index = lodash.findIndex(this.categories, { id: redirect });
          return this.categories[index].englishTitle;
          break;
        case 2:
          index = lodash.findIndex(this.subCategories, { id: redirect });
          return this.subCategories[index].englishTitle;
          break;
        case 3:
          return url;
          break;
      }
    },
    translate_type(type) {
      switch (type) {
        case 0:
          return "Page";
        case 1:
          return "Category";
        case 2:
          return "Sub category";
        case 3:
          return "Url";
      }
    },
    updateSetting(index) {
      if (!this.redirects[index].name)
        this.updateError = "Name field can not be empty";
      else {
        console.log("updating = " + index);
        this.$axios
          .post("/api/redirects/update", {
            id: this.redirects[index].id,
            type: this.redirects[index].type,
            name: this.redirects[index].name,
            redirect: this.redirects[index].redirect,
            url: this.redirects[index].url
          })
          .then(data => {
            this.redirects[index] = data.data.redirect;
            this.settingIndex = -1;
            this.updateError = "";
          })
          .catch(err => {
            this.error =
              "something went wrong trying to update data in the database";
          });
      }
    },
    changeTypeSetting(type, index) {
      this.redirects[index].redirect = 1;
      this.changeType(type);
    },
    changeType(type) {
      this.settingOptions = [];
      switch (type) {
        case 0:
          for (let i = 0; i < this.pages.length; i++) {
            this.settingOptions.push({
              text: this.pages[i].name,
              value: this.pages[i].id
            });
          }
          break;
        case 1:
          for (let i = 0; i < this.categories.length; i++) {
            this.settingOptions.push({
              text: this.categories[i].englishTitle,
              value: this.categories[i].id
            });
          }
          break;
        case 2:
          for (let i = 0; i < this.subCategories.length; i++) {
            this.settingOptions.push({
              text: this.subCategories[i].englishTitle,
              value: this.subCategories[i].id
            });
          }
          break;
      }
    },
    getFile(event) {
      this.file = event.target.files[0];
    },
    checkForm() {
      if (!this.name || !this.file)
        this.modalError = "you need to fill all the fields";
    },
    getRedirects() {
      this.$axios
        .$get("/api/redirects")
        .then(data => {
          this.error = "";
          this.modalError = "";
          this.redirects = data.redirects;
          this.pages = data.pages;
          this.categories = data.categories;
          this.subCategories = data.subCategories;
          this.changeType(0);
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    addRedirect() {
      if (!this.file || !this.name) {
        this.modalError = "Name and Image fields can not be empty";
      } else {
        const fd = new FormData();
        fd.append("image", this.file, this.file.name);
        fd.append("name", this.name);
        this.$axios
          .post("/api/redirects", fd)
          .then(data => {
            this.modalError = "";
            this.error = "";
            this.redirects.push(data.data.redirect);
            this.file = null;
            this.name = "";
            this.$refs.addRedirect.hide();
          })
          .catch(err => {
            console.log(err);
            this.error = "something went wrong trying to add banner";
          });
      }
    }
  }
};
</script>
