<template>
  <div>
    <!--<div v-if="page">-->
    <!--<div class="bg-gray" v-if="page.type === 0 ">-->
    <!--<show-main-rows :mainRows="mainRows"></show-main-rows>-->
    <!--</div>-->
    <!--<show-page-modules :design="design"></show-page-modules>-->
    <!--</div>-->
    hello
    <show-page-modules :design="design"></show-page-modules>
  </div>

</template>

<script>
  // import showMainRows from '~/components/root/showMainRows'
  import showPageModules from '~/components/root/showMainRows'

  export default {
    name: '_pages',
    layout: 'default',
    components: {

      showPageModules
    },
    data() {
      return {
        mainRows: [],
        pageId: 1,
        error: '',
        page: null,
        design: null
      }
    },
    created() {
      this.pageId = this.$route.params.page
      this.$axios.post('/api/page', { pageId: this.pageId })
        .then(data => {
          this.page = data.data.page
          if (this.page.type === 0) {
            console.log('type = 0')
            this.getMainRows()
          } else if (this.page.type === 1) {
            console.log('type = 1')
            this.getDesign()
          }
        }).catch(err => {
        this.error = 'something went wrong trying to create page'
        console.log(err)
      })

    },
    methods: {
      getMainRows() {
        this.$axios.get('api?page=' + this.pageId)
          .then(data => {
            this.mainRows = data.data.mainRows
          }).catch(err => {
          this.error = 'something went wrong trying to create page'
          console.log(err)
        })
      },
      getDesign() {
        console.log('getDesign called')
        this.$axios.$get('/api/design?pageId=' + this.pageId)
          .then(data => {
            this.design = data.design
          }).catch(err => {
          this.error = 'something went wrong trying to create page'
          console.log(err)
        })
      }
    }
  }
</script>

