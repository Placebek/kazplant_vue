<template>
	<div class="min-h-screen">
		<!-- Кнопка "Назад" в верхнем левом углу -->
		<div class="absolute top-4 left-3 z-20">
			<router-link to="/plant">
				<button
					class="bg-white p-2 rounded-full shadow-md transition-all duration-300"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
					>
						<path
							fill="#000000"
							d="M7.828 11H20v2H7.828l5.364 5.364l-1.414 1.414L4 12l7.778-7.778l1.414 1.414z"
						/>
					</svg>
				</button>
			</router-link>
		</div>

		<!-- Основной контейнер -->
		<div class="bg-white rounded-lg max-w-md mx-auto">
			<!-- Состояние загрузки данных растения -->
			<div v-if="plantsStore.loading" class="text-center p-6">
				<p class="text-gray-600">{{ stageMessage }}</p>
				<div
					class="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2"
				>
					<div
						class="absolute h-full bg-green-500 transition-all duration-300"
						:style="{ width: progressWidth }"
					></div>
				</div>
			</div>

			<!-- Данные растения -->
			<div v-else-if="plant">
				<div
					v-if="plant.photos && plant.photos.length"
					class="slider-container w-full h-[40vh] relative overflow-hidden"
					@touchstart="onTouchStart"
					@touchend="onTouchEnd"
				>
					<div
						class="absolute inset-0 bg-cover bg-center blur-lg opacity-50"
						:style="{
							backgroundImage: `url(https://pystorm.space/${plant.photos[currentPhotoIndex].photo})`,
						}"
					></div>

					<!-- Лента изображений -->
					<div
						class="slider-track flex transition-transform duration-500 relative z-10"
						:style="{ transform: `translateX(-${currentPhotoIndex * 100}%)` }"
					>
						<div
							v-for="photo in plant.photos"
							:key="photo.id"
							class="slider-item min-w-full flex-shrink-0"
						>
							<img
								:src="'https://pystorm.space/' + photo.photo"
								alt="Фото растения"
								class="w-full h-[28vh] object-contain"
								loading="lazy"
							/>
						</div>
					</div>

					<div
						class="absolute top-[1vh] right-[3vw] text-[2vh] text-white font-medium bg-black bg-opacity-50 px-2 py-1 rounded"
					>
						{{ currentPhotoIndex + 1 }} / {{ plant.photos.length }}
					</div>
				</div>
				<div class="p-4 rounded-t-[20px] top-[28vh] absolute bg-white">
					<p class="mt-3 text-[2.8vh] font-bold">{{ plant.name }}</p>
					<p class="mt-2">
						<span class="font-bold">Семейство:</span>
						<span class="text-gray-500">{{ plant.family }}</span>
					</p>
					<p class="">
						<span class="font-bold">Царство:</span>
						<span class="text-gray-500">{{ plant.kingdom }}</span>
					</p>
					<p class="mt-3">{{ plant.description }}</p>

					<div
						class="p-4 mt-4 rounded-[20px] border-2 border-red-200 bg-white flex flex-row gap-5 items-center justify-center"
					>
						<img
							src="../assets/img/plants/segmentation.jpg"
							alt=""
							class="blur-sm size-[100px] rounded-xl"
						/>
						<div class="flex flex-col gap-5">
							<p class="text-[1.8vh] font-semibold">
								Хотите обнаружить больше?
							</p>
							<div
								@click="toSegmentation(plant.photos[currentPhotoIndex].photo)"
								class="text-white font-semibold text-[2vh] p-2 bg-red-400 flex items-center justify-center rounded-xl flex-row gap-2 cursor-pointer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path
										fill="#fff"
										d="m21.66 14.588l-.725-.194zm-12.248 7.07l-.194.725zM2.34 9.412l-.725-.194zm12.247-7.07l-.194.724zm-3.06 10.241a.75.75 0 1 0 .944-1.165zM5.002 6.336l.472-.583zm-1.366.178l-.627-.41zm3.082-3.876a.75.75 0 1 0 .737 1.306zm3.148 2.957a.75.75 0 0 0 .474 1.423zm11.069 8.8a9.25 9.25 0 0 1-11.329 6.54l-.388 1.45c5.735 1.536 11.63-1.867 13.166-7.602zm-11.329 6.54a9.25 9.25 0 0 1-6.54-11.329l-1.45-.388C.08 14.952 3.483 20.847 9.218 22.383zm4.788-17.87a9.25 9.25 0 0 1 6.54 11.33l1.45.388c1.536-5.735-1.867-11.63-7.602-13.166zm-1.922 8.353L5.474 5.752L4.53 6.918l6.998 5.664zM3.065 9.605a9.2 9.2 0 0 1 1.198-2.68L3.01 6.102a10.7 10.7 0 0 0-1.393 3.115zm4.39-5.662a9.22 9.22 0 0 1 6.94-.878l.387-1.45c-2.83-.757-5.7-.312-8.064 1.022zm-1.981 1.81c-.733-.594-1.891-.526-2.465.35l1.254.822a.13.13 0 0 1 .099-.06a.23.23 0 0 1 .168.053zM17.25 12A5.25 5.25 0 0 1 12 17.25v1.5A6.75 6.75 0 0 0 18.75 12zM12 17.25A5.25 5.25 0 0 1 6.75 12h-1.5A6.75 6.75 0 0 0 12 18.75zm0-10.5c2.9 0 5.25 2.35 5.25 5.25h1.5A6.75 6.75 0 0 0 12 5.25zM6.75 12c0-1.27.45-2.431 1.198-3.339L6.79 7.707A6.73 6.73 0 0 0 5.25 12zm3.59-4.983A5.2 5.2 0 0 1 12 6.75v-1.5c-.745 0-1.462.12-2.134.344z"
									/>
								</svg>
								<p>Исследовать</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Модальное окно для сегментации -->
				<div
					v-if="modal"
					class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
				>
					<div class="bg-white p-6 rounded-lg max-w-md w-[80vw] text-center">
						<div v-if="segmentationLoading">
							<p class="text-gray-600">Идет сегментация изображения...</p>
							<div
								class="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2 mb-4"
							>
								<div
									class="absolute h-full bg-green-500 transition-all duration-300"
									style="width: 50%"
								></div>
							</div>
							<!-- Добавляем кнопку отмены -->
							<button
								@click="cancelSegmentation"
								class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300"
							>
								Отменить
							</button>
						</div>

						<div v-else-if="segmentedData || segmentationError">
							<div v-if="segmentedData">
								<h2 class="text-2xl font-bold mb-4">Результат сегментации</h2>
								<img
									:src="segmentedData"
									alt="Сегментированное изображение"
									class="w-full max-h-[40vh] object-contain rounded-lg mb-4"
								/>
							</div>
							<p v-if="segmentationError" class="text-red-500 mb-4">
								{{ segmentationError }}
							</p>
							<div class="flex gap-4 justify-center">
								<button
									@click="closeSegmentationModal"
									class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300"
								>
									Закрыть
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Ошибка загрузки данных растения -->
			<div v-else-if="plantsStore.error" class="text-red-500 text-center p-6">
				<p>{{ plantsStore.error }}</p>
				<button
					@click="$router.push('/home')"
					class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300 mt-4"
				>
					Назад
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { usePlantsStore } from '@/stores/plants'

