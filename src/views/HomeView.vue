<template>
  <div class="home">
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script>
// @ is an alias to /src
import TopView from '@/components/TopView'
import SalesView from '@/components/SalesView'
import BottomView from '@/components/BottomView'
import MapView from '@/components/MapView'
import { screenData, wordcloud } from '@/api'
export default {
  name: 'HomeView',
  data () {
    return {
      screenData: null,
      wordCloud: null
    }
  },
  components: {
    TopView,
    SalesView,
    BottomView,
    MapView
  },
  methods: {
    getScreenData () {
      return this.screenData
    },
    getWordCLoud () {
      return this.wordCloud
    }
  },
  provide () {
    return {
      screenData: this.getScreenData,
      wordCloudData: this.getWordCLoud
    }
  },
  mounted () {
    screenData().then((data) => {
      // console.log(data)
      this.screenData = data
    })
    wordcloud().then((data) => {
      this.wordCloud = data
    })
  }
}
</script>
<style>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #eee;
  padding: 20px;
  box-sizing: border-box;
}
</style>
