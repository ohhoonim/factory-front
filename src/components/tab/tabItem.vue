<template>
  <div class="tabs">
    <router-link v-for="tab in tabs" 
        :key="tab.path"
        :to="tab.path">{{ t(tab.name) }}</router-link>
  </div>
</template>
<script setup>
import { tabsStore }  from '../../store/tabsStore';
import { useI18n } from "vue-i18n";
const { t } = useI18n();
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
