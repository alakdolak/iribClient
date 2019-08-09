<template>
  <div>
    <b-modal id="addRowModal" ref="addRowModal" size="lg" hide-footer title="Add a new row">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <label for="select_type">Type</label>
            <select id="select_type" v-model="selected" class="form-control">
              <option value="0">Row</option>
              <option value="1">Vertical</option>
            </select>
          </div>
        </div>
      </div>
      <div v-if="selected == 0">
        <row-modal v-on:rowsAdded="rowsAdded" :page="page" v-if="page"></row-modal>
        <row-modal v-on:rowsAdded="rowsAdded" v-else></row-modal>
      </div>
      <div v-else>
        <sticky-modal v-on:rowsAdded="rowsAdded" :page="page" v-if="page"></sticky-modal>
        <sticky-modal v-on:rowsAdded="rowsAdded" v-else></sticky-modal>
      </div>
    </b-modal>
  </div>
</template>


<script>
  import rowModal from './rowModal'
  import stickyModal from './stickyModal'

  export default {
    name: 'modal',
    components: {
      rowModal,
      stickyModal
    },
    props: ['page'],
    data() {
      return {
        selected: 0
      }
    },
    methods: {
      rowsAdded() {
        this.$refs.addRowModal.hide()
        this.$emit('rowsAdded')
      }
    }
  }
</script>

<style scoped>
  .form_container {
    padding: 20px;
  }
</style>
