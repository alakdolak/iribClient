<template>
  <div>
    <div class="row">
      <div class="col-sm-4">
        <b-btn v-b-modal.addUser variant="outline-secondary" class="btn btn-lg btn-block mb-4 mt-1">Add new user</b-btn>

      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-sm-10">
        <div class="alert alert-danger text-center mt-2 mb-2" v-if="serverError">{{serverError}}</div>
        <table class="table table-hover table-striped text-center">
          <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user , index) in users">
            <td>{{index + 1}}</td>
            <td>{{user.name}}</td>
            <td>{{user.username}}</td>
            <td>{{user.siteRole.name}}</td>
            <td>
              <button class="btn btn-sm btn-outline-danger" @click="deleteUser(user.id , index)">Delete</button>
              <button class="btn btn-sm btn-outline-secondary" @click="showEdit(user)">Edit</button>
              <button class="btn btn-sm btn-outline-info" @click="showPassword(user)">Change password</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!--add user modal-->
    <b-modal id="addUser" ref="addUser" title="Add User" hide-footer size="md">
      <div class="alert alert-danger text-center" v-if="modalError">{{modalError}}</div>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="form-group">
        <label for="">Username:</label>
        <input type="text" class="form-control" v-model="username">
      </div>
      <div class="form-group">
        <label for="">Role:</label>
        <select class="form-control" v-model="role">
          <option :value="option.id" v-for="option in roles">{{option.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="">Password:</label>
        <input type="password" v-model="password" class="form-control">
      </div>
      <div class="form-group">
        <label for="">Confirm password:</label>
        <input type="password" class="form-control" v-model="passwordRepeat">
      </div>
      <div class="form-group">
        <button class="btn btn-block btn-primary" @click="addUser">Add</button>
      </div>
    </b-modal>

    <!--edit user modal-->
    <b-modal id="editUserModal" ref="editUserModal" title="Edit User" hide-footer size="md">
      <div class="alert alert-danger text-center mb-2 mt-2" v-if="updateError">{{updateError}}</div>
      <div class="form-group" v-if="editUser">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="editUser.name">
      </div>
      <div class="form-group" v-if="editUser">
        <label for="">Username:</label>
        <input type="text" class="form-control" v-model="editUser.username">
      </div>
      <div class="form-group" v-if="editUser">
        <label for="">Role:</label>
        <select class="form-control" v-model="editUser.siteRoleId">
          <option :value="option.id" v-for="option in roles">{{option.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <button class="btn btn-block btn-primary" @click="updateUser">Edit</button>
      </div>
    </b-modal>

    <b-modal id="changePasswordModal" ref="changePasswordModal" title="Change Password" hide-footer>
      <div class="alert alert-danger text-center mb-2 mt-2" v-if="changePasswordError">{{changePasswordError}}</div>
      <div class="form-group">
        <label>password:</label>
        <input type="password" class="form-control" v-model="passwordChange">
      </div>
      <div class="form-group">
        <label for="">Confirm Password:</label>
        <input type="password" class="form-control" v-model="passwordChangeConfirm">
      </div>
      <div class="form-group">
        <button class="btn btn-block btn-primary" @click="changePassword" v-if="changePasswordUser">Change</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'adminUsers',
    layout: 'adminPanel',
    data() {
      return {
        error: '',
        modalError: '',
        serverError: '',
        updateError: '',
        users: [],
        roles: [],
        name: '',
        username: '',
        password: '',
        passwordRepeat: '',
        role: null,
        editUser: null,
        passwordChange: '',
        passwordChangeConfirm: '',
        changePasswordError: '',
        changePasswordUser: null
      }
    },
    created() {
      this.$store.commit('setAdminTitle', 'Users')
      this.getUsers()
      this.getRoles()
    },
    methods: {
      changePassword() {
        if (!this.passwordChange || !this.passwordChangeConfirm) {
          this.changePasswordError = 'you need to enter password and confirm password fields'
        } else if (this.passwordChangeConfirm !== this.passwordChange) {
          this.changePasswordError = 'password and confirm password don\'t match'
        } else {
          this.changePasswordError = ''
          this.$axios.post('/api/siteUsers/change', {
            id: this.changePasswordUser.id,
            password: this.passwordChange
          }).then(data => {
            this.$refs.changePasswordModal.hide()
            this.$swal(
              'Password updated!',
              'User password changed successfully',
              'success'
            )
            this.changePasswordUser = null
            this.passwordChange = ''
            this.passwordChangeConfirm = ''
          }).catch(err => {
            console.log(err)
            this.error = 'something went wrong trying to change user password'
          })
        }
      },
      showPassword(user) {
        this.changePasswordUser = user
        this.$refs.changePasswordModal.show()
      },
      getUsers() {
        this.$axios.$get('/api/siteUsers')
          .then(data => {
            this.users = data.users
          }).catch(err => {
          this.error = 'something went wrong trying to get data from the database'
        })
      },
      checkData() {
        if (!this.role)
          this.modalError = 'you need to assign a role to the user'
        else if (!this.name || !this.username)
          this.modalError = 'name or username fields can not be empty!'
        else if (!this.password) {
          this.modalError = 'password field can not be empty'
        } else if (this.password !== this.passwordRepeat) {
          this.modalError = 'password and confirm password don\'t match'
        } else {
          this.modalError = ''
        }
      },
      getRoles() {
        this.$axios.$get('/api/roles')
          .then(data => {
            this.roles = data.roles
          }).catch(err => {
          console.log(err)
          this.error = 'something went wrong trying to get data from the database'
        })
      },
      showEdit(user) {
        this.editUser = user
        this.$refs.editUserModal.show()
      },
      updateUser() {
        this.updateError = ''
        this.$axios.post('/api/siteUsers/update', {
          id: this.editUser.id,
          name: this.editUser.name,
          username: this.editUser.username,
          role: this.editUser.role
        }).then(data => {
          if (data.data.error) {
            this.updateError = 'username already exists'
          } else {
            let newUser = data.data.user
            for (let i = 0; i < this.users.length; i++) {
              if (this.users[i].id === newUser.id)
                this.users[i] = newUser
            }
            this.editUser = null
            this.error = ''
            this.serverError = ''
            this.updateError = ''
            this.$refs.editUserModal.hide()
          }
        }).catch(err => {
          console.log(err)
          this.error = 'something went wrong trying to update the user '
        })

      },
      deleteUser(id, index) {
        this.$swal({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            this.$axios.post('/api/siteUsers/delete', {
              id: id
            }).then(data => {
              this.users.splice(index, 1)
              this.serverError = ''
              this.$swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }).catch(err => {
              this.serverError = ''
              this.error = 'something went wrong trying to delete user from the database'
            })

          }
        })

      },
      addUser() {
        this.checkData()
        if (this.modalError)
          return
        this.$axios.post('/api/siteUsers', {
          username: this.username,
          password: this.password,
          name: this.name,
          role: this.role
        }).then(data => {
          if (data.data.error) {
            this.serverError = data.data.message
          } else {
            this.users.push(data.data.user)
            this.serverError = ''
          }
          this.name = ''
          this.password = ''
          this.username = ''
          this.modalError = ''
          this.passwordRepeat = ''
          this.role = null
          this.$refs.addUser.hide()
        })
      }
    }
  }
</script>

<style scoped></style>
