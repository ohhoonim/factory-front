import {ref} from "vue"

const tabsList = ref([
    {name: "home", path: "/"},
])

const tabsStore  = {
   addTab : (tab) => {
    let hasTab = tabsList.value.find(v => v.path === tab.path) 
    if (!hasTab) {
       tabsList.value.push(tab) 
    }
   },
   getTabs : () => {
    return tabsList.value
   } 
}

export default tabsStore;