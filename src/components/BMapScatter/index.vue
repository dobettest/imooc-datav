<template>
  <div
    ref="chart"
    style="height: 100%;position: relative;"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted } from 'vue'
import { getMapScatter } from '@/api'
import useChart from '@/hooks/useChart';
import useBMap from '@/hooks/useBMap';
const convertData = function (data: any[], geo: any) {
  return data.map((item: any) => {
    const { name, value } = item;
    const coord = geo[name]
    return {
      name,
      value: [...coord, value],
    }
  })
}
export default defineComponent({
  name: 'BMapScatter',
  setup() {
    const ak = 'Wc62kF8LBWTNT3xOEgGOqE2diqqtPQNy';
    const scatter = ref();
    const { isReady, requestMap } = useBMap();
    const { chart, setOption } = useChart();
    const init = async () => {
      await requestMap(ak);
      scatter.value = await getMapScatter()
    }
    onMounted(init)
    const options = computed(() => {
      if (!scatter.value) {
        return;
      }
      const { data, geo } = scatter.value;
      return {
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
        },
        series: [
          {
            name: '销售额',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data, geo),
            encode: {
              value: 2,
            },
            itemStyle: {
              color: 'purple',
            },
            symbolSize: function (val: any[]) {
              return val[2] / 10
            },
            label: {
              show: false,
              position: 'right',
              formatter: function (v: any) {
                return `${v.data.name} - ${v.data.value[2]}`
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
          {
            name: 'Top 10',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(
              data.sort(function (a: any, b: any) {
                return b.value - a.value
              }),
              geo
            ).slice(0, 10),
            symbolSize: function (val: any[]) {
              return val[2] / 10
            },
            encode: {
              value: 2,
            },
            label: {
              formatter: function (v: any) {
                return `${v.data.name} - ${v.data.value[2]}`
              },
              position: 'right',
              color: 'purple',
              show: true,
            },
            hoverAnimation: true,
            rippleEffect: {
              brushType: 'stroke',
            },
            itemStyle: {
              color: 'purple',
              shadowBlur: 10,
              shadowColor: '#333',
            },
          },
        ]
      }
    })
    watch([options, isReady, chart], () => {
      if (options.value && isReady.value) {
        setOption(options.value)
      }
    })
    return { chart }
  }
})
</script>
