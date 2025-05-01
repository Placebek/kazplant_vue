import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		error: null,
		loading: false,
		token: localStorage.getItem('access_token') || null,
		accessTokenExpireTime: null,
	}),

	actions: {
		handleError(error) {
			if (error.response) {
				this.error =
					error.response.data.message || 'Ошибка при выполнении запроса'
			} else {
				this.error = 'Произошла ошибка, повторите позднее'
			}
			return { success: false, error: this.error }
		},

		setToken(token, expireTime) {
			this.token = token
			this.accessTokenExpireTime = expireTime
			localStorage.setItem('access_token', token)
		},

		clearToken() {
			this.token = null
			this.accessTokenExpireTime = null
			localStorage.removeItem('access_token')
		},

		async registerUser({ username, full_name, email, password }) {
			try {
				this.loading = true
				this.error = null

				const response = await axios.post(
					'/v1/auth/register-user',
					{ username, full_name, email, password },
					{
						baseURL: 'https://pystorm.space/',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)

				this.setToken(
					response.data.access_token,
					response.data.access_token_expire_time
				)
				return { success: true, data: response.data }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async loginUser({ username, password }) {
			try {
				this.loading = true
				this.error = null

				const response = await axios.post(
					'/v1/auth/login-user',
					{ username, password },
					{
						baseURL: 'https://pystorm.space/',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)

				this.setToken(
					response.data.access_token,
					response.data.access_token_expire_time
				)
				return { success: true, data: response.data }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		logout() {
			this.clearToken()
			return { success: true }
		},
	},
})
