<template>
  <div>
    <admin-header></admin-header>
    <admin-sidebar></admin-sidebar>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark text-left ml-4">{{title}}</h1>
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <no-ssr>
            <nuxt></nuxt>
          </no-ssr>
        </div>
        <!-- /.container-fluid -->
      </section>
      <!-- /.content -->
    </div>
  </div>
</template>

<script>
import AdminHeader from "../components/admin-panel/adminHeader";
import AdminSidebar from "../components/admin-panel/adminSidebar";

export default {
  name: "adminPanel",
  data() {
    return {};
  },
  computed: {
    title() {
      return this.$store.state.adminTitle;
    }
  },
  created() {
    //this.$axios.$get("/api/new_test");
    this.$axios
      .post("/api/siteUser/checkLogin")
      .then(data => {
        if (!data.data.status) {
        // alert(data);
          this.$store.commit("setSiteUser", null);
          this.$router.push("/admin/login");
        } else {
          this.$store.commit("setSiteUser", data.data.user);
        }
      })
      .catch(err => {
        console.log("error when trying to check login session");
      });
  },
  components: {
    AdminHeader,
    AdminSidebar
  },
  head() {
    return {
      script: [
        { src: "/plugins/jquery/jquery.min.js" },
        { src: "/plugins/bootstrap/js/bootstrap.bundle.min.js" },
        { src: "/scripts/adminlte.min.js" },
        { src: "https://cdn.jsdelivr.net/npm/hls.js@latest" },
        { src: "https://cdn.plyr.io/3.5.2/plyr.js" },
        { src: "http://cdn.dashjs.org/latest/dash.all.min.js" }
      ],
      link: [
        { rel: "stylesheet", href: "/styles/adminlte.min.css" },
        { rel: "stylesheet", href: "/styles/vue-multi-select.css" },
        {
          rel: "stylesheet",
          href: "/plugins/font-awesome/css/font-awesome.min.css"
        }
      ]
    };
  }
};
</script>
