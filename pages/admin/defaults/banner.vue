<template>
  <div>
    <div class="alert alert-danger text-center" v-if="error">{{error}}</div>
    <div class="row" v-else>
      <div class="col-sm-4">
        <b-button
          variant="outline-secondary"
          class="btn btn-block btn-outline-secondary btn-lg"
          v-b-modal.newBanner
        >Add Banner</b-button>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-sm-11">
        <div class="row mt-4 border" v-for="(banner,index) in banners" :key="banner.id">
          <div class="col-sm-6">
            <div class="banner_image">
              <img
                :src="backendRoot + '?type=1&name='+ banner.image"
                alt="banner.name"
                class="img-fluid"
              >
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for>Name:</label>
              <input
                type="text"
                class="form-control"
                v-model="banner.name"
                @change="updateBanner(banner)"
              >
            </div>
            <div class="form-group mt-2">
              <label for>Redirect to:</label>
              <select class="form-control" v-model="banner.redirect" @change="updateBanner(banner)">
                <option :value="option.id" v-for="option in pages" :key="option.id">{{option.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <button
                class="btn btn-danger btn-block"
                @click="deleteBanner(banner.id , index)"
              >Delete banner</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="newBanner" ref="newBanner" title="Add new banner" hide-footer>
      <div class="form-group" v-if="modalError">
        <div class="alert alert-danger text-center">{{modalError}}</div>
      </div>
      <div class="form-group">
        <label for>Name:</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="form-group">
        <label for>Image:</label>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="customFile" @change="getFile">
          <label class="custom-file-label" for="customFile">Choose file</label>
        </div>
      </div>
      <div class="form-group mt-4">
        <button class="btn btn-block btn-primary" @click="addBanner">ADD</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "adminBanner",
  layout: "adminPanel",
  data() {
    return {
      error: "",
      banners: [],
      name: "",
      file: null,
      modalError: "",
      pages: []
    };
  },
  created() {
    this.$store.commit("setAdminTitle", "Banners Module");
    this.getBanners();
    this.getPages();
  },
  computed: {
    backendRoot() {
      return this.$store.state.backendRoot;
    }
  },
  methods: {
    getFile(event) {
      this.file = event.target.files[0];
    },
    getPages() {
      this.$axios
        .$get("/api/pages")
        .then(data => {
          this.pages = data.pages;
        })
        .catch(err => {
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    getBanners() {
      this.$axios
        .$get("/api/banners")
        .then(data => {
          this.error = "";
          this.banners = data.banners;
        })
        .catch(err => {
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    addBanner() {
      if (!this.file || !this.name) {
        this.modalError = "Name and Image fields can not be empty";
      } else {
        const fd = new FormData();
        fd.append("image", this.file, this.file.name);
        fd.append("name", this.name);
        this.$axios
          .post("/api/banners", fd)
          .then(data => {
            this.modalError = "";
            this.error = "";
            this.banners.push(data.data.banner);
            this.file = null;
            this.name = "";
            this.$refs.newBanner.hide();
          })
          .catch(err => {
            console.log(err);
            this.error = "something went wrong trying to add banner";
          });
      }
    },
    updateBanner(banner) {
      this.$axios
        .post("/api/banners/update", {
          id: banner.id,
          redirect: banner.redirect,
          name: banner.name
        })
        .then(data => {})
        .catch(err => {
          console.log(err);
          this.error = "something went wrong trying to update banner";
        });
    },
    deleteBanner(id, index) {
      this.$axios
        .post("/api/banners/delete", {
          id: id
        })
        .then(data => {
          this.banners.splice(index, 1);
          this.error = "";
        })
        .catch(err => {
          console.log(err);
          this.error = "something went wrong trying to delete a banner";
        });
    }
  }
};
</script>

<style scoped>
.banner_image {
  max-height: 200px;
  margin: 0 auto;
}

.banner_image img {
  max-height: 200px;
}
</style>
