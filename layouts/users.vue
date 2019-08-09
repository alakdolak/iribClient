<template>
  <div>
    <main-header></main-header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3">
          <users-sidebar></users-sidebar>
        </div>
        <div class="col-sm-9">
          <no-ssr>
            <nuxt />
          </no-ssr>
        </div>
      </div>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
import mainHeader from "~/components/root/header";
import mainFooter from "~/components/root/footer";
import usersSidebar from "~/components/users/sidebar";

export default {
  name: "users",
  components: {
    mainHeader,
    mainFooter,
    usersSidebar
  },
  head() {
    return {
      script: [
        { src: "/plugins/jquery/jquery.min.js" },
        { src: "/plugins/bootstrap/js/bootstrap.bundle.min.js" },
        { src: "/menu/menu.js" }
      ],
      link: [
        {
          rel: "stylesheet",
          href: "/plugins/font-awesome/css/font-awesome.min.css"
        },
        { rel: "stylesheet", href: "/menu/menu.css" }
      ]
    };
  }
};
</script>
