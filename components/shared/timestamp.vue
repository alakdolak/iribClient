<template>
  <div class="container">{{ time | tehran}}</div>
</template>

<script>
  // import moment from 'moment'
  import moment from 'moment-timezone'

  export default {
    name: 'timestamp',
    props: ['time', 'timezone'],

    filters: {
      tehran: function(time) {
        return moment(time).tz('Asia/Tehran').format('LLL')
      }
    }
  }
</script>

<style scoped>
  .container {
    display: inline;
  }
</style>
