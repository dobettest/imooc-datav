export default {
  data () {
    return {
      chart: null
    }
  },
  methods: {
    resizeHandler () {
      if (this.chart) {
        this.chart.resize()
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeHandler)
    this.chart && this.chart.dispose()
  }
}
