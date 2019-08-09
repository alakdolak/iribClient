<template>
  <div>
    <main-header></main-header>
    <no-ssr>
      <nuxt />
    </no-ssr>
    <main-footer class="mt-5"></main-footer>
  </div>
</template>

<script>
import mainHeader from "~/components/root/header";
import mainFooter from "~/components/root/footer";

export default {
  components: {
    mainHeader,
    mainFooter
  },
  middleware: "statistic",
  head() {
    return {
      script: [
        { src: "/plugins/jquery/jquery.min.js" },
        { src: "/plugins/bootstrap/js/bootstrap.bundle.min.js" },
        { src: "/menu/menu.js" },
        { src: "https://cdn.jsdelivr.net/npm/hls.js@latest" },
        { src: "https://cdn.plyr.io/3.5.2/plyr.js" },
        { src: "http://cdn.dashjs.org/latest/dash.all.min.js" }
      ],
      link: [
        {
          rel: "stylesheet",
          href: "/plugins/font-awesome/css/font-awesome.min.css"
        },
        {
          rel: "stylesheet",
          href: "/menu/menu.css"
        }
      ]
    };
  }
};
</script>
