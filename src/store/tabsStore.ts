import { ref, computed } from "vue"

import { defineStore } from "pinia"

export const tabsStore = defineStore('tabsStore', () => {
   const tabsList = ref([
      { name: "home", path: "/" },
   ])
   const getTabs = computed(() => tabsList)

   function addTab(tab: { name: string; path: string }) {
      const hasTab = tabsList.value.find(v => v.path === tab.path)
      if (!hasTab) {
         tabsList.value.push(tab)
      }
   }

   return { tabsList, getTabs, addTab } 
})
