<template>
  <div>
    <div v-if="page && page.type === 0" class="bg-gray">
      <show-main-rows :mainRows="mainRows"></show-main-rows>
    </div>
    <div v-else-if="page && page.type === 1">
      <show-page-modules :design="design"></show-page-modules>
    </div>
  </div>
</template>

<script>
  import showMainRows from '~/components/root/showMainRows'
  import showPageModules from '~/components/root/showPageModules'


  export default {
    name: 'index_page',
    layout: 'default',
    components: {
      showMainRows,
      showPageModules
    },
    data() {
      return {
        pageId: null,
        page: null,
        design: null,
        mainRows: []
      }
    },
    created() {
      this.pageId = this.$route.params.page
      this.getPage()
    },
    methods: {
      getPage() {
        console.log(this.pageId)
        this.$axios.post('/api/page', {
          pageId: this.pageId
        }).then(data => {
          this.page = data.data.page
          if (this.page.type === 0)
            this.getMainRows()
          else
            this.getDesign()
        }).catch(err => {
          console.log(err)
          this.error = 'something went wrong trying to get page from the database'
        })
      },
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
