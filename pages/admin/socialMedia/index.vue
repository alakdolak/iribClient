<template>
  <div></div>
</template>

<script>
  export default {
    name: 'socialMediaPage',
    layout: 'adminPanel',
    data() {
      return {
        media: []
      }
    },
    created() {
      this.getMedia()
    },
    methods: {
      getMedia() {

      }
    }
  }
</script>
