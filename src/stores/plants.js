import axios from 'axios'
import { defineStore } from 'pinia'

export const usePlantsStore = defineStore('plants', {
	state: () => ({
		error: null,
		loading: false,
		stage: null,
		token: localStorage.getItem('access_token') || null,
		plantResult: null,
		plants: [],
		leafResult: null,
		chatMessages: [],
	}),

	actions: {
		handleError(error) {
			if (error.response) {
				this.error =
					error.response.data.message || 'Ошибка при выполнении запроса'
			} else {
				this.error = 'Произошла ошибка, повторите позднее'
			}
			this.stage = null
			return { success: false, error: this.error }
		},

		setToken(token) {
			this.token = token
			localStorage.setItem('access_token', token)
		},

		async identifyPlant(formData) {
			try {
				this.loading = true
				this.error = null
				this.stage = 'uploading'

				const response = await axios.post(
					'/v1/plants/identify-plant',
					formData,
					{
						baseURL: 'https://192.168.253.31:8000',
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: this.token ? `Bearer ${this.token}` : '',
						},
					}
				)

				this.stage = 'processing'
				await new Promise(resolve => setTimeout(resolve, 1000))

				this.stage = 'searching'
				await new Promise(resolve => setTimeout(resolve, 1000))

				this.plantResult = response.data
				this.stage = 'done'
				return { success: true, data: response.data }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async diagnoseLeaf(formData) {
			try {
				this.loading = true
				this.error = null
				this.stage = 'uploading'

				const response = await axios.post('/v1/leafs/create-leaf', formData, {
					baseURL: 'https://192.168.253.31:8000',
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: this.token ? `Bearer ${this.token}` : '',
					},
				})

				this.stage = 'processing'
				await new Promise(resolve => setTimeout(resolve, 1000))

				this.stage = 'searching'
				await new Promise(resolve => setTimeout(resolve, 1000))

				this.leafResult = response.data
				this.stage = 'done'
				return { success: true, data: response.data }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async getPlantById(plantId) {
			try {
				this.loading = true
				this.error = null
				this.stage = 'fetching'

				const response = await axios.get(`/v1/plants/plant/${plantId}`, {
					baseURL: 'https://192.168.253.31:8000',
					headers: {
						Authorization: this.token ? `Bearer ${this.token}` : '',
					},
				})

				this.stage = 'done'
				return { success: true, data: response.data }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async getAllPlants() {
			try {
				this.loading = true
				this.error = null
				this.stage = 'fetching'

				const response = await axios.get('/v1/plants/plants', {
					baseURL: 'https://192.168.253.31:8000',
					headers: {
						Authorization: this.token ? `Bearer ${this.token}` : '',
					},
				})

				this.plants = response.data || []
				this.stage = 'done'
				return { success: true, data: response.data }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async askPlantQuestion(plantId, question) {
			try {
				this.loading = true
				this.error = null
				this.stage = 'processing'

				const response = await axios.post(
					'/v1/questions/plant/ask',
					{ plant_id: plantId, question },
					{
						baseURL: 'https://192.168.253.31:8000',
						headers: {
							Authorization: this.token ? `Bearer ${this.token}` : '',
						},
					}
				)

				this.stage = 'done'
				this.chatMessages.push({ type: 'user', text: question })
				this.chatMessages.push({ type: 'ai', text: response.data.answer })
				return { success: true, data: response.data }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},
	},
})
