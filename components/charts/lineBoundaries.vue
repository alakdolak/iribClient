<script>
  import { Line, mixins } from 'vue-chartjs'

  export default {
    extends: Line,
    props: ['chartData'],
    mixins: [mixins.reactiveProp],
    data() {
      return {
        chartOptions: {
          maintainAspectRatio: false,
          animationSteps: 1,
          fill: false,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                display: false
              }
            }],
            yAxes: [{
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                display: false
              }
            }]
          }
        }
      }
    },
    mounted() {
      this.renderChart(this.chartData, this.chartOptions)
      // this._chart.update();
    }
  }
</script>
