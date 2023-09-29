<script lang="ts" setup>
import { mdiSquare, mdiCircle, mdiTriangle } from "@mdi/js"
import { RouteRecordRaw, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/store/authService'
const routes: RouteRecordRaw[] = useRouter().getRoutes().filter(r => r.name ==='default')[0]?.children
const { t, locale } = useI18n()
const languages = [
    { title: '한국어', value: 'ko' },
    { title: 'English', value: 'en' },
]
const auth = useAuthStore()
const logout = () => {
  auth.logout()
}
</script>
<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer></v-spacer>
      <v-icon :icon="mdiSquare"></v-icon>
      <v-icon :icon="mdiCircle"></v-icon>
      <v-icon :icon="mdiTriangle"></v-icon>
    </v-system-bar>

    <v-navigation-drawer color="grey-lighten-3" rail>
      <v-avatar class="d-block text-center mx-auto mt-4" color="grey-darken-1" size="36"></v-avatar>

      <v-divider class="mx-3 my-5"></v-divider>

      <v-avatar v-for="n in 6" :key="n" class="d-block text-center mx-auto mb-9" color="grey-lighten-1"
        size="28"></v-avatar>
    </v-navigation-drawer>

    <v-navigation-drawer width="244">
      <v-sheet color="grey-lighten-5" height="128" width="100%">
        <v-btn @click="logout"></v-btn>
      </v-sheet>
      
      <v-list>
        <v-list-item v-for="route in routes" :key="route.name" :to="route"
        density="compact" :title="t(route.name?.toString() ?? '')">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="px-3" color="grey-lighten-4" flat height="72">
      <v-spacer></v-spacer>
      
      <v-responsive max-width="156">
        <v-text-field bg-color="grey-lighten-1" density="compact" flat hide-details rounded="pill"
          variant="solo-filled"></v-text-field>
        </v-responsive>
        <div>
          <v-select :label="t('language')" :items="languages" density="compact" 
                    v-model="locale" hide-details class="my-5"></v-select>
        </div>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <!--  --></v-main>


    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item v-for="n in 5" :key="n" :title="`Item ${n}`" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer app height="72">
      <v-text-field bg-color="grey-lighten-1" class="overflow-hidden" density="compact" flat hide-details rounded="pill"
        variant="solo-filled"></v-text-field>
    </v-footer>
  </v-app>
</template>
