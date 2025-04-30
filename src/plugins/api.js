import axios from 'axios'

export default defineNuxtPlugin(nuxtApp => {
	const config = useRuntimeConfig()

	const api = axios.create({
		baseURL: config.public.apiBase || 'http://169.254.144.185:8000',
		// headers: {
		// 	'Content-Type': 'application/json',
		// },
	})
	api.interceptors.request.use(
		config => {	
			if (typeof window !== 'undefined') {
				const token = localStorage.getItem('key')

				config.headers['Authorization'] = `Bearer ${token}`
			}
			return config
		},
		error => Promise.reject(error)
	)

	return {
		provide: {
			api,
		},
	}
})
