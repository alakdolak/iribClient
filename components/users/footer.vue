<template>
  <div>
    <footer>
      <div class="row justify-content-center">
        <div class="col-sm-3 footer_logo text-center">
          <img src="/images/footer_logo.png" alt="logo" class="img-fluid">
          <div class="footer_logo_text">
            <div class="social_icon_container">
              <div class="row justify-content-center">
                <div class="col">
                  <div class="social_icon">
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                  </div>
                </div>
                <div class="col">
                  <div class="social_icon">
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                  </div>
                </div>
                <div class="col">
                  <div class="social_icon">
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                  </div>
                </div>
                <div class="col">
                  <div class="social_icon">
                    <i class="fa fa-youtube" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
            <br>
            <br>COPYRIGHT-IRANPRESS-2018
          </div>
        </div>
        <div class="col-sm-3">
          <div class="footer_title">TOPICS</div>
          <div class="footer_item">
            <a href="#">Europe</a>
          </div>
          <div class="footer_item">
            <a href="#">World</a>
          </div>
          <div class="footer_item">
            <a href="#">Business</a>
          </div>
          <div class="footer_item">
            <a href="#">Sport</a>
          </div>
          <div class="footer_item">
            <a href="#">Culture</a>
          </div>
          <div class="footer_item">
            <a href="#">Style</a>
          </div>
          <div class="footer_item">
            <a href="#">Sci-tech</a>
          </div>
          <div class="footer_item">
            <a href="#">Travel</a>
          </div>
          <div class="footer_item">
            <a href="#">Video</a>
          </div>
          <div class="footer_item">
            <a href="#">Programs</a>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="footer_title">SERVICES</div>
          <div class="footer_item">
            <a href="#">Live</a>
          </div>
          <div class="footer_item">
            <a href="#">Bulletin</a>
          </div>
          <div class="footer_item">
            <a href="#">All Weather</a>
          </div>
          <div class="footer_item">
            <a href="#">Just In</a>
          </div>
          <div class="footer_item">
            <a href="#">Follow us</a>
          </div>
          <div class="footer_item">
            <a href="#">Widgets</a>
          </div>
          <div class="footer_item">
            <a href="#">Bulletin</a>
          </div>
          <div class="footer_item">
            <a href="#">Services</a>
          </div>
          <div class="footer_item">
            <a href="#">Euronews adio</a>
          </div>
          <div class="footer_item">
            <a href="#">African news</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "usersFooter"
};
</script>


<style scoped>
footer {
  background-color: #0f2757 !important;
  color: white;
  padding: 25px 0;
  width: 100%;
  overflow: hidden !important;
}

.footer_logo img {
  width: 100px;
  height: auto;
}

.footer_logo_text {
  width: 100%;
  height: 100px;
  color: #fff;
  margin-top: 10px;
}

.footer_title {
  width: 90%;
  margin: 0 auto;
  height: 40px;
  line-height: 40px;
  font-size: 1.6em;
  font-weight: bold;
  letter-spacing: 0.3em;
}

.footer_item {
  width: 90%;
  margin: 5px auto;
  height: 30px;
  line-height: 30px;
}

.footer_item a {
  color: #fff;
  text-decoration: none;
}

.social_icon_container {
  width: 70%;
  box-sizing: border-box;
  margin: 0 auto;
}

.social_icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  border: 2px solid #fff;
  text-align: center;
  cursor: pointer;
  font-size: 1.4em;
  margin: 0 auto;
  margin-top: 5px;
}

.social_icon:hover {
  color: #0f2757;
  background-color: #fff;
}
</style>
