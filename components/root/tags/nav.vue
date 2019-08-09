<template>
  <div class="nav_container">
    <div class="letter" v-for="letter in letters">{{letter | capitalize}}</div>
  </div>
</template>


<script>
  export default {
    name: 'tagsNav',
    props: ['letters'],
    methods: {},
    filters: {
      capitalize: function(value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
</script>

<style scoped>
  .nav_container {
    border: 1px solid black;
    height: 100px;
    width: 40px;
    position: absolute;
    left: 5px;
    top: 10px;
  }

  .letter {
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border: 1px solid red;
    font-size: 1.1em;
  }
</style>
