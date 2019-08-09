<template>
  <div>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href class="brand-link">
        <!--<img src="/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"-->
        <!--style="opacity: .8">-->
        <span
          class="brand-text font-weight-light pl-4"
          style="font-weight: bold !important"
        >Admin Panel</span>
      </a>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image"></div>
          <div class="info">
            <a href="#" class="d-block" v-if="siteUser">{{siteUser.name}}</a>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <!-- Add icons to the links using the .nav-icon class
            with font-awesome or any other icon font library-->
            <li class="nav-item">
              <nuxt-link to="/admin" class="nav-link">
                <i class="nav-icon fa fa-dashboard"></i>
                <p>Dashboard</p>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/admin/news" class="nav-link">
                <i class="nav-icon fa fa-newspaper-o"></i>
                <p>News</p>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/admin/comments" class="nav-link">
                <i class="nav-icon fa fa-comments-o" aria-hidden="true"></i>
                <p>Comments</p>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/admin/live" class="nav-link">
                <i class="nav-icon fa fa-rss" aria-hidden="true"></i>
                <p>Live Feeds</p>
              </nuxt-link>
            </li>
            <li class="nav-item has-treeview">
              <nuxt-link to class="nav-link">
                <i class="nav-icon fa fa-cube" aria-hidden="true"></i>
                <p>
                  Default modules
                  <i class="right fa fa-angle-left"></i>
                </p>
              </nuxt-link>
              <ul class="nav nav-treeview">
                <!-- <li class="nav-item">
                  <nuxt-link to="/admin/defaults/banner" class="nav-link">
                    <i class="fa fa-picture-o nav-icon" aria-hidden="true"></i>
                    <p>Banner</p>
                  </nuxt-link>
                </li>-->
                <li class="nav-item">
                  <nuxt-link to="/admin/defaults/redirect" class="nav-link">
                    <i class="fa fa-exchange nav-icon" aria-hidden="true"></i>
                    <p>Redirect</p>
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/admin/defaults/breaking" class="nav-link">
                    <i class="fa fa-exclamation-triangle nav-icon" aria-hidden="true"></i>
                    <p>Breaking News</p>
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/admin/defaults/share" class="nav-link">
                    <i class="fa fa-share-alt nav-icon" aria-hidden="true"></i>
                    <p>Share</p>
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/admin/defaults/weather" class="nav-link">
                    <i class="fa fa-sun-o nav-icon" aria-hidden="true"></i>
                    <p>Weather</p>
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-treeview">
              <nuxt-link to="/admin/modules" class="nav-link">
                <i class="nav-icon fa fa-pie-chart"></i>
                <p>
                  Modules
                  <i class="right fa fa-angle-left"></i>
                </p>
              </nuxt-link>
              <ul class="nav nav-treeview">
                <li v-for="module in modules" class="nav-item" v-if="module.type === 0">
                  <nuxt-link
                    :to="{name: 'admin-modules-id', params: { id:module.id } }"
                    class="nav-link"
                  >
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>{{ module.name }}</p>
                  </nuxt-link>
                </li>
              </ul>
            </li>

            <li class="nav-item has-treeview">
              <nuxt-link to class="nav-link">
                <i class="nav-icon fa fa-bars" aria-hidden="true"></i>
                <p>
                  Menus
                  <i class="right fa fa-angle-left"></i>
                </p>
              </nuxt-link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <nuxt-link to="/admin/menus/header" class="nav-link">
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>Header</p>
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/admin/menus/footer" class="nav-link">
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>Footer</p>
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-treeview">
              <nuxt-link to="/admin/design" class="nav-link">
                <i class="nav-icon fa fa-paint-brush" aria-hidden="true"></i>
                <p>
                  Design
                  <i class="right fa fa-angle-left"></i>
                </p>
              </nuxt-link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <nuxt-link to="/admin/design/main" class="nav-link">
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>Main page</p>
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/admin/design/details" class="nav-link">
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>Detail page</p>
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/admin/design/tags" class="nav-link">
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>Tags page</p>
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/admin/design/sub_categories" class="nav-link">
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>Sub Categories</p>
                  </nuxt-link>
                </li>
                <li class="nav-item" v-for="page in pages" :key="page.id" v-if="page.id > 4">
                  <nuxt-link
                    class="nav-link"
                    :to="{name: 'admin-design-page' , params: {page: page.id}}"
                  >
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>{{page.name}} Page</p>
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <nuxt-link to="/admin/roles" class="nav-link">
                <i class="nav-icon fa fa-user-md" aria-hidden="true" style="font-size: 1.4em"></i>
                <p>Roles</p>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/admin/users" class="nav-link">
                <i class="nav-icon fa fa-users" aria-hidden="true"></i>
                <p>Users</p>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>
  </div>
</template>

<script>
export default {
  name: "adminSidebar",
  data() {
    return {
      modules: [],
      pages: [],
      error: ""
    };
  },
  created: async function() {
    await this.getModules();
    await this.getPages();
  },
  computed: {
    siteUser() {
      return this.$store.state.siteUser;
    }
  },
  methods: {
    getModules() {
      this.$axios
        .$get("/api/modules")
        .then(res => {
          this.modules = res.modules;
          this.$store.commit("setModules", this.modules);
        })
        .catch(err => {
          this.error =
            "Something went wrong trying to get modules from database";
        });
    },
    getPages() {
      this.$axios
        .$get("/api/pages")
        .then(data => {
          this.pages = data.pages;
          this.$store.commit("setPages", this.pages);
        })
        .catch(err => {
          this.error =
            "something went wrong trying to get pages from the database";
        });
    }
  }
};
</script>

<style scoped>
</style>
