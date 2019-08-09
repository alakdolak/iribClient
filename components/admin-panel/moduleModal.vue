<template>
  <div>
    <div v-if="error">
      <div class="alert alert-danger btn-lg text-center my-2">{{error}}</div>
    </div>
    <div class="sidebar" v-else-if="type == 'sidebar'">
      <b-btn variant="outline-secondary" v-b-modal.sidebar_module_model class="btn btn-block btn-lg btn-outline-secondary my-4">Add
        Module to sidebar
      </b-btn>
      <b-modal ref="sidebar_module_model" id="sidebar_module_model" hide-footer title="Add Module to Sidebar"
               v-if="type == 'sidebar'">
        <div class="form-group">
          <select class="form-control" v-model="sidebarSelectedModuleId">
            <option value="0" disabled>Choose a module ...</option>
            <option v-for="module in modules" :value="module.id" v-if="module.type === 0">{{module.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <button class="btn btn-block btn-outline-secondary" @click="add_sidebar_module">Add Module
          </button>
        </div>
      </b-modal>
    </div>

    <div class="main" v-else-if="type == 'main'">
      <b-btn variant="outline-secondary" v-b-modal.main_module_model class="btn btn-block btn-lg btn-outline-secondary my-4">Add
        Module to main
      </b-btn>
      <b-modal ref="main_module_model" id="main_module_model" hide-footer title="Add Module to Main "
               v-if="type == 'main'">
        <div class="form-group">
          <select class="form-control" v-model="mainSelectedModuleId">
            <option value="0" disabled>Choose a module ...</option>
            <option v-for="module in modules" :value="module.id">{{module.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <button class="btn btn-block btn-outline-secondary" @click="add_main_module">Add Module
          </button>
        </div>
      </b-modal>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'moduleModal',
    props: ['type', 'design'],
    data() {
      return {
        sidebarSelectedModuleId: 0,
        mainSelectedModuleId: 0,
        error: '',
        maxSidebarOrder: 0,
        maxMainOrder: 0,
        designId: 1
      }
    },
    created() {
      if (this.design) {
        this.designId = this.design
      }
      this.getMax()
      this.getMax(1)
    },
    computed: {
      modules() {
        return this.$store.state.modules
      }
    }, methods: {
      getMax(type = 0) {
        this.$axios.$get('/api/pageModule/max?type=' + type + '&designId=' + this.designId)
          .then(data => {
            if (data.max) {
              if (type === 0) {
                this.maxSidebarOrder = data.max
              } else {
                this.maxMainOrder = data.max
              }
            } else {
              if (type === 0) {
                this.maxSidebarOrder = 0
              } else {
                this.maxMainOrder = 0
              }
            }
          }).catch(err => {
          console.log(err)
          if (type === 0) {
            this.maxSidebarOrder = 0
          } else {
            this.maxMainOrder = 0
          }
        })
      },
      add_sidebar_module() {
        if (this.sidebarSelectedModuleId === 0)
          return
        this.$axios.post('/api/pageModule', {
          type: 0,
          designId: this.designId,
          module_id: this.sidebarSelectedModuleId,
          order: (this.maxSidebarOrder + 1)
        }).then(result => {
          this.error = ''
          this.maxSidebarOrder += 1
          this.$emit('sidebarModuleAdded', result.data.pageModule)
        }).catch(err => {
          console.log(err)
          this.error = 'something went wrong trying to save pageModule in the database'
        })
        this.$refs.sidebar_module_model.hide()
      },
      add_main_module() {
        if (this.mainSelectedModuleId === 0)
          return
        this.$axios.post('/api/pageModule', {
          designId: this.designId,
          type: 1,
          module_id: this.mainSelectedModuleId,
          order: (this.maxMainOrder + 1)
        }).then(result => {
          this.error = ''
          this.maxMainOrder += 1
          this.$emit('mainModuleAdded', result.data.pageModule)
        }).catch(err => {
          console.log(err)
          this.error = 'something went wrong trying to save pageModule in the database'
        })
        this.$refs.main_module_model.hide()
      }
    },
    watch: {
      design: function(newVal) {
        this.designId = this.design
        this.getMax()
        this.getMax(1)
      }
    }
  }
</script>
