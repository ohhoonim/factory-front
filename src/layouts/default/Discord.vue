<script lang="ts" setup>
import {ref } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/store/AuthService'
import { useTheme } from 'vuetify'
const routes: RouteRecordRaw[] = useRouter().getRoutes().filter(r => r.name === 'default')[0]?.children
const { t, locale } = useI18n()
const theme = useTheme()
const languages = [
  { title: '한국어', value: 'ko' },
  { title: 'English', value: 'en' },
]
const auth = useAuthStore()
const logout = () => {
  auth.logout()
}
const drawer = ref(false)
</script>
<template>
  <v-app>
    <v-navigation-drawer rail>
      <v-avatar class="d-block text-center mx-auto mt-4" color="grey-darken-1" size="36"></v-avatar>

      <v-divider class="mx-3 my-5"></v-divider>

      <v-avatar v-for="n in 6" :key="n" class="d-block text-center mx-auto mb-9" color="grey-lighten-1"
        size="28"></v-avatar>
    </v-navigation-drawer>

    <v-navigation-drawer width="220">
      <v-list>
        <v-list-item v-for="route in routes" :key="route.name" :to="route" density="compact"
          :title="t(route.name?.toString() ?? '')">
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider class="mx-3 my-5"></v-divider>
        <v-sheet class="flex-1-0-auto d-flex flex-column justify-center align-center mt-5">
          <v-btn @click="logout" variant="outlined">{{ t('logout') }}</v-btn>
          <div class="d-flex justify-space-between pl-5 mt-5 w-100">
            <v-select :label="t('language')" :items="languages" density="compact" v-model="locale"
              variant="underlined"></v-select>
            <v-spacer></v-spacer>
            <v-switch v-model="theme.global.name.value" true-value="light" false-value="dark">{{ t('theme') }}</v-switch>
          </div>
        </v-sheet>
      </template>
    </v-navigation-drawer>

    <v-app-bar>
      <!-- 열린 메뉴 탭 영역 -->
      <div class="d-flex ga-1 mb-0 h-100 align-end">
        <v-btn variant="flat" class="rounded-b" color="primary">열린메뉴1</v-btn>
        <v-btn variant="outlined" class="rounded-b ">열린메뉴2</v-btn>
        <v-btn variant="outlined" class="rounded-b ">열린메뉴3</v-btn>
        <v-btn variant="outlined" class="rounded-b ">열린메뉴4</v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view class="px-4 py-2"></router-view>
    </v-main>

    <v-navigation-drawer location="right" temporary v-model="drawer" width="350">
      <v-list>
        <v-list-item v-for="n in 5" :key="n" :title="`Item ${n}`" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer app height="72">
      <v-text-field class="overflow-hidden" density="compact" flat hide-details rounded="pill"
        variant="solo-filled" @focus="drawer = !drawer"></v-text-field>
    </v-footer>
  </v-app>
</template>
