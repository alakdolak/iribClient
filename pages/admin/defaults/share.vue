<template>
  <div>
    <div v-if="error" class="alert alert-danger text-center">{{error}}</div>
    <div v-else>
      <div class="row mt-2 mb-4">
        <div class="col-sm-4">
          <a href="https://fontawesome.com/v4.7.0/cheatsheet/" target="_blank">
            <button class="btn btn-block btn-outline-info btn-lg">LIST OF AVAILABLE ICONS</button>
          </a>
        </div>
      </div>
      <div class="row justify-content-center mb-4 pb-4">
        <div class="col-sm-11">
          <div class="table-responsive">
            <table class="table table-hover table-striped text-center">
              <thead class="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Enable?</th>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Icon</th>
                  <th>Show title ?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(share , index) in shares">
                  <td>{{index + 1}}</td>
                  <!--enabled-->
                  <td v-if="editRow !== index">{{translateEnable(share.enabled)}}</td>
                  <td v-else>
                    <toggle-button
                      :value="shares[index].enabled"
                      v-model="shares[index].enabled"
                      :width="85"
                      :height="35"
                      @change="updateShare(index)"
                      :sync="true"
                      :labels="{checked: 'Enabled', unchecked: 'Disabled'}"
                    />
                  </td>

                  <td>{{share.name}}</td>
                  <!--title -->
                  <td v-if="editRow !== index">{{share.title}}</td>
                  <td v-else>
                    <input
                      type="text"
                      class="form-control"
                      v-model="shares[index].title"
                      @change="updateShare(index)"
                    >
                  </td>

                  <!--icon-->
                  <td v-if="editRow !== index">
                    {{share.icon}} &nbsp;
                    (
                    <i
                      :class="'fa' + ' ' + share.icon"
                      aria-hidden="true"
                    ></i>)
                  </td>
                  <td v-else>
                    <input
                      type="text"
                      class="form-control"
                      v-model="shares[index].icon"
                      @change="updateShare(index)"
                    >
                  </td>

                  <!--show title-->
                  <td v-if="editRow !== index">{{translateTitle(share.showTitle)}}</td>
                  <td v-else>
                    <toggle-button
                      :value="shares[index].showTitle"
                      v-model="shares[index].showTitle"
                      :width="70"
                      :height="35"
                      :sync="true"
                      @change="updateShare(index)"
                      :labels="{checked: 'Show', unchecked: 'Hide'}"
                    />
                  </td>
                  <td>
                    <button class="btn btn-sm btn-info" @click="changeEditRow(index)">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sharePage",
  layout: "adminPanel",
  data() {
    return {
      error: "",
      shares: [],
      editRow: -1
    };
  },
  created() {
    this.$store.commit("setAdminTitle", "Share");
    this.getShares();
  },
  methods: {
    getShares() {
      this.$axios
        .$get("/api/shares")
        .then(data => {
          this.shares = data.shares;
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    translateEnable(status) {
      return status ? "Enabled" : "Disabled";
    },
    translateTitle(status) {
      return status ? "Show" : "Hide";
    },
    changeEditRow(index) {
      if (index === this.editRow) this.editRow = -1;
      else this.editRow = index;
    },
    updateShare(index) {
      this.$axios
        .post("/api/shares/update", {
          title: this.shares[index].title,
          id: this.shares[index].id,
          enabled: this.shares[index].enabled,
          showTitle: this.shares[index].showTitle,
          icon: this.shares[index].icon
        })
        .then(data => [(this.shares[index] = data.data.share)])
        .catch(err => {
          this.error = "something went wrong trying to update data";
        });
    }
  }
};
</script>
