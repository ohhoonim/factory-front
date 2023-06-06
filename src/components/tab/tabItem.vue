<template>
  <div class="tabs">
    <router-link v-for="tab in tabs" 
        :key="tab.path"
        :to="tab.path">{{ tab.name }}</router-link>
  </div>
</template>
<script setup>
import { tabsStore }  from '../../store/tabsStore';

const store = tabsStore()
const tabs = store.getTabs;
</script>

<style scoped>
    .tabs a {
        border: 1px solid red;
        margin-right: 5px;
    }
    .tabs .router-link-active {
        background-color: aqua;
    }
</style>
