<template>
  <div class="map-view">
    <div class="left-wrapper">
      <b-map-scatter />
    </div>
    <div class="right-wrapper">
      <el-card shadow="hover">
        <template #header>
          <div class="title">
            用户月同比增长
          </div>
        </template>
        <div class="chart-wrapper">
          <liquid-fill />
        </div>
      </el-card>
      <el-card shadow="hover">
        <template #header>
          <div class="title">
            热门搜索
          </div>
        </template>
        <div class="chart-wrapper">
          <word-cloud />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BMapScatter from '@/components/BMapScatter/index.vue';
import LiquidFill from '@/components/LiquidFill/index.vue';
import WordCloud from '@/components/WordCloud/index.vue';
export default defineComponent({
  name: 'MapView',
  components: {
    BMapScatter,
    LiquidFill,
    WordCloud,
  },
});
</script>

<style lang="scss" scoped>
.map-view {
  display: flex;
  height: 600px;
  margin-top: 20px;

  .left-wrapper {
    flex: 0 1 80%;
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
