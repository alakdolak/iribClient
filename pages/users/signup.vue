<template>
  <div class="container">
    <div class="row justify-content-center mt-4 mb-4">
      <div class="col-sm-5">
        <div class="signup_card">
          <nuxt-link to="/users/login" class="back_arrow">< back to login page</nuxt-link>
          <div class="signup_card_header">SIGN UP</div>
          <div class="signup_card_body">
            <div class="form-group">
              <label for="">Name:</label>
              <input type="text" v-model="name" class="form-control" placeholder="enter your name here">
            </div>
            <div class="form-group">
              <label for="">Email:</label>
              <input type="email" v-model="email" class="form-control" placeholder="enter your email here">
            </div>
            <div class="form-group">
              <label for="">Password:</label>
              <input type="password" v-model="password" class="form-control" placeholder="enter your password here">
            </div>
            <div class="form-group">
              <label for="">Password confirmation:</label>
              <input type="password" v-model="password_repeat" class="form-control"
                     placeholder="repeat your password here">
            </div>
            <div class="form-group mt-4">
              <div class="alert alert-danger text-center" v-if="error_msg">
                {{this.error_msg}}
              </div>
              <button class="btn btn-block btn-outline-secondary" @click="submit">SIGN UP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'signup',
    layout: 'users',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_repeat: '',
        error: false,
        error_msg: '',
        notificationSystem: {
          options: {
            warning: {
              position: 'topCenter',
              theme: 'dark',
              overlay: false,
              layout: 2,
              backgroundColor: 'green',
              closeOnEscape: true,
              timeout: 2500,
              progressBar: false,
              progressBarColor: 'white',
              closeOnClick: true
            }
          }
        }
      }
    },
    methods: {
      validate_data() {
        if (!this.name || !this.email || !this.password || !this.password_repeat) {
          this.error = true
          this.error_msg = 'you need to fill all the input fields'
          return false
        } else {
          this.error = false
          this.error_msg = ''
          return true
        }
      },
      submit() {
        this.validate_data()
        if (!this.error) {
          this.$axios.post('/api/users/add', {
            name: this.name,
            email: this.email,
            password: this.password
          }).then(data => {
            if (data.data.error) {
              this.error_msg = data.data.msg;
              this.error = true
            } else {
              this.error_msg = '';
              this.error = false
              this.$toast.success('Success', 'you signed up successfully', this.notificationSystem.options.warning)
              this.$router.push({ path: '/users/login' })
            }

          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    watch: {
      password_repeat: function(val) {
        if (this.password !== val) {
          this.error_msg = 'your password and password confirmation doesn\'t match!'
          this.error = true
        } else {
          this.error_msg = ''
          this.error = false
        }
      }
    }
  }
</script>

<style scoped>
  .error {
    color: red;
    padding: 5px 0 5px 0;
    font-size: 0.9em;
  }

  .back_arrow {
    font-size: 0.9em;
    font-weight: bold;
    color: blue;
    height: 50px;
    line-height: 50px;
    padding: 10px
  }

  .signup_card {
    background-color: white;
    width: 100%;
    min-height: 600px;
    border-radius: 10px;
  }

  .signup_card_header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    padding-top: 10px;
    margin-bottom: 30px;
  }

  .signup_card_body {
    padding: 20px;
  }
</style>
