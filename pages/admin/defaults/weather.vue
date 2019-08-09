<template>
  <div>
    <div class="alert alert-danger text-center" v-if="error">{{error}}</div>
    <div v-else>
      <div class="row justify-content-center">
        <div class="col-sm-10">
          <div class="card">
            <div class="card-header">Setting</div>
            <div class="card-body">
              <div class="form-group">
                <label for="">Find users location with their browser geolocation service (asks for permission):</label>
                <select v-model="locationAutomatic" class="form-control" @change="updateWeather">
                  <option :value="true">Enable</option>
                  <option :value="false">Disable</option>
                </select>
              </div>
              <div class="form-group mt-4">
                <label for="">Find users location with their ip address:</label>
                <p class="text-muted">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                  if geolocation service is disabled or not permitted by user</p>
                <select v-model="ipLocationEnable" class="form-control" @change="updateWeather">
                  <option :value="true">Enable</option>
                  <option :value="false">Disable</option>
                </select>
              </div>

              <div class="form-group">
                <label for="">IP to location api:</label>
                <input type="text" class="form-control" v-model="ipLocationUrl" @change="updateWeather">
              </div>

              <div class="form-group">
                <label for="">Open weather map api key:</label>
                <input type="text" class="form-control" v-model="appKey" @change="updateWeather">
              </div>

              <div class="form-group mt-4">
                <label for="">Default location:</label>
                <p class="text-muted">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                  if all services above are disabled or failed to work
                </p>
                <input type="text" class="form-control" v-model="location" @change="updateWeather">
              </div>
              <div class="row mt-3">
                <div class="col-sm-6">
                  <label for="">Background color: </label>
                  <input type="text" class="form-control" v-model="backgroundColor" @change="updateWeather">
                  <verte
                    v-model="backgroundColor"
                    display="widget"
                    picker="square"
                    :enableAlpha="false"
                    :recentColors="false"
                    @change="updateWeather"
                    model="hex"
                    :rgbSliders="true"></verte>
                </div>
                <div class="col-sm-6">
                  <label for="">Color</label>
                  <input type="text" class="form-control" v-model="color">
                  <verte
                    v-model="color"
                    display="widget"
                    picker="square"
                    :enableAlpha="false"
                    :recentColors="false"
                    @change="updateWeather"
                    model="hex"
                    :rgbSliders="true"></verte>
                </div>
              </div>
              <div class="form-group">
                <div class="row justify-content-center">
                  <div class="col-sm-10">
                    <div class="row">
                      <div class="col-sm-6">
                        <h4>Detailed Widget</h4>
                        <weather-widget :bColor="backgroundColor" :tColor="color"></weather-widget>
                      </div>
                      <div class="col-sm-6">
                        <h4>Simple Widget</h4>
                        <weather-widget :type="1" :bColor="backgroundColor" :tColor="color"></weather-widget>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary btn-block btn-lg mt-4" @click="updateWeather">Update setting</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import verte from 'verte'
  import weatherWidget from '~/components/shared/weather'

  export default {
    name: 'weatherDefault',
    layout: 'adminPanel',
    components: { verte, weatherWidget },
    data() {
      return {
        error: '',
        backgroundColor: '',
        color: '',
        ipLocationUrl: '',
        ipLocationEnable: '',
        locationAutomatic: '',
        location: '',
        appKey: 'e031bd64382f29dbfebc7bd555d1833f'
      }
    },
    created() {
      this.$store.commit('setAdminTitle', 'Weather')
      this.getWeatherSetting()
    },
    methods: {
      getWeatherSetting() {
        this.$axios.$get('/api/weather')
          .then(data => {
            this.backgroundColor = data.weather.backgroundColor
            this.color = data.weather.color
            this.ipLocationUrl = data.weather.ipLocationUrl
            this.ipLocationEnable = data.weather.ipLocationEnable
            this.locationAutomatic = data.weather.locationAutomatic
            this.location = data.weather.location
            this.appKey = data.weather.appKey
          }).catch(err => {
          this.error = 'something went wrong trying to get data from the database'
        })
      },
      updateWeather() {
        this.$axios.post('/api/weather/update', {
          backgroundColor: this.backgroundColor,
          color: this.color,
          ipLocationUrl: this.ipLocationUrl,
          ipLocationEnable: this.ipLocationEnable,
          locationAutomatic: this.locationAutomatic,
          location: this.location,
          appKey: this.appKey
        })
          .then(data => {
            this.backgroundColor = data.data.weather.backgroundColor
            this.color = data.data.weather.color
            this.ipLocationUrl = data.data.weather.ipLocationUrl
            this.ipLocationEnable = data.data.weather.ipLocationEnable
            this.locationAutomatic = data.data.weather.locationAutomatic
            this.location = data.data.weather.location
            this.appKey = data.data.weather.appKey
          }).catch(err => {
          this.error = 'something went wrong trying to update weather setting'
        })
      }
    },
    watch: {}
  }
</script>
