<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    labels: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: [{
        data: this.data,
        borderColor: '#3e95cd',
        fill: false,
        label: 'Articulos esta semana'
      }
      ]
    }
    )
  }
}
</script>
