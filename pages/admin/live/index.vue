<template>
  <div>
    <div v-if="error" class="alert alert-danger text-center">{{error}}</div>
    <div v-else>
      <div class="row">
        <div class="col-sm-4 mt-4 mb-4">
          <b-button
            variant="outline-secondary"
            class="btn btn-block btn-outline-secondary btn-lg"
            v-b-modal.newLive
          >
            ADD
            NEW
          </b-button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-11 table-responsive">
          <table class="table table-hover table-striped text-center">
            <thead class="thead-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>
                  Url &
                  <br>Backup
                </th>
                <!-- <th>Backup</th> -->
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(live , index) in lives" :key="index">
                <td>{{index + 1}}</td>
                <td>{{live.name}}</td>
                <td>
                  {{live.url}}
                  <br>
                  {{live.backup}}
                </td>
                <td>
                  <button class="btn btn-sm btn-info" @click="showEditModal(live)">Edit</button>
                  <button class="btn btn-sm btn-danger" @click="deleteLive(live.id , index)">Delete</button>
                  <button class="btn btn-sm btn-primary" @click="preview(live.id , index)">preview</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row justify-content-center mt-4 mb-4" v-show="previewLive">
        <div class="col-sm-10">
          <div class="container">
            <h4 v-if="previewLive" class="text-primary">Previewing {{previewLive.name}}</h4>
            <h4 v-else class="text-danger">Select from list above to preview</h4>
            <vue-plyr ref="plyr">
              <video playsinline controls></video>
            </vue-plyr>
          </div>
        </div>
      </div>
    </div>

    <!-- adding new live -->
    <b-modal id="newLive" title="Add New Live Feed" ref="newLive" hide-footer>
      <div class="alert alert-danger text-center" v-if="modalError">{{modalError}}</div>
      <div class="form-group mt-2">
        <label for>name:</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="form-group">
        <label for>url:</label>
        <input type="text" class="form-control" v-model="url">
      </div>
      <div class="form-group">
        <label for>backup:</label>
        <input type="text" class="form-control" v-model="backup">
      </div>
      <div class="from-group">
        <button class="btn btn-block btn-outline-primary" @click="addLive">ADD</button>
      </div>
    </b-modal>

    <!-- editing live -->
    <b-modal id="editLive" title="Edit" ref="editLive" hide-footer>
      <div class="form-group">
        <h5 class="text-secondary">you are editing {{editName}}</h5>
      </div>
      <div class="form-group">
        <label for>url:</label>
        <input type="text" class="form-control" v-model="editUrl">
      </div>
      <div class="form-group">
        <label for>backup:</label>
        <input type="text" class="form-control" v-model="editBackup">
      </div>
      <div class="from-group mt-3">
        <button class="btn btn-block btn-warning" @click="updateLive">Edit</button>
      </div>
    </b-modal>
  </div>
</template>


<script>
export default {
  name: "livePage",
  layout: "adminPanel",
  data() {
    return {
      error: "",
      lives: [],
      name: "",
      url: "",
      backup: "",
      editId: null,
      editUrl: "",
      editName: "",
      editBackup: "",
      previewLive: null,
      modalError: "",
      nameStatus: true
    };
  },
  computed: {
    player() {
      return this.$refs.plyr.player;
    }
  },
  mounted() {
    // console.log(this.player)
  },
  created() {
    this.$store.commit("setAdminTitle", "Live Feeds");
    this.getLinks();
  },
  methods: {
    getLinks() {
      this.$axios
        .$get("api/lives")
        .then(data => {
          this.lives = data.lives;
          this.error = "";
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    checkName() {
      let self = this;
      return new Promise(function(resolve, reject) {
        self.$axios
          .post("/api/lives/checkName", {
            name: self.name
          })
          .then(data => {
            self.nameStatus = data.data.status;
            resolve(data.data.status);
          })
          .catch(err => {
            self.nameStatus = false;
            resolve(false);
            console.log(err);
          });
      });
    },
    showEditModal(live) {
      this.editId = live.id;
      this.editUrl = live.url;
      this.editName = live.name;
      this.editBackup = live.backup;
      this.$refs.editLive.show();
    },
    updateLive() {
      this.$axios
        .post("/api/lives/update", {
          url: this.editUrl,
          backup: this.editBackup,
          id: this.editId
        })
        .then(data => {
          let live = data.data.live;
          for (let i = 0; i < this.lives.length; i++) {
            if (this.lives[i].id === live.id) {
              this.lives[i].url = live.url;
              this.lives[i].backup = live.backup;
            }
          }
          this.editId = null;
          this.editUrl = "";
          this.editName = "";
          this.$refs.editLive.hide();
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to edit data in the database";
        });
    },
    async addLive() {
      await this.checkName();
      if (!this.nameStatus) {
        this.modalError =
          "the name yo have entered is taken. please choose a new name";
        return;
      }
      this.$axios
        .post("api/lives", {
          name: this.name,
          url: this.url,
          backup: this.backup
        })
        .then(data => {
          this.nameStatus = true;
          this.lives.push(data.data.live);
          this.error = "";
          this.name = "";
          this.url = "";
          this.backup = "";
          this.modalError = "";
          this.$refs.newLive.hide();
        })
        .catch(err => {
          this.error = "something went wrong trying to add data to database";
        });
    },
    deleteLive(liveId, index) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$axios
            .post("api/lives/delete", {
              liveId: liveId
            })
            .then(data => {
              this.lives.splice(index, 1);
              this.error = "";
              if (this.previewLive && this.previewLive.id === liveId)
                this.previewLive = null;
              this.$swal("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(err => {
              console.log(err);
              this.error =
                "something went wrong trying to delete data from the database";
            });
        }
      });
    },
    preview(liveId, index) {
      this.previewLive = this.lives[index];
      const source = this.previewLive.url;
      let type = this.previewLive.url.substring(
        this.previewLive.url.lastIndexOf(".") + 1
      );
      const video = document.querySelector("video");
      if (type === "m3u8") {
        if (!Hls.isSupported()) {
          video.src = source;
        } else {
          const hls = new Hls();
          hls.loadSource(source);
          hls.attachMedia(video);
          window.hls = hls;
        }
      } else if (type === "mpd") {
        const dash = dashjs.MediaPlayer().create();
        dash.getDebug().setLogToBrowserConsole(false);
        dash.initialize(video, source, true);
        window.dash = dash;
      }
    }
  }
};
</script>
