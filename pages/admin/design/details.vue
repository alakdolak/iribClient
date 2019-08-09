<template>
  <div>
    <details-design></details-design>
  </div>
</template>

<script>
  import detailsDesign from '~/components/admin-panel/design/details'

  export default {
    layout: 'adminPanel',
    name: 'detailsPage',
    components: {
      detailsDesign
    }
  }
</script>
