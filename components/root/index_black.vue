<template>
  <div class="container-fluid distance_0 mt-4">
    <div class="row justify-content-center black_section">
      <div class="col-sm-9 white">
        <div class="row">
          <div class="col-sm-9 main pl-0">
            <div class="main_image text-center">
              <img src="/placeholders/placeholder.jpg" style="height: 100%; width: 100%">
            </div>
            <div class="row distance_0 main_nav_container">
              <div class="col-sm-3 distance_0">
                <button class="btn btn-primary btn-block btn-lg" style="height: 100%; background-color: #214090 ">LIVE
                </button>
              </div>
              <div class="col-sm-3 distance_0">
                <button class="btn btn-primary btn-block btn-lg" style="height: 100%; background-color: #214090 ">
                  VIDEO
                </button>
              </div>
              <div class="col-sm-3 distance_0">
                <button class="btn btn-primary btn-block btn-lg" style="height: 100%; background-color: #214090 ">
                  PHOTO
                </button>
              </div>
              <div class="col-sm-3 distance_0">
                <button class="btn btn-primary btn-block btn-lg" style="height: 100%; background-color: #214090 ">
                  INFOGRAPHIC
                </button>
              </div>
            </div>
          </div>
          <div class="col-sm-3 p-0 side_container">
            <div class="side_box">
              <div class="image">
                <img src="/placeholders/placeholder.jpg" class="img-fluid">
              </div>
              <div class="text">
                Neque porro quisquam est qui dolorem ipsum
              </div>
            </div>
            <div class="side_box">
              <div class="image">
                <img src="/placeholders/placeholder.jpg" class="img-fluid">
              </div>
              <div class="text">
                Neque porro quisquam est qui dolorem ipsum
              </div>
            </div>
            <div class="side_box">
              <div class="image">
                <img src="/placeholders/placeholder.jpg" class="img-fluid">
              </div>
              <div class="text">
                Neque porro quisquam est qui dolorem ipsum
              </div>
            </div>
            <div class="side_box">
              <div class="image">
                <img src="/placeholders/placeholder.jpg" class="img-fluid">
              </div>
              <div class="text">
                Neque porro quisquam est qui dolorem ipsum
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'indexBlack'
  }
</script>

<style scoped>
  .black_section {
    background-color: #000;
    height: 600px;
  }

  .white {
    background-color: #fff;
    max-width: 1140px;
  }

  .side_container {
    height: 600px;
    overflow-y: scroll;
  }

  .side_box {
    width: 100%;
    margin-bottom: 10px;
  }

  .main {
    /*border: 1px solid red;*/
  }

  .image {
    height: 175px;
  }

  .text {
    color: #214090;
    font-weight: bold;
    font-size: 1.2em;
    padding: 5px;

  }

  .main_image {
    width: 100%;
    height: 500px !important;
  }

  .main_nav_container {
    height: 70px;
    margin-top: 30px !important;
    width: 100%;
    background-color: white;
    box-sizing: border-box;
    justify-content: center;
  }

  .main_nav_button {
    width: 24.7%;
    float: left;
    margin-right: 3px;
    background-color: #214090;
    color: #fff;
    text-align: center;
    height: 100px;
    line-height: 100px;
    box-sizing: border-box;
    font-size: 1.7em;
    cursor: pointer;
  }
</style>

