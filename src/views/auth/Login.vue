<script lang="ts" setup>
import { useAuthStore, LoginUser } from '@/store/authService';
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n';

const authStore = useAuthStore()
const { t } = useI18n()
const user: LoginUser = reactive({
    email: 'matthew@ohhoonim.dev',
    password: '1234',
})
const login = () => {
    console.log('login...', user)
    authStore.login(user)
 }
</script>
<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <h2>{{ t('hello-the-factory') }}</h2>
            <v-form fast-fail @submit.prevent="login">
                <v-text-field variant="outlined" v-model="user.email" :label="t('username')"></v-text-field>
                <v-text-field type="password" variant="outlined" v-model="user.password" :label="t('password')"></v-text-field>
                <a href="#" class="text-body-2 font-weight-regular">{{ t('forgot-password') }}</a>
                <v-btn type="submit" @click.prevent="login" color="primary" block class="mt-2">{{ t('sign-in') }}</v-btn>
            </v-form>
            <div class="mt-2">
                <p class="text-body-2">{{ t('dont-have-an-account') }} <a href="#">{{ t('sign-up') }}</a></p>
            </div>
        </v-sheet>
    </div>
</template>
@/store/authService