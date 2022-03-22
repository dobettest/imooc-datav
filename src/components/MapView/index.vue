<template>
  <div class="map-view">
    <div class="left-wrapper">
      <b-map-scatter></b-map-scatter>
    </div>
    <div class="right-wrapper">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title">用户月同比增长</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <liquid-fill></liquid-fill>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import BMapScatter from '@/components/BMapScatter'
import LiquidFill from '@/components/LiquidFill'
export default {
  name: 'MapView',
  components: {
    BMapScatter,
    LiquidFill
  }
}
</script>

<style lang="scss" scoped>
.map-view {
  display: flex;
  height: 600px;
  margin-top: 20px;
  .left-wrapper {
    flex: 0 0 80%;
  }
  .right-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    .title {
      display: flex;
      align-items: center;
      height: 60px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      font-weight: 500;
      padding: 0 0 0 20px;
    }
    .chart-wrapper {
      width: 100%;
      height: 190px;
    }
  }
}
</style>
