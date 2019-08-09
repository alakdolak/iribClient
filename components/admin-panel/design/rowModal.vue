<template>
  <div class="form_container">
    <div class="form-group">
      <label for>Row title :</label>
      <input type="text" class="form-control" v-model="title">
    </div>
    <div class="form-group">
      <label for>Number of columns :</label>
      <input
        type="number"
        min="1"
        max="4"
        class="form-control"
        v-model.number="columnNumber"
        @change="check_error"
      >
    </div>
    <div class="row justify-content-center form-group">
      <div class="col-sm-12">
        <div class="description text-muted">
          columns are used to separate each row into different spaces with different sizes so you can add multiple
          modules to the same row.
          <br>sizes are weights out of total weight of 12. when you choose size 12 it means to fill the whole row
          or 6 means half of the size of row and so on .
          <br>
          <i class="fa fa-exclamation-triangle" aria-hidden="true" style="color: red"></i> sum of column sizes should be
          12 !!
        </div>
      </div>
      <div class="col-sm-12 mt-2" v-if="error">
        <div class="alert alert-danger text-center">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> sum of column sizes should be 12 !!
        </div>
      </div>
      <div class="col mt-4" v-for="i in columnNumber">
        <label for>Size of column {{i}}</label>
        <select class="form-control" v-model.number="size[i - 1]" @change="check_error">
          <option v-for="number in 12" :value="number ">{{number}}</option>
        </select>
      </div>
      <div class="clearfix"></div>
      <div class="col-sm-12 mt-5 form-group">
        <button class="btn btn-outline-secondary btn-block" @click="addRow">Add Row</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "rowModal",
  props: ["page"],
  data() {
    return {
      size: [12, 12, 12, 12],
      columnNumber: 1,
      error: false,
      maxOrder: 0,
      title: ""
    };
  },
  created() {
    this.$axios
      .$get("/api/mainRows/max")
      .then(data => {
        this.maxOrder = data.max;
      })
      .catch(err => {
        this.error =
          "something went wrong trying to get data from the database";
      });
  },
  methods: {
    check_error() {
      if (this.columnNumber > 4) this.columnNumber = 4;
      if (this.columnNumber < 1) this.columnNumber = 1;
      let sum = 0;
      for (let i = 0; i < this.columnNumber; i++) sum += this.size[i];
      this.error = sum !== 12;
    },
    addRow() {
      if (this.error) return;
      let pageId = this.page ? this.page : 1;
      this.$axios
        .post("api/mainRows", {
          pageId: pageId,
          size: this.size,
          columnNumber: this.columnNumber,
          order: this.maxOrder + 1,
          title: this.title,
          type: 0
        })
        .then(data => {
          this.maxOrder++;
          // this.$refs.addRowModal.hide()
          this.$emit("rowsAdded");
        })
        .catch(err => {
          console.log(err);
          this.error =
            "something went wrong tyring to add a new row to the database";
        });
    }
  }
};
</script>

<style scoped>
.form_container {
  padding: 20px;
}
</style>
