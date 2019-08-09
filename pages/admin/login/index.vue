<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-sm-4">
        <div class="card shadow shadow-lg border" style="margin-top: 50px; border-radius: 15px">
          <div class="card-header bg-dark text-light">
            <h3>Login</h3>
          </div>
          <div class="card-body bg-light" style="padding: 20px;">
            <form @submit="stopForm">
              <div class="form-group">
                <label for class="label">Username:</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-user-o" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input type="text" class="form-control" v-model="username" placeholder="Username">
                </div>
              </div>
              <div class="form-group">
                <label class="label">Password:</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-key" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="password"
                  >
                </div>
              </div>
              <div class="form-group">
                <div
                  class="alert alert-danger text-center"
                  style="margin-top: 20px"
                  v-if="error"
                >{{error}}</div>
              </div>
              <div class="form-group mt-4">
                <button class="btn btn-block btn-outline-dark" @click="login">LOGIN</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminLogin",
  layout: "empty",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    stopForm(event) {
      event.preventDefault();
    },
    login() {
      if (!this.username || !this.password) {
        this.error = "username and password fields can not be empty";
      } else {
        this.error = "";
        this.$axios
          .post("/api/siteUser/login", {
            username: this.username,
            password: this.password
          })
          .then(data => {
            if (data.data.error) {
              this.error = "username or password incorrect";
            } else {
              this.username = "";
              this.password = "";
              this.$store.commit("setSiteUser", data.data.user);
              this.$router.push({ path: "/admin" });
            }
          })
          .catch(err => {
            console.log(err);
            this.error = "something went wrong trying to login";
          });
      }
    }
  }
};
</script>

<style scoped>
.label {
  font-size: 1.3em;
  margin-bottom: 10px;
  margin-top: 10px;
}

.container-fluid {
  width: 100%;
  height: 100vh;
  background: radial-gradient(#dcdcdc 3px, transparent 4px),
    radial-gradient(#dcdcdc 3px, transparent 4px),
    linear-gradient(#fff 4px, transparent 0),
    linear-gradient(
      45deg,
      transparent 74px,
      transparent 75px,
      #dcdcdc 75px,
      #dcdcdc 76px,
      transparent 77px,
      transparent 109px
    ),
    linear-gradient(
      -45deg,
      transparent 75px,
      transparent 76px,
      #dcdcdc 76px,
      #dcdcdc 77px,
      transparent 78px,
      transparent 109px
    ),
    #fff;
  background-size: 109px 109px, 109px 109px, 100% 6px, 109px 109px, 109px 109px;
  background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
}
</style>
