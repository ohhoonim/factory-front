import { ref, Ref, computed } from "vue"
import router from "@/router"
import { defineStore } from "pinia"

export interface LoginUser {
    email: string,
    password: string,
}
export interface Response {
    code: string,
    message: string,
    data: any,
    description: string | null,
    accessToken: string | null,
}

export const useAuthStore = defineStore('auth', () => {
    const user: Ref<string> =  ref('')
    const token: Ref<string> = ref('')
    const returnUrl: Ref<string> = ref('/')

    const currentUser = computed(() => user.value)
    const currentToken = computed(() => token.value)

    async function login(loginUser: LoginUser) {
        const response = await fetch('http://127.0.0.1:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(loginUser)
        })
        if (response.status === 200) {
            const responseData: Promise<Response> = await response.json()
            const datas = (await responseData).data
            token.value = datas.accessToken;
            router.push(returnUrl.value ?? "/")
        } 
    }
    async function refresh() {
        const response = await fetch('http://127.0.0.1:8080/api/v1/auth/refresh', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            }, 
        })
        if (response.status === 200 ) {
            const responseData: Promise<Response> = await response.json()
            const datas = (await responseData).data
            if (datas.accessToken) {
                token.value = datas.accessToken;
            } else if ((await responseData).code === "ERROR") {
                console.warn(JSON.stringify((await responseData)))
            }
        }
    }
    async function logout() {
        const authorizationString = 'Bearer ' + token.value
        await fetch('http://127.0.0.1:8080/api/v1/auth/logout', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationString,
            }, 
        })
        token.value = ''
        user.value = ''
        await router.push('/auth/login')
    }
    return {
        user,
        token,
        returnUrl,
        currentUser,
        currentToken,
        login,
        refresh,
        logout,
    }
})

