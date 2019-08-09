<template>
  <div>
    <div
      class="breakingContainer"
      :style="{borderColor: design.backgroundColor}"
      v-if="text && design"
    >
      <div class="breaking_header" :style="{backgroundColor: design.backgroundColor}">Breaking News</div>
      <div class="breaking_text">
        <transition name="fade" mode="out-in">
          <span class="text" :key="index" :style="{color: design.textColor}">{{text}}</span>
        </transition>
      </div>
    </div>
    <div v-else-if="text" class="breakingContainer" :style="{borderColor: backgroundColor}">
      <div class="breaking_header" :style="{backgroundColor: backgroundColor}">Breaking News</div>
      <div class="breaking_text">
        <transition name="fade" mode="out-in">
          <span class="text" :key="index" :style="{color: textColor}">{{text}}</span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "breakingNews",
  props: ["texts", "design"],
  data() {
    return {
      index: 0,
      getNext: null,
      interval: 4000,
      backgroundColor: "#dc3545",
      textColor: "#000000"
    };
  },
  created() {
    this.getNextPolling();
  },
  beforeDestroy() {
    clearInterval(this.getNext);
  },
  methods: {
    getNextPolling() {
      let length = this.texts.length;
      let self = this;
      self.getNext = setInterval(() => {
        if (self.index >= length - 1) self.index = 0;
        else self.index++;
      }, this.interval);
    },
    getDesign() {
      this.$axios
        .$get("/api/breaking")
        .then(data => {
          this.interval = data.breakingDesign.interval;
          this.backgroundColor = data.breakingDesign.backgroundColor;
          this.textColor = data.breakingDesign.textColor;
        })
        .catch(err => {
          console.log(err);
          console.log(
            "something went wrong trying to get data from the database"
          );
        });
    }
  },
  computed: {
    text: function() {
      return this.texts[this.index];
    }
  }
};
</script>


<style scoped>
.fade-leave-active {
  transition: opacity 1s ease-in;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
}

.breakingContainer {
  height: 50px;
  line-height: 50px;
  width: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-sizing: content-box;
  border-style: solid;
}

.breaking_header {
  height: 100%;
  width: 200px;
  float: left;
  text-align: center;
  color: white;
  font-size: 1.4em;
  box-sizing: border-box;
  font-weight: bold;
}

.breaking_text {
  width: calc(100% - 250px);
  float: left;
  padding: 0 10px;
  text-align: center;
  font-size: 1.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>


