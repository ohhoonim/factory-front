<script setup>
import TabItem from "./components/tab/tabItem.vue";
import Sidebar from "./components/layout/Sidebar.vue";
</script>

<template>
  <div id="container">
    <Sidebar/> 
    <div id="contents">
      <tab-item />
      <router-view />
    </div>
  </div>
</template>
<style scoped>
#sidebar .router-link-active {
  background-color: brown;
}
</style>
