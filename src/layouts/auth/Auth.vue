<script setup lang="ts">
import { ref } from 'vue'
import { mdiYoutube, mdiGithub, mdiPost, mdiSquare } from "@mdi/js";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n()
const icons = [
    mdiYoutube, mdiGithub, mdiPost
]
const languages = [
    { title: '한국어', value: 'ko' },
    { title: 'English', value: 'en' },
]
</script>
<template>
    <v-app>
        <v-system-bar class="bg-indigo-lighten-1">
            <v-spacer></v-spacer>
            <v-icon :icon="mdiSquare"></v-icon>
        </v-system-bar>
        <v-app-bar class="bg-indigo-lighten-5" justify="center">
            <v-app-bar-title>The Factory</v-app-bar-title>
            <v-spacer></v-spacer>
            <div>
                <v-select :label="t('language')" :items="languages" density="compact" 
                    v-model="locale" hide-details class="my-5"></v-select>
            </div>
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main>
        <v-footer app class="bg-indigo-lighten-1 text-center d-flex flex-column">
            <div>
                <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="plain" size="small"></v-btn>
            </div>
            <div>
                {{ new Date().getFullYear() }} — <strong>Project : The Factory</strong>
            </div>
        </v-footer>
    </v-app>
</template>
<style scoped></style>