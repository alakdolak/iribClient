<template>
  <nuxt></nuxt>
</template>

<script>
  export default {
    name: 'empty',
    head() {
      return {
        script: [
          { src: '/plugins/jquery/jquery.min.js' },
          { src: '/plugins/bootstrap/js/bootstrap.bundle.min.js' }
        ],
        link: [
          { rel: 'stylesheet', href: '/plugins/font-awesome/css/font-awesome.min.css' }
        ]
      }
    }
  }
</script>
