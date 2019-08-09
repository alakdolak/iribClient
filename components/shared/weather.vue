<template>
  <div>
    <div
      class="weather_container"
      :style="{'background-color': backgroundColor, 'color': color}"
      v-if="(!type || type === 0) && currentTemp"
    >
      <h5 class="pl-3">{{name}}</h5>
      <div class="weather_row">
        <div class="weather_icon">
          <img :src="icon" class="img-fluid" alt="weatherIcon" :style="{'fill': color}">
        </div>
        <div class="weather_forecast">
          {{overcast}}
          <br>
          {{currentTemp}}&#176;
        </div>
        <div class="weather_min">
          Max: {{maxTemp}}&#176;
          <br>
          Min: {{minTemp}}&#176;
        </div>
      </div>
      <div class="weather_info">
        <img class="icon" src="/weather/sunset.svg" :style="{'fill': color}">
        {{sunset}}
        <img class="icon" src="/weather/humidity.svg" :style="{'path': color}">
        {{humidity}}
        <img class="icon" src="/weather/pressure.svg" :style="{'fill': color}">
        {{pressure}}
        <img class="icon" src="/weather/wind.svg" :style="{'fill': color}">
        {{wind}}
      </div>
    </div>
    <div
      class="weather_container_small"
      :style="{'background-color': backgroundColor, 'color': color}"
      v-else-if="type === 1 && currentTemp"
    >
      <div class="weather_small_name">
        <h4>{{name}}</h4>
      </div>
      <div class="weather_small_icon">
        <img :src="icon" alt="weatherIcon" style="margin-top: -44px" :style="{'fill': color}">
      </div>
      <div class="weather_small_temp">
        <h4>{{currentTemp}}&#176;</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "weatherWidget",
  props: ["type", "bColor", "tColor"],
  data() {
    return {
      error: "",
      lat: "",
      lon: "",
      currentTemp: "",
      minTemp: "",
      maxTemp: "",
      sunrise: "",
      sunset: "",
      pressure: "",
      humidity: "",
      wind: "",
      overcast: "",
      icon: "",
      name: "",
      backgroundColor: "",
      color: "",
      ipLocationUrl: "",
      ipLocationEnable: "",
      locationAutomatic: "",
      location: "",
      appKey: "",
      api: "http://api.openweathermap.org/data/2.5/weather?units=metric",
      show: false
    };
  },
  created() {
    this.getWeatherSetting();
  },
  methods: {
    backgroundColorStyle: function() {
      return {
        "background-color": "#0c0c0c"
      };
    },
    getWeatherSetting() {
      this.currentTemp = null;
      this.$axios
        .$get("/api/weather")
        .then(data => {
          this.backgroundColor = data.weather.backgroundColor;
          this.color = data.weather.color;
          this.ipLocationUrl = data.weather.ipLocationUrl;
          this.ipLocationEnable = data.weather.ipLocationEnable;
          this.locationAutomatic = data.weather.locationAutomatic;
          this.location = data.weather.location;
          this.appKey = data.weather.appKey;
          this.getWeather();
        })
        .catch(err => {
          this.error =
            "something went wrong trying to get data from the database";
          this.show = false;
        });
    },
    getWeather() {
      let self = this;
      if (self.locationAutomatic) {
        self.getByGeolocation(function(geoStatus) {
          if (!geoStatus) {
            if (self.ipLocationEnable) {
              self.getByIp(function(ipStatus) {
                if (!ipStatus) self.getByCountry();
              });
            } else {
              self.getByCountry(function(status) {});
            }
          }
        });
      } else {
        if (self.ipLocationEnable) {
          self.getByIp(function(ipStatus) {
            if (!ipStatus) self.getByCountry(function(status) {});
          });
        } else {
          self.getByCountry(function(status) {});
        }
      }
    },
    getByIp(callback) {
      const KEY = "&APPID=" + this.appKey;
      this.$axios
        .$get(this.ipLocationUrl)
        .then(data => {
          this.lat = data.latitude;
          this.lon = data.longitude;
          this.name = data.city;
          let url = this.api + "&lat=" + this.lat + "&lon=" + this.lon + KEY;
          this.callApi(url, function(status) {
            callback(status);
          });
        })
        .catch(err => {
          console.log(err);
          this.error = "something went wrong trying to get your location";
          callback(false);
        });
    },
    getByGeolocation(callback) {
      this.name = "";
      const self = this;
      const KEY = "&APPID=" + this.appKey;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            self.lat = position.coords.latitude;
            self.lon = position.coords.longitude;
            // self.name = data.city + ',' + data.country
            let url = self.api + "&lat=" + self.lat + "&lon=" + self.lon + KEY;
            self.callApi(url, function(status) {
              callback(status);
            });
            callback(true);
          },
          function(err) {
            callback(false);
          }
        );
      } else {
        callback(false);
      }
    },
    getByCountry() {
      let city = "&q=" + this.location;
      const KEY = "&APPID=" + this.appKey;
      let url = this.api + city + KEY;
      this.name = this.location;
      this.callApi(url, function(status) {
        if (status) {
        } else {
          this.error = "couldn't get the data";
        }
      });
    },
    callApi(url, callback) {
      this.$axios
        .get(url)
        .then(response => {
          this.currentTemp = response.data.main.temp;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + "%";
          this.wind = response.data.wind.speed + "m/s";
          this.overcast = response.data.weather[0].description;
          this.icon =
            "/weather/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
          this.sunrise = new Date(response.data.sys.sunrise * 1000)
            .toLocaleTimeString("en-GB")
            .slice(0, 4);
          this.sunset = new Date(response.data.sys.sunset * 1000)
            .toLocaleTimeString("en-GB")
            .slice(0, 4);
          if (!this.name) this.name = response.data.name;
          callback(true);
        })
        .catch(err => {
          console.log(err);
          this.error = "something went wrong trying to get data from api";
          this.show = false;
          callback(false);
        });
    }
  },
  watch: {
    bColor: function(newVal) {
      this.backgroundColor = newVal;
    },
    tColor: function(newVal) {
      this.color = newVal;
    },
    currentTemp: function(newVal) {
      if (newVal) this.show = true;
      else this.show = false;
    }
  }
};
</script>


<style scoped>
.weather_container {
  width: 100%;
  max-width: 400px;
  padding: 15px;
  padding-left: 0;
  /*margin: 0 auto;*/
}

.weather_container_small {
  width: 100%;
  max-width: 400px;
  padding: 15px 10px 10px 10px;
  min-height: 60px;
  line-height: 65px;
  text-align: center;
  margin: 0 auto;
}

.weather_small_name {
  height: 100%;
  width: 50%;
  float: left;
  word-wrap: break-word;
  padding: 1px;
}

.weather_small_icon {
  height: 100%;
  width: 25%;
  float: left;
}

.weather_small_temp {
  height: 100%;
  width: 25%;
  float: left;
}

.weather_row {
  width: 100%;
  height: 70px;
}

.weather_icon {
  width: 80px;
  text-align: center;
  float: left;
}

.weather_forecast {
  float: left;
  font-size: 1.2em;
  padding: 5px 10px;
}

.weather_info {
  width: 100%;
  min-height: 30px;
  justify-content: center;
}

.icon {
  margin-left: 10px;
}

.weather_min {
  float: right;
  height: 100%;
  padding: 10px;
}
</style>
