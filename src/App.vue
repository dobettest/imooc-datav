<template>
  <div id="app">
    <home-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import HomeView from './views/HomeView.vue';
export default defineComponent({
  name: 'App',
  components: { HomeView }
})
</script>
<style lang="scss">
html,body{
  height: 100%;
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar{
  width: 0;
}
</style>
