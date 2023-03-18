<template>
  <div class="home">
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent, provide, ref } from 'vue';
import TopView from '@/components/TopView/index.vue';
import SalesView from '@/components/SalesView/index.vue';
import BottomView from '@/components/BottomView/index.vue';
import MapView from '@/components/MapView/index.vue';
import { getScreenData, getWordcloud } from '@/api';
import useCancelRequest from '@/hooks/useCancelRequest';
export default defineComponent({
  name: 'HomeView',
  components: {
    TopView,
    SalesView,
    BottomView,
    MapView,
  },
  setup() {
    const screenData = ref(null);
    const wordCloud = ref([]);
    provide('wordCloudData', wordCloud);
    provide('screenData', screenData);
    const { request: requestScreenData } = useCancelRequest();
    requestScreenData(getScreenData)?.then((data: any) => {
      screenData.value = data;
    });
    getWordcloud().then((data: any) => {
      wordCloud.value = data;
    });
  },
});
</script>

<style>
.home {
  height: 100%;
  overflow: auto;
  background-color: #eee;
  padding: 20px;
  box-sizing: border-box;
}
</style>
