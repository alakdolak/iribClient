<template>
  <div>
    <div v-if="error">
      <div class="alert alert-danger text-center">{{error}}</div>
    </div>
    <div class="row justify-content-center preview_container mt-4" v-else>
      <div class="col-sm-12">
        <b-btn v-b-modal.addRowModal class="btn btn-lg btn-dark mb-4">Add a new row</b-btn>
        <button
          class="btn btn-lg mb-4"
          :class="[!hideSticky ? 'btn-success' : 'btn-danger']"
          @click="toggleHideSticky()"
        >{{!hideSticky ? 'Vertical rows are shown':'Vertical rows are hidden'}}</button>
        <modal v-on:rowsAdded="rowsAdded" :page="page" v-if="page"></modal>
        <modal v-on:rowsAdded="rowsAdded" v-else></modal>
        <main-rows
          v-on:rowsAdded="rowsAdded"
          v-on:updateRow="updateRow"
          v-on:setColumnModule="setColumnModule"
          v-on:updateMainRowsColumnType="updateMainRowsColumnType"
          :page="page"
          v-if="page"
          :hideSticky="hideSticky"
          :mainRows="mainRows"
        ></main-rows>
        <main-rows
          v-on:rowsAdded="rowsAdded"
          v-on:updateRow="updateRow"
          v-on:setColumnModule="setColumnModule"
          v-on:updateMainRowsColumnType="updateMainRowsColumnType"
          v-else
          :hideSticky="hideSticky"
          :mainRows="mainRows"
        ></main-rows>
      </div>
    </div>
  </div>
</template>


<script>
import modal from "~/components/admin-panel/design/modal";
import mainRows from "~/components/admin-panel/design/mainRows";



export default {
  name: "mainDesign",
  layout: "adminPanel",
  props: ["page"],
  components: {
    modal,
    mainRows
  },
  data() {
    return {
      error: "",
      hideSticky: false,
      mainRows: []
    };
  },
  created() {
    if (!this.page) {
      this.$store.commit("setAdminTitle", "Design main page");
    } else {
      this.$store.commit("findPageName", this.page);
    }
    this.getRows();
    this.$root.$on("updateRows", this.getRows);
    this.$root.$on("updateRows", this.getRows);
  },
  methods: {
    toggleHideSticky() {
      this.hideSticky = !this.hideSticky;
    },
    getRows() {
      let pageId = this.page ? this.page : 1;
      this.$axios
        .post("/api/mainRows/page", { pageId: pageId })
        .then(data => {
          this.mainRows = data.data.mainRows;
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    rowsAdded() {
      this.getRows();
    },
    updateRow(data) {
      for (let i = 0; i < this.mainRows.length; i++) {
        if (this.mainRows[i].id === data.mainRow.id) {
          if (data.mainRow.type === 0) {
            this.mainRows[i].fluid = data.mainRow.fluid;
            this.mainRows[i].title = data.mainRow.title;
            this.mainRows[i].order = data.mainRow.order;
          } else {
            this.mainRows[i].height = data.mainRow.height;
            this.mainRows[i].title = data.mainRow.title;
            this.mainRows[i].width = data.mainRow.width;
            this.mainRows[i].top = data.mainRow.top;
            this.mainRows[i].right = data.mainRow.right;
          }
        }
      }
    },
    setColumnModule(data) {
      let row_id = data.row_id;
      let column_id = data.column_id;
      let columnModule = data.columnModule;
      for (let i = 0; i < this.mainRows.length; i++) {
        if (this.mainRows[i].id === row_id) {
          for (let j = 0; j < this.mainRows[i].row_columns.length; j++) {
            if (this.mainRows[i].row_columns[j].id === column_id) {
              this.mainRows[i].row_columns[j].column_modules.push(columnModule);
            }
          }
        }
      }
    },
    updateMainRowsColumnType(data) {
      let row_id = data.row_id;
      let column_id = data.column_id;
      let column_type = data.column_type;
      for (let i = 0; i < this.mainRows.length; i++) {
        if (this.mainRows[i].id === row_id) {
          for (let j = 0; j < this.mainRows[i].row_columns.length; j++) {
            if (this.mainRows[i].row_columns[j].id === column_id) {
              this.mainRows[i].row_columns[j].column_type = column_type;
            }
          }
        }
      }
    },
    changeColumnModuleTitle(data) {
      console.log("emit called");
      let show_title = data.show_title;
      let row_id = data.row_id;
      let column_id = data.column_id;
      let column_module_id = data.column_module_id;
      for (let i = 0; i < this.mainRows.id; i++) {
        if (this.mainRows[i].id === row_id) {
          console.log("foune main row");
          for (let j = 0; j < this.mainRows[i].row_columns.length; j++) {
            console.log("searching for row_columns");
            if (this.mainRows[i].row_columns[j].id === column_id) {
              for (
                let k = 0;
                k < this.mainRows[i].row_columns[j].column_modules.length;
                k++
              ) {
                if (
                  this.mainRows[i].row_columns[j].column_modules[k].id ===
                  column_module_id
                ) {
                  this.mainRows[i].row_columns[j].column_modules[
                    k
                  ].show_title = show_title;
                }
              }
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.preview_container {
  margin: 0 auto;
  max-width: 1200px !important;
}
</style>

