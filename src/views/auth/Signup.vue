<script lang="ts" setup>
import { useSignupStore, SignupUser, Response } from '@/store/AuthService';
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router'

const signupService = useSignupStore()
const { t } = useI18n()
const { push } = useRouter()

const user: SignupUser = reactive({
    email: "",
    password: "",
    passwordVerify: "",
    name: ""
})
const loading = ref(false)
async function signup(event: any) {
    loading.value = true
    const results = await event
    const errors = await results.errors
    if (errors?.length === 0) {
        if (await signupService.checkRequiredItem(user)) {
            alert(t('required-item'))
            loading.value = false
            return
        }
        const response: Response = await signupService.requestSignup(user)
        if (response.code === "ERROR") {
            alert(response.message)
            loading.value = false
            return
        } else {
            alert("회원가입 요청이 완료되었습니다. 로그인페이지로 이동합니다.")
            push({ name: "login" })
        }

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
    <div class="d-flex justify-center pt-16"  >
        <v-sheet width="500" class="pa-10 rounded-xl elevation-20" >
            <v-form validate-on="submit lazy" @submit.prevent="signup" class="d-flex flex-column ga-2">
                <v-text-field v-model="user.email" :label="t('username')" :rules="emailRules" required
                    variant="underlined"></v-text-field>
                <v-text-field v-model="user.name" :label="t('name')" required 
                    variant="underlined"></v-text-field>
                <v-text-field v-model="user.password" type="password" :label="t('password')"
                    :rules="[(v: any) => !!v || t('password') + 'is required']" required variant="underlined"></v-text-field>
                <v-text-field v-model="user.passwordVerify" type="password" :label="t('passwordVerify')"
                    :rules="[(v: any) => !!v || t('passwordVerify') + 'is required']" required
                    variant="underlined"></v-text-field>
                <v-btn type="submit" block :loading="loading" color="primary" class="mt-2">{{ t('sign-up') }}</v-btn>
                <v-btn to="login" variant="outlined" color="primary" class="mt-2">{{ t('sign-in') }} 페이지 돌아가기</v-btn>
                
            </v-form>
        </v-sheet>
    </div>
</template>
