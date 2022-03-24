<template>
  <div
    ref="chartDom"
    style="height:100%"
  ></div>
</template>

<script>
import 'echarts-wordcloud'
import { wordcloud } from '@/api'
export default {
  name: 'WordCloud',
  data () {
    return {
      chart: null,
      options: {}
    }
  },
  methods: {
    initOptions () {
      wordcloud().then((data) => {
        console.log('data', data)
        data = Array.isArray(data)
          ? data.map((item) => {
            return { name: item.word, value: item.count }
          })
          : []
        const chart = this.$echarts.init(this.$refs.chartDom)
        const options = {
          tooltip: {},
          series: [
            {
              type: 'wordCloud',
              shape: 'circle',
              textStyle: {
                color: function () {
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(',') +
                    ')'
                  )
                }
              },
              emphasis: {
                textStyle: {
                  shadowBlur: 10,
                  shadowColor: '#333'
                }
              },
              data
            }
          ]
        }
        chart.setOption(options)
        this.chart = chart
        this.options = options
      })
    }
  },
  mounted () {
    this.initOptions()
  }
}
</script>

<style>
</style>
