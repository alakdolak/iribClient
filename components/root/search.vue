<template>
 <div class="row search_bar_row">
  <div class="col-md-8 breaking_news_container">
     <!--<div class="breaking_news_title ">-->
      <!--Breaking-->
      <!--<br>-->
      <!--News-->
     <!--</div>-->
     <!--<div class="breaking_news_description">-->
      <!--<h5 class="tlt">-->
       <!--<ul class="texts">-->
        <!--<li>first news first news first news first news first news first ...</li>-->
        <!--<li>second news</li>-->
        <!--<li>third news</li>-->
       <!--</ul>-->
      <!--</h5>-->
     <!--</div>-->
  </div>
  <div class="col-md-4 pt-2 mb-4">
   <div class="input-group mb-3">
    <div class="input-group-prepend">
     <button class="btn btn-outline-secondary dropdown-toggle search_dropdown" type="button"
             data-toggle="dropdown"
             id="search_dropdown_button"
             aria-haspopup="true" aria-expanded="false">All
     </button>
     <div class="dropdown-menu">
      <a class="dropdown-item" href="#">All</a>
      <a class="dropdown-item" href="#">Tags</a>
      <a class="dropdown-item" href="#">Categories</a>
      <a class="dropdown-item" href="#">Movies</a>
      <a class="dropdown-item" href="#">Archives</a>
     </div>
    </div>
    <input type="text" class="form-control" placeholder="Search">
    <div class="input-group-btn">
     <button class="btn btn-default" type="submit">
      <i class="fa fa-search" aria-hidden="true"></i>
     </button>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
  export default {
    name: 'search'
  }
</script>
