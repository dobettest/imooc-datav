<template>
  <v-chart :option="options"></v-chart>
</template>

<script>
import 'echarts/extension/bmap/bmap'
import jsonp from '@/utils/jsonp'
export default {
  name: 'BMapView',
  data () {
    return {
      options: {}
    }
  },
  methods: {
    initOptions () {
      this.options = {
        bmap: {
          key: 'Wc62kF8LBWTNT3xOEgGOqE2diqqtPQNy',
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: false
        }
      }
      console.log('aaa')
    }
  },
  async mounted () {
    await jsonp(
      'bmap',
      `http://api.map.baidu.com/getscript?v=2.0&ak=Wc62kF8LBWTNT3xOEgGOqE2diqqtPQNy&services=&t=${Date.now()}`,
      this.initOptions.bind(this)
    )
  }
}
</script>
