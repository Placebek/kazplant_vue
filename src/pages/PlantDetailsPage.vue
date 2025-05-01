<template>
	<div class="min-h-screen ">
		<!-- Кнопка "Назад" в верхнем левом углу -->
		<div class="absolute top-4 left-3 z-20">
			<router-link to="/plant">
				<button
					class="bg-white p-2 rounded-full shadow-md  transition-all duration-300"
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
			<!-- Состояние загрузки -->
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
          class="slider-container w-full h-[40vh] relative overflow-hidden "
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
          <div
            class="absolute inset-0 bg-cover bg-center blur-lg opacity-50"
            :style="{ backgroundImage: `url(https://pystorm.space//${plant.photos[currentPhotoIndex].photo})` }"
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
                :src="'https://pystorm.space//' + photo.photo"
                alt="Фото растения"
                class="w-full h-[28vh] object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <div class="absolute top-[1vh] right-[3vw] text-[2vh] text-white font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
            {{ currentPhotoIndex + 1 }} / {{ plant.photos.length }}
          </div>
        </div>
        <div class="p-4 rounded-t-[20px]  top-[28vh] absolute bg-white">

            <p class="mt-3 text-[2.8vh] font-bold"> {{ plant.name }}</p>
            <p class="mt-2"><span class="font-bold">Семейство:</span> <span class="text-gray-500">{{ plant.family }}</span></p>
            <p class=""><span class="font-bold">Царство:</span> <span class="text-gray-500">{{ plant.kingdom }}</span></p>
            <!-- Кнопка "Назад" -->
            <p class="mt-3">{{ plant.description }}</p>
           
        </div>

      </div>

			<!-- Ошибка -->
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePlantsStore } from '@/stores/plants'

const route = useRoute()
const plantsStore = usePlantsStore()
const plant = ref(null)
const currentPhotoIndex = ref(0)
const touchStartX = ref(0)
const touchEndX = ref(0)

// Сообщения для этапов
const stageMessage = computed(() => {
	return plantsStore.stage === 'fetching' ? 'Получение данных...' : 'Завершено!'
})

// Прогресс-бар
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

onMounted(fetchPlant)
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
