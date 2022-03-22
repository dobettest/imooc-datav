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
import { screenData } from '@/api'
export default {
  name: 'HomeView',
  data () {
    return {
      screenData: null
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
    }
  },
  provide () {
    return {
      screenData: this.getScreenData
    }
  },
  mounted () {
    screenData().then((data) => {
      // console.log(data)
      this.screenData = data
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
