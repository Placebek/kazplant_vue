import axios from 'axios'
import { defineStore } from 'pinia'

export const usePlantsStore = defineStore('plants', {
	state: () => ({
		error: null,
		loading: false,
		stage: null, // Этап: 'uploading', 'processing', 'searching', 'done'
		token: localStorage.getItem('access_token') || null,
		plantResult: null, // Храним результат идентификации
	}),

	actions: {
		handleError(error) {
			if (error.response) {
				this.error = error.response.data.message || 'Ошибка при идентификации'
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
				this.stage = 'uploading' // Этап загрузки

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

				this.stage = 'processing' // Этап обработки
				await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация обработки

				this.stage = 'searching' // Этап поиска
				await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация поиска

				this.plantResult = response.data
				this.stage = 'done' // Завершение
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
				this.stage = 'fetching' // Этап получения данных

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

				this.plants = response.data
				this.stage = 'done'
				return { success: true, data: response.data }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},
	},
})
