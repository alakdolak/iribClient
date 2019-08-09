<template>
  <div class="container">
    <div class="row justify-content-center mt-4 mb-4">
      <div class="col-sm-5">
        <login-card></login-card>
      </div>
    </div>
  </div>
</template>

<script>
  import loginCard from '~/components/shared/login'
  export default {
    name: 'users_login',
    layout: 'users',
    components: {
      loginCard
    }
  }
</script>
