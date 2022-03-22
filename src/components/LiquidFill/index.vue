<template>
    <div
      ref="liquid"
      style="height:100%;"
    ></div>
</template>

<script>
import 'echarts/extension/bmap/bmap'
import jsonp from '@/utils/jsonp'
import 'echarts-liquidfill'
import { mergeWith } from 'lodash-es'
export default {
  name: 'LiquidFill',
  data () {
    return {
      options: {},
      chart: null
    }
  },
  inject: ['screenData'],
  methods: {
    initOptions () {
      const chart = this.$echarts.init(this.$refs.liquid)
      const series = [
        {
          type: 'liquidFill',
          radius: '80%',
          data: [0.6],
          label: {
            formatter: (v) => {
              console.log(v)
              return `${(v.data * 100).toFixed(2)}%`
            },
            textStyle: {
              fontSize: 36,
              color: '#999',
              fontWeight: 'normal'
            },
            position: ['50%', '50%'],
            insideColor: '#fff'
          },
          outline: {
            itemStyle: {
              borderColor: '#aaa4a4',
              borderWidth: 1,
              color: 'none',
              shadowBlur: 0,
              shadowColor: '#fff'
            },
            borderDistance: 0
          },
          backgroundStyle: {
            color: '#fff'
          },
          itemStyle: {
            shadowBlur: 0,
            shadowColor: '#fff'
          },
          amplitude: 8,
          color: ['purple']
        }
      ]
      this.options = mergeWith(this.options, { series })
      chart.setOption(this.options)
      this.chart = chart
    },
    resizeHandler () {
      if (this.chart) {
        this.chart.resize()
      }
    }
  },
  async mounted () {
    await jsonp(
      'bmap',
      `http://api.map.baidu.com/getscript?v=2.0&ak=Wc62kF8LBWTNT3xOEgGOqE2diqqtPQNy&services=&t=${Date.now()}`
    )
    this.initOptions()
    window.addEventListener('resize', this.resizeHandler)
  },
  computed: {
    copyed () {
      return this.screenData()
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeHandler)
    this.chart && this.chart.dispose()
  }
}
</script>

<style>
</style>
