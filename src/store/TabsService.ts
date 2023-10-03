import { ref, Ref, computed } from "vue"
import { defineStore } from "pinia"

type WorkingTabs = {
   name: string,
   path: string,
   meta?: object,
}

export const useTabsStore = defineStore('tabs', () => {
   const tabs: Ref<WorkingTabs[]> = ref([
      { name: "home", path: "/" },
   ])

   const workingTabs = computed(() => tabs)

   function addTab(tab: WorkingTabs) {
      const hasTab = tabs.value.find(v => v.path === tab.path)
      if (!hasTab) {
         tabs.value.push(tab)
      }
   }

   return { tabs, workingTabs, addTab } 
})
