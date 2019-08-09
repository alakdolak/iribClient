<template>
  <div class="container" v-if="design">
    <div class="row news_detail_container news_container justify-content-center mt-4"
         :class="preview_container_style()">
      <div class="main_container" :class="main_style()">
        <div class="row">
          <div class="col-sm-12">
            <div class="clearfix"></div>
            <div class="main_module_container mt-4" v-for="module in mainModules">
              <show-custom-module
                v-if="module.module.type === 0"
                :show="2"
                :module_id="module.moduleId"
              ></show-custom-module>
              <show-default-module
                v-else
                :type="module.module.type">

              </show-default-module>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar_container col" v-if="design.sidebar">
        <div class="sidebar_module_container" v-for="module in sidebarModules">
          <show-custom-module
            v-if="module.module.type === 0"
            :show="0"
            :module_id="module.moduleId"
          ></show-custom-module>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import showCustomModule from '~/components/shared/showCustomModule'
  import showDefaultModule from '~/components/shared/showDefaultModule'

  export default {
    name: 'showPageModules',
    props: ['design'],
    components: {
      showCustomModule,
      showDefaultModule
    },
    data() {
      return {
        sidebarModules: [],
        mainModules: []
      }
    },

    created() {
      console.log("show page modules creator called")
      if(this.design)
        this.getData()
    },
    methods: {
      getData() {
        this.$axios.post('/api/design/page', {
          designId: this.design.id
        }).then(data => {
          this.sidebarModules = data.data.sidebarModules
          this.mainModules = data.data.mainModules
        }).catch(err => {
          console.log(err)
        })
      },
      preview_container_style() {
        return {
          'rtl': !this.design.direction
        }
      },
      main_style() {
        return {
          'col-sm-12': !this.design.sidebar,
          'col-sm-9': this.design.sidebar && (this.design.sidebar_size === 1),
          'col-sm-8': this.design.sidebar && (this.design.sidebar_size === 2),
          'col-sm-7': this.design.sidebar && (this.design.sidebar_size === 3)
        }
      }
    },
    watch: {
      design: function(newVal) {
        console.log("called")
        this.getData()
      }
    }
  }
</script>

