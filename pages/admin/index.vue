<template>
  <div>
    <statistic-box></statistic-box>
  </div>
</template>

<script>
  import statisticBox from '~/components/admin-panel/dashboard/statisticBox'

  export default {
    layout: 'adminPanel',
    components: { statisticBox },
    created: function() {
      this.$store.commit('setAdminTitle', 'Dashboard')
    }

  }
</script>
