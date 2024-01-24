<script setup lang="ts">
import { ref } from 'vue'
import { mdiYoutube, mdiGithub, mdiPost, mdiThemeLightDark } from "@mdi/js"
import { useI18n } from "vue-i18n"
import { useTheme } from 'vuetify'
const { t, locale } = useI18n()
const theme = useTheme()
const icons = [
    {icon : mdiYoutube, href: "https://www.youtube.com/@hobbyMett"}, 
    {icon : mdiGithub, href: "https://github.com/ohhoonim"}, 
    {icon : mdiPost, href: "https://ohhoonim.blogspot.com/"}
]
const languages = [
    { title: '한국어', value: 'ko' },
    { title: 'English', value: 'en' },
]

</script>
<template>
    <v-app class="d-flex flex-column">
        <v-app-bar class="d-flex justify-between align-center flex-grow-0">
            <v-app-bar-title class="font-weight-bold text-h5">The Factory</v-app-bar-title>
            <div class="d-flex justify-end align-center ga-12 pt-6 mr-10">
                <v-switch v-model="theme.global.name.value" true-value="dark" false-value="light"
                    :prepend-icon="mdiThemeLightDark">
                </v-switch>
                <v-select :label="t('language')" :items="languages" v-model="locale"
                    variant="underlined" density="compact"></v-select>
            </div>
        </v-app-bar>
        <v-main class="flex-grow-1">
            <router-view></router-view>
        </v-main>
        <v-footer class="flex-column flex-grow-0">
            <div class="d-flex ga-10 my-5">
                <v-btn v-for="icon in icons" :key="icon.href" :icon="icon.icon" 
                :href="icon.href" target="_blank" size="small" 
                color="primary" variant="outlined"></v-btn>
            </div>
            <span>{{ new Date().getFullYear() }} — <strong>Project : The Factory</strong></span>
        </v-footer>
    </v-app>
</template>
<style scoped></style>