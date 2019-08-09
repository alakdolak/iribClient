<template>
  <div class="row top_slider_row">
    <div class="col-md-9 col-sm-12 top_slider">
      <div id="carouselExampleIndicators" class="carousel slide"
           style="width: 100%; height:455px;"
           data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active distance_0 text-center ">
            <img src="/images/11.jpg"
                 class="img-fluid h-100"
                 alt="First slide">
            <div class="carousel-caption d-none d-md-block">
              <h4>News Title</h4>
              <p>description is inserted here</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/12.jpg"
                 class="img-fluid h-100"
                 alt="Second slide">
            <div class="carousel-caption d-none d-md-block">
              <h4>News Title</h4>
              <p>description is inserted here</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/13.png"
                 class="img-fluid h-100"
                 alt="Third slide">
            <div class="carousel-caption d-none d-md-block">
              <h4>Title</h4>
              <p>description is inserted here</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/14.jpg"
                 class="img-fluid h-100"
                 alt="fourth slide">
            <div class="carousel-caption d-none d-md-block">
              <h4>Title</h4>
              <p>description is inserted here</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/15.jpg"
                 class="img-fluid h-100"
                 alt="fifth slide">
            <div class="carousel-caption d-none d-md-block">
              <h4>Title</h4>
              <p>description is inserted here</p>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <div class="col-md-3 col-sm-12 distance_0 top_slider_articles">
      <div class="top_slider_box shadow-sm rounded">
        <div class="col-sm-5 article-img-div">
          <img class="article-img" src="/images/article1.jpg">
        </div>
        <div class="col-sm-7 article-header">
          <span class="english">Google’s harassment problem sparks a global walkout.</span>
        </div>
      </div>
      <div class="top_slider_box shadow-sm rounded">
        <div class="col-sm-5 article-img-div">
          <img class="article-img" src="/images/article2.jpg">
        </div>
        <div class="col-sm-7 article-header">
          <span class="english">Roger Stone’s defense in Russian investigation is that he’s a notorious liar. </span>
        </div>
      </div>
      <div class="top_slider_box shadow-sm rounded">
        <div class="col-sm-5 article-img-div">
          <img class="article-img" src="/images/article3.jpg">
        </div>
        <div class="col-sm-7 article-header">
          <span class="english">Saudi Crown Prince smeared Jamal Khashoggi in a phone  </span>
        </div>
      </div>
      <div class="top_slider_box shadow-sm rounded">
        <div class="col-sm-5 article-img-div">
          <img class="article-img" src="/images/article4.jpg">
        </div>
        <div class="col-sm-7 article-header">
          <span class="english">Bolsonaro’s victory in Brazil emboldens allies pushing </span>
        </div>
      </div>
      <div class="top_slider_box shadow-sm rounded">
        <div class="col-sm-5 article-img-div">
          <img class="article-img" src="/images/article5.jpg">
        </div>
        <div class="col-sm-7 article-header">
          <span class="english">Trump’s new midterm message is Willie Horton redux</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'news'
  }
</script>
