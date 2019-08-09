<template>
  <div>
    <div v-if="error" class="alert alert-danger">{{error}}</div>
    <div class="row">
      <div class="col-sm-4">
        <b-btn
          variant="outline-secondary"
          v-b-modal.modal1
          class="btn btn-outline-secondary btn-block btn-lg"
        >Add Module</b-btn>
      </div>
    </div>
    <div class="row justify-content-center mt-4">
      <div class="col-sm-11 table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr class="text-center">
              <th>#</th>
              <th>Module Name</th>
              <th>Automatic ?</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(module , index) in modules" class="text-center" :key="index">
              <td>{{index}}</td>
              <td>{{module.name}}</td>
              <td>{{module.automatic? 'yes' : 'no'}}</td>
              <td>
                <timestamp :time="module.created_at"></timestamp>
              </td>
              <td>
                <nuxt-link
                  class="btn btn-outline-secondary btn-sm"
                  :to="{name: 'admin-modules-id', params: { id:module.id } }"
                >Go to Module</nuxt-link>
                <div
                  class="btn btn-sm btn-outline-danger"
                  @click="showAlert(module.id , module.name , index)"
                >Delete</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal id="modal1" title="Add Module" hide-footer>
      <div class="form-group">
        <label for>Module Name:</label>
        <input type="text" v-model="name" class="form-control" placeholder="enter module name here" />
      </div>
      <div class="form-group">
        <button class="btn btn-outline-primary btn-block" @click="addModule">Add Module</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import lodash from "lodash";
import timestamp from "~/components/shared/timestamp";

export default {
  layout: "adminPanel",
  components: { timestamp },
  data() {
    return {
      name: "",
      error: ""
    };
  },
  created() {
    this.$store.commit("setAdminTitle", "Modules");
  },
  methods: {
    addModule() {
      this.$axios
        .post("/api/modules/add", {
          name: this.name
        })
        .then(module => {
          this.$store.commit("addModule", module.data.module);
          this.name = "";
          this.error = "";
        })
        .catch(err => {
          this.error = "something went wrong add new module";
        });
    },
    showAlert(moduleId, modueName, index) {
      this.$swal
        .fire({
          title: "deleting " + modueName + " page",
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
              .post("/api/modules/delete", {
                moduleId: moduleId
              })
              .then(data => {
                this.modules.splice(index, 1);
                this.$store.commit("deleteModule", moduleId);
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
    }
  },
  computed: {
    modules() {
      return lodash.filter(this.$store.state.modules, function(item) {
        return item.id != 1 && item.type === 0;
      });
    }
  }
};
</script>

<style scoped>
</style>
