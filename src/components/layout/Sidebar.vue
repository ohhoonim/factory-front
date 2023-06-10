<script setup>
import { RouterLink, useRouter } from "vue-router";
import { tabsStore } from "../../store/tabsStore.js";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const router = useRouter();
const routes = router.getRoutes();
const store = tabsStore();
const setTabs = (r) => {
  store.addTab(r);
};
</script>
<template>
  <div id="sidebar">
    <div class="contexts">
      <select v-model="locale">
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
    </div>
    <div class="menus">
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        @click="setTabs(route)"
      >
        {{ t(route.name) }}
      </router-link>
    </div>
  </div>
</template>
<style>
.contexts {
    margin-bottom: 20px;
}
</style>