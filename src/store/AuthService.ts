import { ref, Ref, computed } from "vue"
import router from "@/router"
import { defineStore } from "pinia"
import axios, { AxiosResponse } from "axios"

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
    const user: Ref<string> = ref('')
    const token: Ref<string> = ref('')
    const returnUrl: Ref<string> = ref('/')

    const currentUser = computed(() => user.value)
    const currentToken = computed(() => token.value)

    async function login(loginUser: LoginUser): Promise<Response> {
        const response: AxiosResponse = await axios.post("/api/v1/auth/login",
        { ...loginUser }, {
        headers: { Authorization: "application/json" }})
        
        const datas: Response = await response.data
        if (datas.data.accessToken) {
            token.value = datas.data.accessToken
            router.push(returnUrl.value ?? "/")
        } 
        return Promise.resolve(datas)
    }
    async function refresh() {
        const response = await fetch('/api/v1/auth/refresh', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.status === 200) {
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
        await fetch('/api/v1/auth/logout', {
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

export interface SignupUser {
    email: string,
    password: string,
    passwordVerify: string,
    name: string
}

export const useSignupStore = defineStore("signup", () => {
    async function checkRequiredItem(user: SignupUser): Promise<boolean> {
        const response: AxiosResponse = await axios.post("/api/v1/auth/checkRequiredItem",
            { ...user }, {
            headers: { Authorization: "application/json" }
        })
        let checkedRequiredItem = false
        if ((response.data?.code ?? "ERROR") === "ERROR") {
            checkedRequiredItem = true
        }
        return Promise.resolve(checkedRequiredItem)
    }

    async function requestSignup(user: SignupUser): Promise<Response> {
        const response: AxiosResponse = await axios.post("/api/v1/auth/requestSignup",
        { ...user }, {
        headers: { Authorization: "application/json" }})
        
        return Promise.resolve(response.data)
    }

    async function resendMail(email: string) {

    }

    return {
        checkRequiredItem,
        requestSignup,
        resendMail,
    }

})