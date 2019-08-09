<template>
  <div>
    <div class="list-group" v-if="roles.length">
      <div class="list-group-item list-group-item-action"
           @click="selectRole(role)"
           :class="[selectedRole && role.id === selectedRole.id ? 'list-group-item-secondary' : '']"
           v-for="role in roles">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{role.name}}</h5>
        </div>
        <p class="mb-1">{{role.description}}</p>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-danger text-center p-4">
        NO ROLES FOUND
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rolesList',
    props: ['roles', 'selectedRole'],
    data() {
      return {}
    },
    methods: {
      selectRole(role) {
        this.$emit('selectRole', role)
      }
    }
  }
</script>


<style scoped></style>
