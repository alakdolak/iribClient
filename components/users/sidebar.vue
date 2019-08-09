<template>
  <div class="sidebar_container">
    <!-- <div class="sidebar_header"></div> -->
    <div class="sidebar_body">
      <a href="#" class="sidebar_item">Liked Videos</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "usersSidebar"
};
</script>
<style scoped>
.sidebar_header {
  height: 100px;
  width: 100%;
  border: 1px solid red;
}
.sidebar_body {
  margin-top: 20px;
  border: 1px solid black;
}

.sidebar_container {
  width: 100%;
  height: 100vh;
  border: 1px solid blue;
}

.sidebar_item {
  height: 40px;
  line-height: 40px;
  text-align: center;
  box-sizing: border-box;
  padding: 10px;
}

.sidebar_active {
}
</style>
