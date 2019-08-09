const pkg = require("./package");

module.exports = {
  mode: "universal",
  loading: false,

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "/styles/style.css" }
    ]
  },
  server: {
    port: 3000 // default: 3000
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["vue-plyr/dist/vue-plyr.css", "verte/dist/verte.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/vue-notification", ssr: false },
    { src: "~/plugins/vue-plyr", ssr: true },
    { src: "~/plugins/SocialSharing", ssr: true },
    { src: "~/plugins/switch", ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "bootstrap-vue/nuxt", "vue-sweetalert2/nuxt"],

  axios: {
	//   baseUrl: "http://192.168.200.33/",
     // browserBaseURL: "http://192.168.200.33/",
    baseUrl: "http://localhost:3000/",
    browserBaseURL: "http://localhost:3000/",
    https: false,
    retry: { retries: 3 },
    credentials: true
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
