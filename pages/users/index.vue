<template>
  <div class="container mt-4 mb-4">
    you are logged in
  </div>
</template>

<script>

  export default {
    name: 'users',
    layout: 'users',
    created() {
      this.check_login()
    },
    methods: {
      check_login() {
        this.$axios.post('/api/users/check_login')
          .then(data => {
            console.log(data.data)
            if (!data.data.status) {
              this.$store.commit('unsetUser')
              this.$router.push({ path: '/users/login' })
            } else {
            }
          }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped></style>
