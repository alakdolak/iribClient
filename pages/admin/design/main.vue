<template>
  <div>
    <main-design></main-design>
  </div>
</template>

<script>
  import mainDesign from '~/components/admin-panel/design/main'

  export default {
    name: 'mainPage',
    components: { mainDesign },
    layout: 'adminPanel',
    data() {
      return {
        page: 1
      }
    },
    created() {
      if (this.$route.params.page) {
        this.page = this.$route.params.page
      }
    }
  }
</script>
