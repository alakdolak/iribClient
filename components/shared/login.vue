<template>
  <div class="login_card">
    <div class="login_card_header">Login</div>
    <div class="login_card_body">
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="email" placeholder="enter your email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="enter your password"
        />
      </div>
      <div class="form-group mt-4">
        <div class="alert alert-danger text-center" v-if="error">{{error_msg}}</div>
        <button class="btn btn-block btn-outline-primary" @click="login">LOGIN</button>
      </div>
      <!-- <div class="form-group mt-3">
        <div class="form_text">or sign up using</div>
        <div class="row form_icons_container justify-content-center">
          <div class="icon" style="background-color: red">
            <i class="fa fa-google-plus" aria-hidden="true"></i>
          </div>
          <div class="icon" style="background-color: blue">
            <i class="fa fa-twitter" aria-hidden="true"></i>
          </div>
          <div class="icon" style="background-color: purple">
            <i class="fa fa-facebook" aria-hidden="true"></i>
          </div>
        </div>
      </div>-->
      <div class="form-group mt-3">
        <!-- <div class="form_text">or sign up using</div> -->
        <div class="form_text2">don't have an account yet ?</div>
        <nuxt-link to="/users/signup">
          <button class="btn btn-block btn-outline-secondary">SIGN UP</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginCard",
  props: ["mode"],
  data() {
    return {
      email: "",
      password: "",
      error: false,
      error_msg: ""
    };
  },
  methods: {
    validate() {
      if (!this.email || !this.password) {
        this.error = true;
        this.error_msg = "email or password can not be empty";
      } else {
        this.error = false;
        this.error_msg = "";
      }
    },
    login() {
      this.validate();
      if (!this.error) {
        this.$axios
          .post("/api/users/login", {
            email: this.email,
            password: this.password
          })
          .then(data => {
            console.log(data);
            if (data.data.error) {
              this.error = true;
              this.error_msg = "your email or password is not correct!";
              this.$store.commit("unsetUser");
            } else {
              this.error = false;
              this.error_msg = "";
              this.$store.commit("setUser", data.data.user);
              if (!this.mode || this.mode !== "modal") {
                this.$router.push({ path: "/users" });
              } else {
                this.$root.$emit("bv::hide::modal", "loginModal");
              }
            }
          });
      }
    }
  }
};
</script>


<style scoped>
.login_card {
  background-color: white;
  width: 100%;
  min-height: 600px;
  border-radius: 10px;
}

.login_card_header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  padding-top: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
}

.login_card_body {
  padding: 20px;
}

.form_text {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 0.8em;
}
.form_text2 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 1em;
}

.form_icons_container {
  height: 40px;
  margin-top: 5px;
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  float: left;
  margin: 0 5px 0 5px;
  text-align: center;
  font-size: 1.5em;
  line-height: 40px;
  color: white;
  cursor: pointer;
}
</style>
