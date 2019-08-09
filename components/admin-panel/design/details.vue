<template>
  <div>
    <div v-if="error">
      <div class="container mt-4">
        <div class="row justify-content-center">
          <div class="col-sm-8">
            <div class="alert alert-danger text-center">
              {{error}}
              <br>
              please try again later
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="design_container" v-else>
      <div class="row justify-content-center">
        <div class="col-sm-8 setting_container">
          <div class="card">
            <div class="card-header">Setting</div>
            <div class="card-body">
              <div class="setting_row_container">
                <div class="row">
                  <div class="col-sm-6">
                    Sidebar :
                    <div class="btn-group ml-4">
                      <button
                        class="btn btn-sm"
                        :class="[ sidebar ? 'btn-success' : 'btn-outline-success']"
                        @click="toggleSidebar(true)"
                      >SHOW
                      </button>
                      <button
                        class="btn btn-sm"
                        :class="[ !sidebar ? 'btn-danger' : 'btn-outline-danger']"
                        @click="toggleSidebar(false)"
                      >HIDE
                      </button>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    Size :
                    <div class="btn-group ml-4">
                      <button class="btn btn-sm "
                              @click="changeSidebarSize(1)"
                              :class="[sidebar_size == 1 ? 'btn-secondary' : 'btn-outline-secondary']">
                        SMALL
                      </button>
                      <button class="btn btn-sm "
                              @click="changeSidebarSize(2)"
                              :class="[sidebar_size == 2 ? 'btn-secondary' : 'btn-outline-secondary']">
                        MEDIUM
                      </button>
                      <button class="btn btn-sm"
                              @click="changeSidebarSize(3)"
                              :class="[sidebar_size == 3 ? 'btn-secondary' : 'btn-outline-secondary']">
                        LARGE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="setting_row_container">
                Direction :
                <div class="btn-group ml-4">
                  <button
                    class="btn btn-sm"
                    :class="[ direction ? 'btn-success' : 'btn-outline-success']"
                    @click="toggleDirection(true)"
                  >LEFT TO RIGHT
                  </button>
                  <button
                    class="btn btn-sm"
                    :class="[ !direction ? 'btn-danger' : 'btn-outline-danger']"
                    @click="toggleDirection(false)"
                  >RIGHT TO LEFT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="row preview_container justify-content-center" :class="preview_container_style(direction)">
        <div v-bind:class="main_style(sidebar,sidebar_size)">
          <h2 class="text-secondary">Main</h2>
          <hr>
          <!--<module-model type="main" :design="designId" v-if="designId"></module-model>-->
          <!--<module-model type="main" v-else></module-model>-->
          <detail-modules which="main" :design="designId" v-if="designId && designId !== 1"></detail-modules>
          <detail-modules which="main" v-else></detail-modules>
        </div>
        <div class="sidebar_container col" v-if="sidebar">
          <h2 class="sidebar_title text-secondary">Sidebar</h2>
          <hr>
          <!--<module-model type="sidebar" style="margin-top: -16px" :design="designId" v-if="designId"></module-model>-->
          <!--<module-model type="sidebar" style="margin-top: -16px" v-else></module-model>-->
          <detail-modules which="sidebar" :design="designId" v-if="designId && designId !== 1"></detail-modules>
          <detail-modules which="sidebar" v-else></detail-modules>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moduleModel from '~/components/admin-panel/moduleModal'
  import detailModules from '~/components/admin-panel/detailModules'
  import lodash from 'lodash'

  export default {
    name: 'detailsDesign',
    props: ['details'],
    components: {
      moduleModel,
      detailModules
    },
    data() {
      return {
        sidebar: false,
        direction: true,
        sidebar_size: 1,
        sidebar_modules: [],
        error: '',
        pageId: 2,
        designId: 1
      }
    },
    created() {
      this.pageId = this.details ? this.details : 2

      this.$axios.$get('/api/design?pageId=' + this.pageId)
        .then(data => {
          this.sidebar = data.design.sidebar
          this.direction = data.design.direction
          this.sidebar_size = data.design.sidebar_size
          this.designId = data.design.id
          this.error = ''
        }).catch(err => {
        console.log(err)
        this.error = 'something went wrong trying to get the design from the database'
      })
      this.$axios.post('/api/page', {
        pageId: this.pageId
      }).then(data => {
        this.$store.commit('setAdminTitle', 'Design '+ data.data.page.name +' page')
      })
    },
    methods: {
      updateData() {
        this.$axios.post('/api/design', {
          pageId: this.pageId,
          sidebar: this.sidebar,
          sidebar_size: this.sidebar_size,
          direction: this.direction
        }).then(result => {
          this.error = ''
        }).catch(err => {
          console.log(err)
          this.error = 'something went wrong trying to update the design'
        })
      },
      toggleSidebar(status) {
        this.sidebar = status
        this.updateData()
      },
      toggleDirection(direction) {
        this.direction = direction
        this.updateData()
      },
      changeSidebarSize(size) {
        this.sidebar_size = size
        this.updateData()
      },
      preview_container_style(direction) {
        return {
          'rtl': !direction
        }
      },
      main_style(sidebar, sidebar_size) {
        return {
          'col-sm-12': !sidebar,
          'col-sm-9': sidebar && (sidebar_size == 1),
          'col-sm-8': sidebar && (sidebar_size == 2),
          'col-sm-7': sidebar && (sidebar_size == 3)
        }
      }
    },
    computed: {
      modules() {
        return this.$store.state.modules
      }
    },
    watch: {
      details: function(newVal) {
        this.pageId = this.details
        this.$axios.$get('/api/design?pageId=' + this.pageId)
          .then(data => {
            this.sidebar = data.design.sidebar
            this.direction = data.design.direction
            this.sidebar_size = data.design.sidebar_size
            this.designId = data.design.id
            this.error = ''
          }).catch(err => {
          console.log(err)
          this.error = 'something went wrong trying to get the design from the database'
        })
      }
    }
  }
</script>

<style scoped>
  .setting_row_container {
    font-size: 1.2em;
    margin: 15px auto;
  }

  .preview_container {
    max-width: 1200px;
    justify-self: center;
    margin: 20px auto;
  }

  .news_description {
    width: 100%;
    padding: 20px 0;
    font-size: 1.1em;
  }
</style>