const route = useRoute()
const plantsStore = usePlantsStore()
const plant = ref(null)
const currentPhotoIndex = ref(0)
const touchStartX = ref(0)
const touchEndX = ref(0)
const modal = ref(false)
const segmentedData = ref(null)
const segmentationLoading = ref(false)
const segmentationError = ref(null)

// Сообщения для этапов загрузки данных растения
const stageMessage = computed(() => {
	return plantsStore.stage === 'fetching' ? 'Получение данных...' : 'Завершено!'
})

// Прогресс-бар для загрузки данных растения
const progressWidth = computed(() => {
	return plantsStore.stage === 'fetching' ? '50%' : '100%'
})

// Загрузка данных растения
const fetchPlant = async () => {
	const plantId = route.params.id
	const result = await plantsStore.getPlantById(plantId)
	if (result.success) {
		plant.value = result.data
	}
}

// Запуск сегментации
const toSegmentation = async img => {
	modal.value = true
	segmentationLoading.value = true
	segmentationError.value = null
	segmentedData.value = null

	const dataURL = `https://pystorm.space/${img}`

	try {
		const response = await fetch(dataURL)
		const blob = await response.blob()

		const reader = new FileReader()
		reader.onloadend = () => {
			const base64data = reader.result

			if (window.ok?.segmentDiseaseClick) {
				window.ok.segmentDiseaseClick(base64data)
			} else {
				segmentationLoading.value = false
				segmentationError.value = 'Функция сегментации недоступна'
				console.error('segmentDiseaseClick not available')
			}
		}

		reader.readAsDataURL(blob)
	} catch (error) {
		segmentationLoading.value = false
		segmentationError.value = 'Ошибка загрузки изображения'
		console.error('Ошибка при загрузке изображения:', error)
	}
}

// Закрытие модального окна
const closeSegmentationModal = () => {
	modal.value = false
	segmentationLoading.value = false
	segmentedData.value = null
	segmentationError.value = null
}

// Обработка начала касания
const onTouchStart = event => {
	touchStartX.value = event.touches[0].clientX
}

// Обработка окончания касания
const onTouchEnd = event => {
	touchEndX.value = event.changedTouches[0].clientX
	const swipeDistance = touchStartX.value - touchEndX.value

	if (
		swipeDistance > 50 &&
		currentPhotoIndex.value < plant.value.photos.length - 1
	) {
		// Свайп влево
		currentPhotoIndex.value++
	} else if (swipeDistance < -50 && currentPhotoIndex.value > 0) {
		// Свайп вправо
		currentPhotoIndex.value--
	}
}

// Жизненный цикл компонента
onMounted(() => {
	fetchPlant()

	// Коллбэк для получения сегментированного изображения
	window.displaySegmentedImage = base64Image => {
		if (base64Image) {
			segmentedData.value = base64Image
			segmentationLoading.value = false
		} else {
			segmentationLoading.value = false
			segmentationError.value =
				'Не удалось получить сегментированное изображение'
		}
	}
})

onBeforeUnmount(() => {
	// Очистка коллбэка
	delete window.displaySegmentedImage
})
</script>

<style scoped>
/* Стили для слайдера */
.slider-container {
	touch-action: pan-y; /* Ограничиваем прокрутку по горизонтали */
}

.blur-lg {
	filter: blur(10px); /* Уровень размытия для фона */
}
</style>
