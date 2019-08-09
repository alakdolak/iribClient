<template>
  <div>
    <div class="alert alert-warning text-center" v-if="error">{{error}}</div>

    <div class="row justify-content-center" v-else>
      <div class="col-sm-3">
        <div class="box_container first_box">
          <h5 class="first_color">
            <i class="fa fa-eye first_color" aria-hidden="true"></i>
            Visits today
            <span class="float-right">{{totalVisits}}</span>
          </h5>
          <line-chart
            :chart-data="chartData"
            v-if="loading"
            style="height: 150px !important;
                      margin: 15px auto;"
          ></line-chart>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="box_container first_box">
          <h5 class="first_color">
            <i class="fa fa-eye first_color" aria-hidden="true"></i>
            Visits today
            <span class="float-right">{{totalVisits}}</span>
          </h5>
          <line-chart
            :chart-data="chartData"
            v-if="loading"
            style="height: 150px !important;
                      margin: 15px auto;"
          ></line-chart>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="box_container first_box">
          <h5 class="first_color">
            <i class="fa fa-eye first_color" aria-hidden="true"></i>
            Visits today
            <span class="float-right">{{totalVisits}}</span>
          </h5>
          <line-chart
            :chart-data="chartData"
            v-if="loading"
            style="height: 150px !important;
                      margin: 15px auto;"
          ></line-chart>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="box_container first_box">
          <h5 class="first_color">
            <i class="fa fa-eye first_color" aria-hidden="true"></i>
            Visits today
            <span class="float-right">{{totalVisits}}</span>
          </h5>
          <line-chart
            :chart-data="chartData"
            v-if="loading"
            style="height: 150px !important;
                      margin: 15px auto;"
          ></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import lineChart from "~/components/charts/lineBoundaries";

export default {
  name: "statisticBox",
  components: { lineChart },
  data() {
    return {
      error: "Nothing here yet",
      loading: false,
      duration: 600,
      totalVisits: 0,
      statistics: [],
      chartData: {}
    };
  },
  created() {
    this.getStatistics();
  },
  methods: {
    getStatistics() {
      this.chartData = {
        labels: [],
        datasets: [
          {
            backgroundColor: "blue",
            borderColor: "lightblue",
            fill: false,
            data: this.statistics
          }
        ]
      };
      this.$axios
        .$get("/api/statistics")
        .then(data => {
          this.totalVisits = data.totalVisits;
          for (let i = 0; i < data.statistics.length; i++) {
            this.chartData.labels.push(data.statistics[i].currentDate);
            this.chartData.datasets[0].data.push(
              data.statistics[i].totalVisits
            );
            if (i === data.statistics.length - 1) this.loading = true;
          }
        })
        .catch(err => {
          this.error =
            "something went wrong trying to get data from the database";
        });
    },
    format(value) {
      return `${value.toFixed(0)}`;
    }
  }
};
</script>

<style scoped>
.box_container {
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  border: 1px solid lightgrey;
  padding: 15px;
}

.icon_container {
  float: left;
  height: 100%;
  width: 30%;
  box-sizing: border-box;
  line-height: 90px;
  font-size: 2em;
  border: 1px solid red;
  text-align: center;
}

.number {
  padding-left: 10px;
  font-size: 1.3em;
}

.first_color {
  color: blue;
}
</style>
