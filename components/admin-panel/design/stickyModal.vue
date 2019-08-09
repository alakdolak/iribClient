<template>
  <div class="form_container">
    <div class="form-group row">
      <div class="col-sm-12">
        <label for="">Title: </label>
        <input type="text" v-model="title" class="form-control" placeholder="Enter Title">
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-6">
        <label>Width:</label>
        <input type="number" v-model="width" class="form-control">
      </div>
      <div class="col-sm-6">
        <label>Height: </label>
        <input type="number" v-model="height" class="form-control">
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-6">
        <label>Position from top:</label>
        <input type="number" v-model="top" class="form-control">
      </div>
      <div class="col-sm-6">
        <label>Position from right: </label>
        <input type="number" v-model="right" class="form-control">
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-block btn-outline-secondary" @click="addRow">Add Sticky</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'stickyModal',
    props: ['page'],
    data() {
      return {
        title: '',
        width: 300,
        height: 400,
        right: 0,
        top: 100
      }
    },
    methods: {
      addRow() {
        let pageId = (this.page) ? this.page : 1;
        this.$axios.post('api/mainRows', {
          pageId: pageId,
          size: 12,
          title: this.title,
          type: 1,
          height: this.height,
          width: this.width,
          top: this.top,
          right: this.right
        }).then(data => {
          this.$emit('rowsAdded')
        }).catch(err => {
          console.log(err)
          this.error = 'something went wrong tyring to add a new row to the database'
        })
      }
    }
  }
</script>

<style scoped>
  .form_container {
    /*padding: 20px;*/
  }
</style>
