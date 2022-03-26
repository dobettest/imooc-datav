<template>
  <div
    ref="chartDom"
    style="height:100%"
  ></div>
</template>

<script>
import 'echarts-wordcloud'
import chartMixin from '@/mixins/chartMixin'
export default {
  name: 'WordCloud',
  data () {
    return {
      chart: null
    }
  },
  mixins: [chartMixin],
  inject: ['wordCloudData'],
  computed: {
    wordcloud () {
      return this.wordCloudData()
    },
    options () {
      const { wordcloud } = this
      const data = Array.isArray(wordcloud)
        ? wordcloud.map((item) => {
          return { name: item.word, value: item.count }
        })
        : []
      return {
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
    }
  },
  watch: {
    options (nl, ol) {
      this.chart.setOption(nl)
    }
  },
  methods: {
    initOptions () {
      const chart = this.$echarts.init(this.$refs.chartDom)
      this.chart = chart
    }
  },
  mounted () {
    this.initOptions()
  }
}
</script>

<style>
</style>
