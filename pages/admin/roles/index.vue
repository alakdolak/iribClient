<template>
  <div>
    <div class="row">
      <div class="col-sm-4" >
        <b-btn v-b-modal.addRole variant="outline-secondary" class="btn btn-lg btn-block mb-4">Add new role</b-btn>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-4" style="height: 68vh">
        <rolesList :roles="roles" :selectedRole="selectedRole" v-on:selectRole="selectRole"></rolesList>
      </div>
      <div class="col-sm-8 ">
        <rolesDetail :selectedRole="selectedRole" v-on:updateRole="updateRole"></rolesDetail>
      </div>

      <b-modal id="addRole" ref="addRole" title="Add role" hide-footer>
        <div class="alert alert-danger text-center" v-if="modalError">{{modalError}}</div>
        <div class="form-group">
          <label for="">Name:</label>
          <input type="text" class="form-control" v-model="name" placeholder="enter name">
        </div>
        <div class="form-group">
          <label for="">Description:</label>
          <b-form-textarea
            v-model="description"
            placeholder="enter description"
            rows="4"
            no-resize
          />
        </div>
        <div class="form-group">
          <button class="btn btn-block btn-primary" @click="addRole">Add</button>
        </div>
      </b-modal>

    </div>
  </div>
</template>

<script>

  import rolesList from '~/components/admin-panel/roles/list'
  import rolesDetail from '~/components/admin-panel/roles/details'

  export default {
    name: 'adminRoles',
    layout: 'adminPanel',
    components: {
      rolesList,
      rolesDetail
    },
    data() {
      return {
        modalError: '',
        name: '',
        description: '',
        roles: [],
        selectedRole: null
      }
    },
    created() {
      this.$store.commit('setAdminTitle', 'Roles')
      this.getRoles()
    },
    methods: {
      getRoles() {
        this.$axios.$get('/api/roles')
          .then(data => {
            this.roles = data.roles
          }).catch(err => {
          console.log('something went wrong trying to get data from the database')
        })
      },
      updateRole(role) {
        for (let i = 0; i < this.roles.length; i++) {
          if (role.id === this.roles[i].id) {
            this.roles[i] = role
          }
        }
      },
      addRole() {
        if (!this.name || !this.description) {
          this.modalError = 'name or description fields can not be empty'
          return
        }
        this.$axios.post('/api/roles', {
          name: this.name,
          description: this.description
        }).then(data => {
          this.roles.push(data.data.role)
          this.name = ''
          this.description = ''
          this.modalError = ''
          this.$refs.addRole.hide()
        }).catch(err => {
          console.log('error adding new role to database')
        })
      },
      selectRole(role) {
        this.selectedRole = role
      }
    }
  }
</script>

<style scoped></style>
