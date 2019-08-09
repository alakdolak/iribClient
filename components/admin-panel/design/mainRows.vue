<template>
  <div>
    <!------------------------------------------------------------------------------------------------------------------------------>
    <!------------------------------------------------------------------------------------------------------------------------------>
    <!--vertical rows-->
    <!--rows type 1 from here-->
    <!-- sticky rows -->
    <!------------------------------------------------------------------------------------------------------------------------------>
    <!------------------------------------------------------------------------------------------------------------------------------>
    <div v-for="(row , index) in mainRows" :key="row.id">
      <div
        class="border border-secondary bg-light-gradient"
        :style="sticky_styles(row.height , row.width , row.top , row.right)"
        v-if="row.type === 1"
        v-show="!hideSticky"
      >
        <div class="row p-3">
          <div class="col-sm-12 row_header mb-3">
            <h3 class="float-left text-primary">{{row.title}}</h3>

            <button
              class="btn float-right btn-info"
              @click="changeVerticalSettingRow(row ,index)"
            >Toggle Setting</button>
          </div>
        </div>
        <div class="row p-2 justify-content-center" v-if="verticalSettingRow !== index">
          <div v-for="column in row.row_columns" :key="column.id" class="col-sm-11">
            <b-btn
              v-b-modal.add_module
              class="btn btn-block btn-dark btn-lg mt-1"
              v-if="column.size !== 1 && column.size !== 2"
              @click="selectColumn(column.id , row.id)"
            >Add Module here</b-btn>
            <column-modules
              :column="column"
              :row="row"
              v-if="column.column_modules.length"
              class="row"
            ></column-modules>
          </div>
        </div>
        <!--vertical setting row-->
        <div v-else class="p-3">
          <div class="form-group">
            <label>Title:</label>
            <input type="text" v-model="title" class="form-control" />
          </div>
          <div class="form-group">
            <label>Width:</label>
            <input type="number" v-model="width" class="form-control" />
          </div>
          <div class="form-group">
            <label>Height:</label>
            <input type="number" v-model="height" class="form-control" />
          </div>
          <div class="form-group">
            <label>Top:</label>
            <input type="number" v-model="top" class="form-control" />
          </div>
          <div class="form-group">
            <label>Right:</label>
            <input type="number" v-model="right" class="form-control" />
          </div>

          <div class="form-group">
            <label>Background Color:</label>
            <input type="text" v-model="backgroundColor" class="form-control" />
          </div>
          <div class="form-group">
            <label>Header Background Color:</label>
            <input type="text" v-model="headerBackgroundColor" class="form-control" />
          </div>
          <div class="form-group">
            <label>Color:</label>
            <input type="text" v-model="color" class="form-control" />
          </div>

          <div class="form-group">
            <button
              class="btn float-left btn-primary btn-block"
              @click="updateVertical(row.id)"
            >Update Vertical</button>
            <button
              class="btn float-left btn-danger btn-block"
              @click="deleteRow(row.id)"
            >Delete Vertical</button>
          </div>
        </div>
      </div>
    </div>

    <!------------------------------------------------------------------------------------------------------------------------------>
    <!------------------------------------------------------------------------------------------------------------------------------>
    <!--draggable-->
    <!--rows type 0 from here-->
    <!------------------------------------------------------------------------------------------------------------------------------>
    <!------------------------------------------------------------------------------------------------------------------------------>
    <draggable :list="mainRows" @update="onUpdate">
      <div
        class="border border-secondary bg-light-gradient"
        v-for="(row , index) in mainRows"
        v-if="row.type === 0"
        :class="[row.fluid ? 'big_row_container' : 'row_container']"
        :key="row.id"
      >
        <div class="row">
          <div class="col-sm-12 row_header mb-3">
            <h3 class="float-left text-primary">{{row.title}}</h3>
            <div class="float-right">
              <button class="btn btn-sm btn-info" @click="moveUp(row.id)">Move Up</button>
              <button class="btn btn-sm btn-info" @click="moveDown(row.id)">Move Down</button>
              <button class="btn btn-sm btn-info" @click="toggleSetting(index)">TOGGLE SETTING</button>
            </div>
          </div>
        </div>
        <div class="row" v-if=" settingRow !== index">
          <div v-for="column in row.row_columns" :key="column.id" :class="column_size(column.size)">
            <b-btn
              v-b-modal.add_module
              class="btn btn-block btn-dark btn-lg mt-1"
              v-if="column.size !== 1 && column.size !== 2"
              @click="selectColumn(column.id , row.id)"
            >Add Module here</b-btn>
            <column-modules
              :column="column"
              :row="row"
              v-if="column.column_modules.length"
              class="row"
            ></column-modules>
          </div>
        </div>
        <!--setting panel here-->
        <div class="row justify-content-center" style="margin-top: -20px" v-else>
          <div class="col-sm-8">
            <div class="form-group">
              <h3 class="text-center text-info">SETTING</h3>
            </div>
            <div class="form-group">
              <label>Title</label>
              <input type="text" v-model="row.title" class="form-control" @change="updateTitle" />
            </div>
            <div class="form-group">
              <label>Width</label>
              <select v-model="settingWidth" class="form-control" @change="updateFluid">
                <option :value="false">Normal</option>
                <option :value="true">FullScreen</option>
              </select>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-sm-12">
                  <label>Column types:</label>
                </div>
                <div
                  v-for="column in row.row_columns"
                  :key="column.id"
                  :class="column_size(column.size)"
                >
                  <select
                    v-model="column.column_type"
                    class="form-control"
                    @change="update_column_type(row.id ,column.id)"
                  >
                    <option
                      v-for="option in columnTypeOptions"
                      :key="option.id"
                      :value="option.value"
                    >{{option.text}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-sm-4">
                  <label for class="label">background color:</label>
                  <input type="text" class="form-control" v-model="row.backgroundColor" />
                  <verte
                    v-model="row.backgroundColor"
                    display="widget"
                    picker="square"
                    :enableAlpha="false"
                    :recentColors="false"
                    model="hex"
                    :rgbSliders="true"
                  ></verte>
                </div>
                <div class="col-sm-4">
                  <label for class="label">Header background color:</label>
                  <input type="text" class="form-control" v-model="row.headerBackgroundColor" />
                  <verte
                    v-model="row.headerBackgroundColor"
                    display="widget"
                    picker="square"
                    :enableAlpha="false"
                    :recentColors="false"
                    model="hex"
                    :rgbSliders="true"
                  ></verte>
                </div>
                <div class="col-sm-4">
                  <label for class="label">color:</label>
                  <input type="text" class="form-control" v-model="row.color" />
                  <verte
                    v-model="row.color"
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
            <div class="form-group mt-4">
              <button class="btn btn-block btn-primary" @click="updateRow()">Update row</button>
              <button class="btn btn-block btn-danger" @click="deleteRow(row.id)">Delete row</button>
            </div>
          </div>
        </div>
      </div>
    </draggable>

    <!--model for adding module-->
    <b-modal id="add_module" ref="add_module" hide-footer title="Add Module">
      <div class="form-group">
        <select class="form-control" v-model="selectedModule">
          <option value="0" disabled>choose a module ...</option>
          <option :value="1" v-if="this.page === 3 ">Tags Data</option>
          <option :value="2" v-if="this.page === 4 ">Sub Categories Data</option>
          <option :value="-4">Redirect</option>
          <option :value="-2">Live Feeds</option>
          <option
            v-for="module in modules"
            :key="module.id"
            v-if="module.type === 0"
            :value="module.id"
          >{{module.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <!-- <label v-if="selectedModule === -3">Type :</label> -->
        <label v-if="selectedModule === -4">which redirect :</label>
        <label v-if="selectedModule === -2">which live :</label>
        <select class="form-control" v-model="selectedRedirect" v-if="selectedModule === -4">
          <option
            :value="redirect.id"
            v-for="redirect in redirects"
            :key="redirect.id"
          >{{redirect.name}}</option>
        </select>
        <select class="form-control" v-model="selectedLive" v-else-if="selectedModule === -2">
          <option :value="live.id" v-for="live in lives" :key="live.id">{{live.name}}</option>
        </select>
        <!-- <select class="form-control" v-model="weatherType" v-if="selectedModule === -3">
          <option :value="1">Simple</option>
          <option :value="0">Detailed</option>
        </select>-->
        <select class="form-control" v-model="selectedType" v-else>
          <option value="0">Simple list</option>
          <option value="1">List with images</option>
          <option value="2">Grid</option>
          <option value="3">Swiper</option>
          <option value="4">One Image</option>
          <option value="5">Horizontal list</option>
        </select>
      </div>
      <div class="form-group">
        <button
          class="btn btn-block btn-outline-dark"
          @click="setRedirect"
          v-if="selectedModule === -4"
        >Add Module</button>
        <button
          class="btn btn-block btn-outline-dark"
          @click="setLive"
          v-else-if="selectedModule === -2"
        >Add Module</button>
        <button
          class="btn btn-block btn-outline-dark"
          @click="setWeather"
          v-else-if="selectedModule === -3"
        >Add Module</button>
        <button class="btn btn-block btn-outline-dark" @click="setModule" v-else>Add Module</button>
      </div>
    </b-modal>
  </div>
</template>


<script>
import draggable from "vuedraggable";
import columnModules from "~/components/admin-panel/design/columnModules";
import lodash from "lodash";
import verte from "verte";

export default {
  name: "mainRow",
  props: ["hideSticky", "page", "mainRows"],

  components: {
    draggable,
    columnModules,
    verte
  },
  data() {
    return {
      banners: [],
      lives: [],
      redirects: [],
      weatherType: -1,
      selectedBanner: 0,
      selectedRedirect: 0,
      selectedLive: 0,
      selectedColumn: 0,
      selectedModule: 0,
      selectedRow: 0,
      selectedType: 0,
      settingRow: -1,
      verticalSettingRow: -1,
      settingWidth: false,
      error: "",

      // vertical row updates
      title: "",
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      backgroundColor: "#ffffff",
      color: "#ffffff",
      headerBackgroundColor: "#004890",

      //end of vertical row updates
      columnTypeOptions: [
        { text: "Full width", value: 0 },
        { text: "Half Width", value: 1 },
        { text: "Grid 2", value: 2 },
        { text: "Grid 3", value: 3 },
        { text: "Grid 5", value: 4 },
        { text: "Grid 7", value: 5 }
      ]
    };
  },
  created() {
    // this.getBanners();
    this.getLives();
    this.getRedirects();
  },
  computed: {
    modules() {
      return this.$store.state.modules;
    }
  },

  methods: {
    getRedirects() {
      this.$axios
        .$get("/api/redirects")
        .then(data => {
          this.redirects = data.redirects;
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    getLives() {
      this.$axios
        .$get("/api/lives")
        .then(data => {
          this.lives = data.lives;
        })
        .catch(err => {
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    setWeather() {
      if (this.weatherType === -1) return;
      this.$axios
        .post("/api/mainRows/setModule", {
          column_id: this.selectedColumn,
          module_id: 1,
          defaultId: this.weatherType,
          module_type: this.selectedType,
          default: true,
          defaultType: 4
        })
        .then(data => {
          this.$refs.add_module.hide();
          this.$emit("setColumnModule", {
            column_id: this.selectedColumn,
            row_id: this.selectedRow,
            columnModule: data.data.columnModule
          });
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to add module to the column";
        });
    },
    setRedirect() {
      if (this.selectedRedirect === 0) return;
      this.$axios
        .post("/api/mainRows/setModule", {
          column_id: this.selectedColumn,
          module_id: 1,
          defaultId: this.selectedRedirect,
          module_type: this.selectedType,
          default: true,
          defaultType: 2
        })
        .then(data => {
          this.$refs.add_module.hide();
          this.$emit("setColumnModule", {
            column_id: this.selectedColumn,
            row_id: this.selectedRow,
            columnModule: data.data.columnModule
          });
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to add module to the column";
        });
    },
    setLive() {
      if (this.selectedLive === 0) return;
      this.$axios
        .post("/api/mainRows/setModule", {
          column_id: this.selectedColumn,
          module_id: 1,
          defaultId: this.selectedLive,
          module_type: this.selectedType,
          default: true,
          defaultType: 3
        })
        .then(data => {
          this.$refs.add_module.hide();
          this.$emit("setColumnModule", {
            column_id: this.selectedColumn,
            row_id: this.selectedRow,
            columnModule: data.data.columnModule
          });
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to add module to the column";
        });
    },
    setModule() {
      if (this.selectedModule === 0) return;
      this.$axios
        .post("/api/mainRows/setModule", {
          column_id: this.selectedColumn,
          module_id: this.selectedModule,
          module_type: this.selectedType,
          defaultId: 0,
          default: false,
          defaultType: 1
        })
        .then(data => {
          this.$refs.add_module.hide();
          this.$emit("setColumnModule", {
            column_id: this.selectedColumn,
            row_id: this.selectedRow,
            columnModule: data.data.columnModule
          });
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to add module to the column";
        });
    },
    changeVerticalSettingRow(row, index) {
      if (index === this.verticalSettingRow) this.verticalSettingRow = -1;
      else {
        this.verticalSettingRow = index;
        this.title = row.title;
        this.width = row.width;
        this.height = row.height;
        this.top = row.top;
        this.right = row.right;
        this.backgroundColor = row.backgroundColor;
        this.color = row.color;
        this.headerBackgroundColor = row.headerBackgroundColor;
      }
    },
    update_column_type(row_id, column_id) {
      let row_index = lodash.findIndex(this.mainRows, { id: row_id });
      let column_index = lodash.findIndex(
        this.mainRows[row_index].row_columns,
        { id: column_id }
      );
      let column_type = this.mainRows[row_index].row_columns[column_index]
        .column_type;
      this.$axios
        .post("/api/mainRows/updateColumnType", {
          column_id: column_id,
          column_type: column_type
        })
        .then(data => {
          this.$emit("updateMainRowsColumnType", {
            row_id: row_id,
            column_id: column_id,
            column_type: column_type
          });
        })
        .catch(err => {
          console.log(err);
          this.error = "something went wrong trying to update column type";
        });
    },

    updateTitle() {
      this.$axios
        .post("/api/mainRows/updateTitle", {
          id: this.mainRows[this.settingRow].id,
          title: this.mainRows[this.settingRow].title
        })
        .then(data => {
          this.$emit("updateRow", { mainRow: data.data.mainRow });
        });
    },
    updateVertical(row_id) {
      this.$axios
        .post("/api/mainRows/updateVertical", {
          row_id: row_id,
          title: this.title,
          height: this.height,
          width: this.width,
          right: this.right,
          top: this.top,
          backgroundColor: this.backgroundColor,
          color: this.color,
          headerBackgroundColor: this.headerBackgroundColor
        })
        .then(data => {
          this.verticalSettingRow = -1;
          this.$emit("updateRow", { mainRow: data.data.row });
        })
        .catch(err => {
          this.error =
            "something went wrong trying to update setting in the database";
        });
    },
    updateRow() {
      this.$axios
        .post("/api/mainRows/updateRow", {
          id: this.mainRows[this.settingRow].id,
          title: this.mainRows[this.settingRow].title,
          color: this.mainRows[this.settingRow].color,
          backgroundColor: this.mainRows[this.settingRow].backgroundColor,
          headerBackgroundColor: this.mainRows[this.settingRow]
            .headerBackgroundColor
        })
        .then(data => {
          this.settingRow = -1;
          this.$emit("updateRow", { mainRow: data.data.mainRow });
        })
        .catch(err => {
          console.log(err);
          this.error = "something went wront trying to update row";
        });
    },
    updateFluid() {
      this.$axios
        .post("/api/mainRows/updateFluid", {
          id: this.mainRows[this.settingRow].id,
          fluid: this.settingWidth
        })
        .then(data => {
          this.$emit("updateRow", { mainRow: data.data.mainRow });
        });
    },
    selectColumn(id, row_id) {
      this.selectedColumn = id;
      this.selectedRow = row_id;
    },
    toggleSetting(index) {
      if (index === this.settingRow) this.settingRow = -1;
      else {
        this.settingRow = index;
        this.settingWidth = this.mainRows[index].fluid;
      }
    },
    deleteRow(row_id) {
      this.$axios
        .$get("/api/mainRows/delete?row_id=" + row_id)
        .then(data => {
          this.$emit("rowsAdded");
          this.settingRow = -1;
        })
        .catch(err => {
          console.log(err);
          this.$emit("rowsAdded");
        });
    },
    moveUp(id) {
      this.$axios
        .post("/api/mainRows/moveUp", { id: id })
        .then(data => {
          console.log(data.data);
          this.error = "";
          this.$emit("rowsAdded");
        })
        .catch(err => {
          console.log(err);
          this.error = "something went wrong trying to update data";
        });
    },
    moveDown(id) {
      console.log("move down clicked");
      this.$axios
        .post("/api/mainRows/moveDown", { id: id })
        .then(data => {
          this.error = "";
          this.$emit("rowsAdded");
        })
        .catch(err => {
          console.log(err);
          this.error = "something went wrong trying to update data";
        });
    },
    onUpdate() {
      let index;
      for (index = 0; index < this.mainRows.length; index++) {
        this.$axios
          .post("/api/mainRows/order", {
            id: this.mainRows[index].id,
            order: index + 1
          })
          .then(result => {
            if (index === this.mainRows.length - 1) {
              this.$emit("rowsAdded");
              this.settingRow = -1;
            }
          })
          .catch(err => {
            this.error = "something went wrong trying to reorder the modules";
          });
      }
    },

    column_size(size) {
      return {
        "col-sm-12": size === 12,
        "col-sm-11": size === 11,
        "col-sm-10": size === 10,
        "col-sm-9": size === 9,
        "col-sm-8": size === 8,
        "col-sm-7": size === 7,
        "col-sm-6": size === 6,
        "col-sm-5": size === 5,
        "col-sm-4": size === 4,
        "col-sm-3": size === 3,
        "col-sm-2": size === 2,
        "col-sm-1": size === 1
      };
    },
    sticky_styles: function(height, width, top, right) {
      return {
        position: "absolute",
        "z-index": "10",
        "background-color": "red",
        // 'overflow-y': 'scroll',
        width: width + "px",
        "min-height": height + "px",
        top: top + "px",
        right: right + "px"
      };
    }
  }
};
</script>

<style scoped>
.row_container {
  width: 100%;
  min-height: 300px;
  margin-bottom: 30px;
  padding: 10px 30px 30px;
}

.big_row_container {
  width: 110%;
  min-height: 300px;
  margin-bottom: 30px;
  margin-left: -5%;
  padding: 10px 30px 30px;
}

.show_title {
  padding-left: 15px;
  font-size: 1.4em;
  font-weight: bold;
}

.row_header {
  height: 40px !important;
  line-height: 40px;
}
</style>
