<template>
  <div
    ref="bmap"
    style="height:100%;position:relative;"
  ></div>
</template>

<script>
import 'echarts/extension/bmap/bmap'
import jsonp from '@/utils/jsonp'
import { mergeWith } from 'lodash-es'
import { mapScatter } from '@/api'
const convertData = function (data, geo) {
  const res = []
  data.forEach((item) => {
    const { name, value } = item
    const coord = geo[name]
    res.push({
      name,
      value: [...coord, value]
    })
  })
  return res
}
export default {
  name: 'BMapScatter',
  data () {
    return {
      options: {
        title: {
          text: '慕课外卖销售数据大盘',
          subtext: '销售趋势统计',
          sublink: 'https://www.imooc.com',
          left: 'center'
        },
        bmap: {
          key: 'Wc62kF8LBWTNT3xOEgGOqE2diqqtPQNy',
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: false,
          mapStyle: {
            styleJson: [
              {
                featureType: 'water',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'land',
                elementType: 'all',
                stylers: {
                  color: '#f3f3f3'
                }
              },
              {
                featureType: 'railway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'highway',
                elementType: 'all',
                stylers: {
                  color: '#fdfdfd'
                }
              },
              {
                featureType: 'highway',
                elementType: 'labels',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'poi',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'green',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'subway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'manmade',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'local',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'labels',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'boundary',
                elementType: 'all',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'building',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'label',
                elementType: 'labels.text.fill',
                stylers: {
                  color: '#999999'
                }
              }
            ]
          }
        }
      },
      chart: null
    }
  },
  methods: {
    initOptions () {
      mapScatter().then((scatter) => {
        const { data, geo } = scatter
        const series = [
          {
            name: '销售额',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data, geo),
            encode: {
              value: 2
            },
            itemStyle: {
              color: 'purple'
            },
            symbolSize: function (val) {
              return val[2] / 10
            },
            label: {
              show: false,
              position: 'right',
              formatter: function (v) {
                return `${v.data.name} - ${v.data.value[2]}`
              }
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          {
            name: 'Top 10',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(
              data.sort(function (a, b) {
                return b.value - a.value
              }),
              geo
            ).slice(0, 10),
            symbolSize: function (val) {
              return val[2] / 10
            },
            encode: {
              value: 2
            },
            label: {
              formatter: function (v) {
                return `${v.data.name} - ${v.data.value[2]}`
              },
              position: 'right',
              color: 'purple',
              show: true
            },
            hoverAnimation: true,
            rippleEffect: {
              brushType: 'stroke'
            },
            itemStyle: {
              color: 'purple',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          }
        ]
        this.options = mergeWith(this.options, { series })
        const chart = this.$echarts.init(this.$refs.bmap)
        console.log(this.options)
        chart.setOption(this.options)
        this.chart = chart
      })
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
  destroyed () {
    window.removeEventListener('resize', this.resizeHandler)
    this.chart && this.chart.dispose()
  }
}
</script>

<style>
</style>
