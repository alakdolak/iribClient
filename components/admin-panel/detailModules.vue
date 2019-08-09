<template>
  <div>
    <div v-if="which == 'sidebar'">
      <module-model type="sidebar" style="margin-top: -16px" :design="designId" v-if="designId" v-on:sidebarModuleAdded="sidebarModuleAdded"></module-model>
      <module-model type="sidebar" style="margin-top: -16px" v-on:sidebarModuleAdded="sidebarModuleAdded" v-else></module-model>
      <draggable :list="sidebarModules" @update="onUpdateSidebar">
        <div v-for="module in sidebarModules" class="module_container border border-secondary rounded">
          <div class="module_header">
            <div class="icon_container pr-1" v-b-tooltip.hover title="Delete from sidebar"
                 @click="deleteModule(module.id)">
              <i class="fa fa-times-circle-o" aria-hidden="true" style="font-size: 23px;padding-top: 5px;"></i>
            </div>
            <div class="icon_container" v-b-tooltip.hover title="Drag boxes to change their order">
              <i class="fa fa-arrows" aria-hidden="true" style="font-size: 20px;padding-top: 7px"></i>
            </div>
            <nuxt-link :to="{name: 'admin-modules-id', params: { id:module.moduleId } }"
                       class="icon_container float-left pl-1" v-b-tooltip.hover title="Module Setting">
              <i class="fa fa-cog" aria-hidden="true" style="font-size: 20px;padding-top: 7px"></i>
            </nuxt-link>
          </div>
          <hr>
          <h2 class="module_body">
            {{getModuleName(module.moduleId)}}
          </h2>
        </div>
      </draggable>
    </div>
    <div v-else-if="which == 'main'">
      <module-model type="main" :design="designId" v-if="designId" v-on:mainModuleAdded="mainModuleAdded"></module-model>
      <module-model type="main" v-on:mainModuleAdded="mainModuleAdded" v-else></module-model>
      <div class="module_container border border-secondary rounded" style="margin-top: 44px;" v-if="designId === 1">
        <h1 class="module_body" style="margin-top: 80px">
          News detail here
        </h1>
      </div>
      <div style="height: 1px " v-else></div>
      <draggable :list="mainModules" @update="onUpdateMain">
        <div v-for="module in mainModules" :key="module.id" class="module_container border border-secondary rounded">
          <div class="module_header">
            <div class="icon_container pr-1" v-b-tooltip.hover title="Delete from Main"
                 @click="deleteModule(module.id , 1)">
              <i class="fa fa-times-circle-o" aria-hidden="true" style="font-size: 23px;padding-top: 5px;"></i>
            </div>
            <div class="icon_container" v-b-tooltip.hover title="Drag boxes to change their order">
              <i class="fa fa-arrows" aria-hidden="true" style="font-size: 20px;padding-top: 7px"></i>
            </div>
            <nuxt-link :to="{name: 'admin-modules-id', params: { id:module.moduleId } }"
                       class="icon_container float-left pl-1" v-b-tooltip.hover title="Module Setting">
              <i class="fa fa-cog" aria-hidden="true" style="font-size: 20px;padding-top: 7px"></i>
            </nuxt-link>
          </div>
          <hr>
          <h2 class="module_body">
            {{getModuleName(module.moduleId)}}
          </h2>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
  import lodash from 'lodash'
  import draggable from 'vuedraggable'
  import moduleModel from '~/components/admin-panel/moduleModal'

  export default {
    name: 'detailsModule',
    props: ['which', 'design'],
    components: {
      draggable,
      moduleModel
    },
    data() {
      return {
        sidebarModules: [],
        mainModules: [],
        error: '',
        designId: 1
      }
    },
    created() {
      if (this.design)
        this.designId = this.design
      this.getPageModules(0)
      this.getPageModules(1)
    },
    computed: {
      modules() {
        return this.$store.state.modules
      }
    },
    methods: {
      sidebarModuleAdded(sidebarModule) {
        this.sidebarModules.push(sidebarModule)
      },
      mainModuleAdded(mainModule) {
        this.mainModules.push(mainModule)
      },
      getPageModules(type) {
        this.$axios.$get('/api/pageModule?type=' + type + '&designId=' + this.designId)
          .then(result => {
            if (type === 0) {
              this.sidebarModules = []
              this.sidebarModules = result.pageModule
            } else {
              this.mainModules = []
              this.mainModules = result.pageModule
            }
            this.error = ''
          })
          .catch(err => {
            console.log(err)
            this.error = 'something went wrong trying to get page  modules from the database'
          })
      },
      getModuleName(module_id) {
        return lodash.find(this.modules, { id: module_id })['name']
      },
      onUpdateSidebar() {
        let index
        for (index = 0; index < this.sidebarModules.length; index++) {
          this.$axios.post('/api/pageModule/order', {
            id: this.sidebarModules[index].id,
            order: (index + 1)
          }).then(result => {
            // console.log(result)
          }).catch(err => {
            this.error = 'something went wrong trying to reorder the modules'
          })
        }
      },
      onUpdateMain() {
        let index
        for (index = 0; index < this.mainModules.length; index++) {
          this.$axios.post('/api/pageModule/order', {
            id: this.mainModules[index].id,
            order: (index + 1)
          }).then(result => {
            // console.log(result)
          }).catch(err => {
            console.log(err)
            this.error = 'something went wrong trying to reorder the modules'
          })
        }
      },
      deleteSidebarModule(id, type = 0) {
        this.$axios.post('/api/pageModule/delete', {
          id: id
        }).then(data => {
          if (type === 0) {
            let index = lodash.findIndex(this.sidebarModules, { id: id })
            this.sidebarModules.splice(index, 1)
            // this.$store.commit('setDetailSidebarModule', this.sidebarModules)
          } else {
            let index = lodash.findIndex(this.mainModules, { id: id })
            this.mainModules.splice(index, 1)
            // this.$store.commit('setDetailMainModule', this.mainModules)
          }

        }).catch(err => {
          console.log(err)
          this.error = 'something went wrong trying to delete module from the database'
        })
      },
      deleteModule(id, type = 0) {
        this.$axios.post('/api/pageModule/delete', {
          id: id
        }).then(data => {
          if (type === 0) {
            let index = lodash.findIndex(this.sidebarModules, { id: id })
            this.sidebarModules.splice(index, 1)
            // this.$store.commit('setDetailSidebarModule', this.sidebarModules)
          } else {
            let index = lodash.findIndex(this.mainModules, { id: id })
            this.mainModules.splice(index, 1)
            // this.$store.commit('setDetailMainModule', this.mainModules)
          }

        }).catch(err => {
          console.log(err)
          this.error = 'something went wrong trying to delete module from the database'
        })
      }
    },
    watch: {
      design: function(newVal) {
        this.designId = this.design
        this.getPageModules(0)
        this.getPageModules(1)
      }
    }
  }
</script>

<style scoped>
  .module_container {
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    margin-top: 20px;
  }

  .module_header {
    width: 100%;
    height: 30px;
    line-height: 30px;
  }

  .module_body {
    text-align: center;
    height: 40px;
    font-size: 1.4em;
    padding-bottom: 10px
  }

  .icon_container {
    float: right;
    margin: 5px;
    cursor: pointer;
    color: #000;
  }

  .icon_container:hover {
    color: #6c757d !important;
  }
</style>
