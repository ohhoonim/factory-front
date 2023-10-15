<script lang="ts" setup>
import { useAuthStore, LoginUser } from '@/store/AuthService';
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n';

const authService = useAuthStore()
const { t } = useI18n()

const user: LoginUser = reactive({
    email: 'matthew@ohhoonim.dev',
    password: '1234',
})
const loading = ref(false)
async function login(event: any) {
    loading.value = true
    const results = await event
    const errors = await results.errors
    if (errors?.length === 0) {
        authService.login(user)
    }
    loading.value = false
}
const emailRules = [
    (value: string) => {
        if (value) return true
        return 'E-mail is requred.'
    },
    (value: string) => {
        if (/.+@.+\..+/.test(value)) return true
        return 'E-mail must be valid.'
    },
]
</script>
<template>
    <div class="d-flex align-center justify-center" style="height: 90vh">
        <v-sheet width="400" class="mx-auto">
            <h2>{{ t('hello-the-factory') }}</h2>
            <v-form validate-on="submit lazy" @submit.prevent="login">
                <v-text-field v-model="user.email" :label="t('username')" :rules="emailRules" required
                    variant="outlined"></v-text-field>
                <v-text-field v-model="user.password" type="password" :label="t('password')"
                    :rules="[(v: any) => !!v || t('password') + 'is required']" required variant="outlined"></v-text-field>
                <a href="#" class="text-body-2 font-weight-regular">{{ t('forgot-password') }}</a>
                <v-btn type="submit" block :loading="loading" color="primary" class="mt-2">{{ t('sign-in') }}</v-btn>
            </v-form>
            <div class="mt-2">
                <p class="text-body-2">{{ t('dont-have-an-account') }} <a href="#">{{ t('sign-up') }}</a></p>
            </div>
        </v-sheet>
    </div>
</template>
