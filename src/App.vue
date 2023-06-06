<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import TabItem from './components/tab/tabItem.vue'
import {tabsStore} from './store/tabsStore.js'
const router = useRouter()
const routes = router.getRoutes()
const store = tabsStore()
const setTabs = (r) => {
  store.addTab(r)
}
</script>

<template>
  <div id="container">
    <div id="sidebar">
      <router-link v-for="route in routes" 
        :key="route.path"
        :to="route.path"
        @click="setTabs(route)">
          {{ route.name }} 
      </router-link>
      
    </div>
    <div id="contents">
      <tab-item/>
      <router-view/>
    </div>
  </div>
</template>
<style scoped>
#sidebar .router-link-active {
  background-color: brown;
}
</style>

