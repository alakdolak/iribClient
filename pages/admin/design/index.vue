<template>
  <div>
    <div class="alert alert-danger text-center" v-if="error">{{error}}</div>
    <div v-else>
      <div class="row mb-4">
        <div class="col-sm-4">
          <b-button
            variant="outline-secondary"
            v-b-modal.addPageModal
            class="btn btn-block btn-lg btn-outline-secondary"
          >ADD NEW PAGE</b-button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-10 table-responsive">
          <table class="table table-hover table-striped text-center">
            <thead class="thead-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(page , index) in pages" :key="index">
                <td>{{index}}</td>
                <td>{{page.name}}</td>
                <td>
                  <nuxt-link :to="{name: 'admin-design-page' , params: {page: page.id}}">
                    <button class="btn btn-sm btn-outline-primary">SETTING</button>
                  </nuxt-link>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="showAlert(page.id , page.name , index)"
                    v-if="page.id > 4"
                  >DELETE</button>
                  <!-- <button
                    class="btn btn-sm btn-success"
                    @click="changeType(page.id , index)"
                    v-if="page.id > 2 && page.type === 0"
                  >ADVANCED MODE</button>
                  <button
                    class="btn btn-sm btn-info"
                    @click="changeType(page.id , index)"
                    v-if="page.id > 2 && page.type === 1"
                  >SIMPLE MODE</button>-->
                  <nuxt-link :to="{name: 'page' , params: {page : page.id}}" v-if="page.id > 4">
                    <button class="btn btn-sm btn-dark">Go to page</button>
                  </nuxt-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <b-modal ref="addPageModal" id="addPageModal" hide-footer title="Adding New Page">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" class="form-control" v-model="name" />
      </div>
      <b-button class="mt-3" variant="outline-primary" block @click="addPage">Add Page</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "designIndex",
  layout: "adminPanel",
  data() {
    return {
      pages: [],
      error: "",
      name: ""
    };
  },
  created() {
    this.$store.commit("setAdminTitle", "Pages");
    this.$axios
      .$get("/api/pages")
      .then(data => {
        this.pages = data.pages;
      })
      .catch(err => {
        console.log(err);
        this.error =
          "something went wrong trying to get data from the database";
      });
  },
  methods: {
    addPage() {
      this.$axios
        .post("/api/pages", {
          name: this.name
        })
        .then(data => {
          this.pages.push(data.data.page);
          this.$store.commit("addPage", data.data.page);
          this.name = "";
          console.log(data);
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to save new page to the database";
        });
      this.$refs.addPageModal.hide();
    },
    showAlert(pageId, pageName, index) {
      this.$swal
        .fire({
          title: "deleting " + pageName + " page",
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
              .post("/api/page/delete", {
                pageId: pageId
              })
              .then(data => {
                this.pages.splice(index, 1);
              })
              .catch(err => {
                console.log(err);
                this.error =
                  "something went wrong trying to delete page from the database";
              });
          }
        });
    },
    changeType(pageId, index) {
      this.$axios
        .post("/api/page/type", {
          pageId: pageId
        })
        .then(data => {
          this.pages[index].type = data.data.page.type;
        })
        .catch(err => {
          this.error = "something went wrong trying to change page design type";
        });
    }
  }
};
</script>

<style scoped></style>
