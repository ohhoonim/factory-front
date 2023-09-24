<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const username = ref('')
const password = ref('')
const login = () => { }
</script>
<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <h2>{{ t('hello-the-factory') }}</h2>
            <v-form fast-fail @submit.prevent="login">
                <v-text-field variant="outlined" v-model="username" :label="t('username')"></v-text-field>
                <v-text-field variant="outlined" v-model="password" :label="t('password')"></v-text-field>
                <a href="#" class="text-body-2 font-weight-regular">{{ t('forgot-password') }}</a>
                <v-btn type="submit" color="primary" block class="mt-2">{{ t('sign-in') }}</v-btn>
            </v-form>
            <div class="mt-2">
                <p class="text-body-2">{{ t('dont-have-an-account') }} <a href="#">{{ t('sign-up') }}</a></p>
            </div>
        </v-sheet>
    </div>
</template>
