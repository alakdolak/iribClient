<template>
  <div class="row tehran_slide_show_row">
    <div id="tehran_slide" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#tehran_slide" data-slide-to="0" class="active"></li>
        <li data-target="#tehran_slide" data-slide-to="1"></li>
        <li data-target="#tehran_slide" data-slide-to="2"></li>
        <li data-target="#tehran_slide" data-slide-to="3"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="img-fluid img-thumbnail" src="/images/22.jpg"
               alt="First slide">
          <div class="carousel-caption d-none d-md-block">
            <h4>Tehran Title</h4>
            <p>description is here</p>
          </div>
        </div>
        <div class="carousel-item">
          <img class="img-fluid " src="/images/23.jpg"
               alt="First slide">
          <div class="carousel-caption d-none d-md-block">
            <h4>Tehran Title</h4>
            <p>description is here</p>
          </div>
        </div>
        <div class="carousel-item">
          <img class="img-fluid " src="/images/24.jpg"
               alt="First slide">
          <div class="carousel-caption d-none d-md-block">
            <h4>Tehran Title</h4>
            <p>description is here</p>
          </div>
        </div>
        <div class="carousel-item">
          <img class="img-fluid " src="/images/25.jpeg"
               alt="First slide">
          <div class="carousel-caption d-none d-md-block">
            <h4>Tehran Title</h4>
            <p>description is here</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#tehran_slide" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#tehran_slide" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tehran'
  }
</script>
