export default function({ $axios }) {
  $axios.get('/api/statistics/add').then(data => {

  }).catch(err => {
    console.log(err)
  })
}
