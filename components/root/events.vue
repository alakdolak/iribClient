<template>
  <div>
    <div class="logo_index">
      <div class="card">
        <div class="row">
          <div class="col-sm-7">
            <div class="title">ISSUES & EVENTS</div>
            <div class="row">
              <div class="col-sm-4 card_box">
                <div class="card_box_image">
                  <img src="/placeholders/placeholder.jpg" class="img-fluid" alt="">
                </div>
                <div class="card_box_text">
                  Lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
              <div class="col-sm-4 card_box">
                <div class="card_box_image">
                  <img src="/placeholders/placeholder.jpg" class="img-fluid" alt="">
                </div>
                <div class="card_box_text">
                  Lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
              <div class="col-sm-4 card_box">
                <div class="card_box_image">
                  <img src="/placeholders/placeholder.jpg" class="img-fluid" alt="">
                </div>
                <div class="card_box_text">
                  Lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
              <div class="col-sm-4 card_box">
                <div class="card_box_image">
                  <img src="/placeholders/placeholder.jpg" class="img-fluid" alt="">
                </div>
                <div class="card_box_text">
                  Lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
              <div class="col-sm-4 card_box">
                <div class="card_box_image">
                  <img src="/placeholders/placeholder.jpg" class="img-fluid" alt="">
                </div>
                <div class="card_box_text">
                  Lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
              <div class="col-sm-4 card_box">
                <div class="card_box_image">
                  <img src="/placeholders/placeholder.jpg" class="img-fluid" alt="">
                </div>
                <div class="card_box_text">
                  Lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
            </div>

          </div>
          <div class="col-sm-5">
            <div class="title">MOST VIEWED</div>
            <div class="list">
              <div class="list_item">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </div>
              <div class="list_item">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </div>
              <div class="list_item">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </div>
              <div class="list_item">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </div>
              <div class="list_item">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </div>
              <div class="list_item">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </div>
              <div class="list_item">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </div>
              <div class="list_item">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="logo_container">
        <div class="row distance_0">
          <div class="col-md-2 col-sm-3 logo">
            <img src="/images/irib.png" alt="" class="img-fluid">
          </div>
          <div class="col-md-2 col-sm-3 logo">
            <img src="/images/irib.png" alt="" class="img-fluid">
          </div>
          <div class="col-md-2 col-sm-3 logo">
            <img src="/images/irib.png" alt="" class="img-fluid">
          </div>
          <div class="col-md-2 col-sm-3 logo">
            <img src="/images/irib.png" alt="" class="img-fluid">
          </div>
          <div class="col-md-2 col-sm-3 logo">
            <img src="/images/irib.png" alt="" class="img-fluid">
          </div>
          <div class="col-md-2 col-sm-3 logo">
            <img src="/images/irib.png" alt="" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'events'
  }
</script>

<style scoped>
  .logo_index {
    width: 100%;
    height: 300px;
    background-color: #44A490;
    position: relative;
    margin-top: 500px;
  }

  .logo_container {
    width: 1200px;
    margin: 0 auto;
    height: 150px;
    box-sizing: border-box;
    position: absolute;
    bottom: 10px;
    left: calc(50% - 600px);
  }

  .card {
    position: absolute;
    bottom: 180px;
    height: 600px;
    clear: both;
    max-width: 1150px;
    left: calc(50% - 575px);
    padding: 10px;
    box-sizing: border-box;
  }

  .card_box {
    margin-top: 10px;
  }

  .card_box_image {
    clear: both;
    text-align: center;
    height: 130px;
  }

  .card_box_text {
    clear: both;
    padding: 10px;
    overflow: hidden;
    color: #192F7B;
  }

  .logo {
    text-align: center;
  }

  .title {
    clear: both;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 1.2em;
    color: #192F7B;
    font-weight: bold;
  }

  .list {
    width: 100%;
    height: 100%;
  }

  .list_item {
    width: 100%;
    margin-top: 15px;
  }

  @media only screen and (max-width: 1000px) {
    .logo {
      display: none;
    }
  }
</style>
