<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
html,body,#app{
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar{
  width: 0;
  background-color: red;
}
</style>
