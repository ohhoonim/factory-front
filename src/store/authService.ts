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

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => {
        return {
            user: '',
            token: '',
            returnUrl: '/',
            logouted: false,
        }
    },
    actions: {
        async login(loginUser: LoginUser) {
            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(loginUser)
            })
            if (response.status === 200) {
                const responseData: Promise<Response> = await response.json()
                const datas = (await responseData).data
                this.token = datas.accessToken;
                router.push(this.returnUrl || "/")
            }
        },
        async refresh() {
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
                this.token = datas.accessToken;
            }
        },
        async logout() {
            const authorizationString = 'Bearer ' + this.token
            const response = await fetch('/api/v1/auth/logout', {
                method: 'POST',
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorizationString,
                }, 
            })
            this.token = ''
            this.user = ''
            this.logouted = true 
            await router.push('/auth/login')
        }
    }
})