<template>
  <div>
    <vue-plyr ref="plyr">
      <video playsinline controls autoplay="autoplay" :id="'video' + columnModule.id"></video>
    </vue-plyr>
  </div>
</template>

<script>
export default {
  name: "live",
  props: ["columnModule"],
  data() {
    return {
      live: null
    };
  },
  computed: {
    player() {
      return this.$refs.plyr.player;
    }
  },
  created() {
    this.getLive();
  },
  methods: {
    getLive() {
      if (this.columnModule) {
        this.$axios
          .post("/api/lives/main", { id: this.columnModule.defaultId })
          .then(data => {
            this.live = data.data.live;
            this.preview();
          })
          .catch(err => {
            console.log(err);
            this.error = "someting went wrong trying to get data";
          });
      }
    },
    preview(liveId, index) {
      const source = this.live.url;
      let id = this.live.id;
      let type = this.live.url.substring(this.live.url.lastIndexOf(".") + 1);
      const video = document.querySelector("#video" + this.columnModule.id);
      // const video2 = document.querySelector("#video" + this.columnModule.id);
      if (type === "m3u8") {
        if (!Hls.isSupported()) {
          video.src = source;
        } else {
          const hls = new Hls();
          hls.loadSource(source);
          hls.attachMedia(video);
          window.hls = hls;
        }
      } else if (type === "mpd") {
        const dash = dashjs.MediaPlayer().create();
        dash.getDebug().setLogToBrowserConsole(false);
        dash.initialize(video, source, true);
        window.dash = dash;
      }
    }
  },
  watch: {
    live: function(newVal) {
      // if (newVal) this.preview();
    }
  }
};
</script>

