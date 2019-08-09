<template>
  <div>
    <div class="row mt-4">
      <div class="col-sm-12">
        <ul class="nav nav-tabs">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle btn btn-light"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >Comments (0)</a>
            <div class="dropdown-menu">
              <div class="dropdown-item" v-for="sort in sort_by">{{sort.name}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 mt-4">
        <div class="alert alert-danger text-center" v-if="comment_error">{{comment_error}}</div>
        <textarea
          rows="5"
          type="text"
          class="form-control textarea-control"
          v-model="comment"
          placeholder="Enter your comment here"
          @focus="check_login"
          data-emojiable="true"
          data-emoji-input="unicode"
        ></textarea>
      </div>
    </div>

    <div class="row mt-2 comment_submit_button_container">
      <input
        type="submit"
        class="btn btn-outline-dark btn-block comment_submit_button"
        value="Add Comment"
        @click="addComment"
      >
    </div>

    <b-modal ref="loginModal" id="loginModal" centered title="BootstrapVue" hide-footer hide-header>
      <div class="alert alert-danger text-center">you are not logged in !</div>
      <login-card mode="modal"></login-card>
    </b-modal>
  </div>
</template>

<script>
import loginCard from "~/components/shared/login";

export default {
  name: "comments",
  components: {
    loginCard
  },
  data() {
    return {
      sort_by: [{ value: 0, name: "date" }, { value: 1, name: "popularity" }],
      comment: "",
      comment_error: "",
      user: null,
      notificationSystem: {
        options: {
          warning: {
            position: "bottomLeft",
            theme: "dark",
            overlay: false,
            layout: 2,
            backgroundColor: "green",
            closeOnEscape: true,
            timeout: 2500,
            progressBar: false,
            progressBarColor: "white",
            closeOnClick: true
          }
        }
      }
    };
  },
  computed: {
    news_id() {
      return this.$route.params.id;
    }
  },
  methods: {
    check_login() {
      console.log("checking login ...");
      this.$axios
        .post("api/users/check_login")
        .then(data => {
          if (data.data.status) {
            //user is logged in
            this.user = data.data.user;
          } else {
            this.$refs.loginModal.show();
            console.log(data.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    validateComment() {
      if (!this.user) {
        this.comment_error = "you need to login first ";
        return false;
      } else if (!this.comment) {
        this.comment_error = "comment can not be empty ...";
        return false;
      } else {
        this.comment_error = "";
        return true;
      }
    },
    addComment() {
      if (this.validateComment()) {
        this.$axios
          .post("/api/comments/add", {
            comment: this.comment,
            user_id: this.user.id,
            news_id: this.news_id
          })
          .then(comment => {
            console.log(comment);
            this.comment = "";
            this.$toast.success(
              "Success",
              "your comment was submitted successfully",
              this.notificationSystem.options.warning
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
