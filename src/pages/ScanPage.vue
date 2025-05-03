<template>
	<div class=" bg-black">
		<div class=" relative">
			<!-- Header with Back Button and Camera Controls -->
			<Transition name="fade-slide" appear>
				<div class="bg-[#129C52] p-4 flex items-center justify-between fixed top-0 left-0 w-full z-10 bg-opacity-100 max-h-[7vh]">
					<router-link to="/home">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 24 24"
						>
							<g fill="#fff" fill-rule="evenodd" clip-rule="evenodd">
								<path
									d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06"
								/>
								<path
									d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0"
								/>
							</g>
						</svg>
					</router-link>
					<div class="flex flex-row gap-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 512 512"
						>
							<path
								fill="none"
								stroke="#fff"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="32"
								d="M315.27 33L96 304h128l-31.51 173.23a2.36 2.36 0 0 0 2.33 2.77h0a2.36 2.36 0 0 0 1.89-.95L416 208H288l31.66-173.25a2.45 2.45 0 0 0-2.44-2.75h0a2.42 2.42 0 0 0-1.95 1"
							/>
						</svg>
						<div @click="toggleCamera">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="30"
								height="30"
								viewBox="0 0 24 24"
							>
								<path
									fill="#fff"
									d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2V7a2 2 0 0 0-2-2m0 14H4V7h4.05l1.83-2h4.24L16 7h4zM5 12h2.1A4.997 4.997 0 0 1 13 8.1c.76.15 1.43.49 2 .9l-1.44 1.45c-.45-.28-.98-.45-1.56-.45c-1.26 0-2.4.8-2.82 2H11l-3 3zm11.91 2c-.55 2.71-3.19 4.45-5.91 3.9a5.4 5.4 0 0 1-2-.9l1.44-1.45c.46.28.99.45 1.56.45c1.27 0 2.41-.8 2.83-2H13l3-3l3 3z"
								/>
							</svg>
						</div>
					</div>
				</div>
			</Transition>

			<!-- Focus Marker -->
			<Transition name="fade-slide" appear>
				<div
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
				>
					<svg width="202" height="202" viewBox="0 0 202 202" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M157.522 1H201V46.4545" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
<path d="M44.4781 201L0.999905 201L0.999908 155.545" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
<path d="M1 46.4545L0.999998 0.99999L44.4782 0.999988" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
<path d="M201 155.545L201 201L157.522 201" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
</svg>

				</div>
			</Transition>

			<!-- Video and Canvas -->
			<video
				ref="video"
				autoplay
				playsinline
				webkit-playsinline
				muted
				class="hidden"
			></video>
			<canvas ref="canvas" class="bg-black w-full pt-[7vh] h-[74.1vh]"></canvas>

			<!-- Photo Preview Modal -->
			<Transition name="fade" appear>
				<div
					v-if="previewPhoto"
					class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
				>
					<div
						class="relative w-full max-w-md p-4 flex flex-col justify-center items-center"
					>
						<img
							:src="previewPhoto"
							alt="Предпросмотр"
							class="w-full max-w-[80vw] max-h-[60vh] object-cover rounded-lg"
						/>
						<div class="flex gap-4 mt-4 justify-center">
							<button
								@click="confirmPhoto"
								class="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-all duration-300"
							>
								Подтвердить
							</button>
							<button
								@click="cancelPhoto"
								class="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
							>
								Отменить
							</button>
						</div>
					</div>
				</div>
			</Transition>

			<!-- Loading Modal -->
			<Transition name="fade" appear>
				<div
					v-if="plantsStore.loading"
					class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
				>
					<div class="bg-white p-6 rounded-lg w-full max-w-md text-center">
						<h2 class="text-xl font-bold mb-4">Обработка...</h2>
						<div
							class="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden"
						>
							<div
								class="absolute h-full bg-green-500 transition-all duration-300"
								:style="{ width: progressWidth }"
							></div>
						</div>
						<p class="mt-2 text-gray-600">{{ stageMessage }}</p>
					</div>
				</div>
			</Transition>

			<!-- Plant Identification Result Modal -->
			<Transition name="fade" appear>
				<div
					v-if="plantResult"
					class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
				>
					<div class="bg-white p-6 rounded-lg w-full max-w-md">
						<h2 class="text-2xl font-bold mb-4">Результат идентификации</h2>
						<p><strong>Название:</strong> {{ plantResult.name }}</p>
						<p><strong>Описание:</strong> {{ plantResult.description }}</p>
						<p><strong>Семейство:</strong> {{ plantResult.family }}</p>
						<p><strong>Царство:</strong> {{ plantResult.kingdom }}</p>
						<p>
							<strong>Вероятность:</strong>
							{{ (plantResult.probability * 100).toFixed(1) }}%
						</p>
						<div class="flex gap-4 mt-4">
							<button
								@click="viewPlantDetails"
								class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
							>
								Подробности
							</button>
							<button
								@click="plantResult = null"
								class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300"
							>
								Закрыть
							</button>
						</div>
					</div>
				</div>
			</Transition>

			<!-- Leaf Diagnosis Result Modal -->
			<Transition name="fade" appear>
				<div
					v-if="plantsStore.leafResult || resultDisease"
					class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
				>
					<div class="bg-white p-6 rounded-lg w-full max-w-md">
						<h2 class="text-2xl font-bold mb-4">Результат диагностики</h2>
						<p>
							<strong>Заболевание:</strong>
							{{
								resultDisease
									? classes.find(c => c.id === resultDisease)?.name
									: plantsStore.leafResult?.disease?.name
							}}
						</p>
						<p>
							<strong>Лечение:</strong>
							{{
								resultDisease ? classes.find(c => c.id === resultDisease)?.treatment || 'Консультация с агрономом' : plantsStore.leafResult?.disease?.treatment
							}}
						</p>
						<p>
							<strong>Профилактика:</strong>
							{{
								resultDisease? classes.find(c => c.id === resultDisease)?.prevention || 'Регулярный осмотр растений'
									: plantsStore.leafResult?.disease?.prevention
							}}
						</p>
						<div class="flex gap-4 mt-4">
							<button
								@click="resultDisease = null; plantsStore.leafResult = null"
								class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300"
							>
								Закрыть
							</button>
						</div>
					</div>
				</div>
			</Transition>

			<!-- Retry Modal for Low Probability -->
			<Transition name="fade" appear>
				<div
					v-if="showRetryModal"
					class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
				>
					<div class="bg-white p-6 rounded-lg w-full max-w-md text-center">
						<h2 class="text-xl font-bold mb-4 text-red-500">
							Неудачный снимок
						</h2>
						<p class="text-gray-600 mb-4">
							У вас получился неудачный снимок, попробуйте пожалуйста снять
							более точно.
						</p>
						<button
							@click="showRetryModal = false"
							class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300"
						>
							Попробовать снова
						</button>
					</div>
				</div>
			</Transition>

			<!-- Error Modal -->
			<Transition name="fade" appear>
				<div
					v-if="plantsStore.error"
					class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
				>
					<div class="bg-white p-6 rounded-lg w-full max-w-md text-center">
						<h2 class="text-xl font-bold mb-4 text-red-500">Ошибка</h2>
						<p class="text-gray-600 mb-4">{{ plantsStore.error }}</p>
						<button
							@click="plantsStore.error = null"
							class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300"
						>
							Закрыть
						</button>
					</div>
				</div>
			</Transition>

			<!-- Hidden File Input for Gallery -->
			<input
				ref="fileInput"
				type="file"
				accept="image/*"
				class="hidden"
				@change="handleGalleryPhoto"
			/>

			<!-- Mode Switcher -->
			<Transition name="fade-slide" appear>
				<div
					class="fixed bottom-[160px] left-1/2 -translate-x-1/2 flex gap-3 text-[1.5vh] z-10"
				>
					<button
						@click="is_diagnostic = false"
						class="text-white px-3 py-1 rounded-full"
						:class="{
							'bg-[#129C52]': !is_diagnostic,
							'bg-gray-500': is_diagnostic,
						}"
					>
						Идентифицировать
					</button>
					<button
						@click="is_diagnostic = true"
						class="text-white px-3 py-1 rounded-full"
						:class="{
							'bg-[#129C52]': is_diagnostic,
							'bg-gray-500': !is_diagnostic,
						}"
					>
						Диагностика
					</button>
				</div>
			</Transition>

			<!-- Bottom Control Bar -->
			<Transition name="fade-slide" appear>
				<div
					class="fixed bottom-0 left-0 w-full h-[17.6vh] bg-[#129C52] flex justify-between items-center px-8 z-10"
				>
					<button @click="openGallery" class="transition-all duration-300">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 512 512"
						>
							<path
								fill="#fff"
								d="M450.29 112H142c-34 0-62 27.51-62 61.33v245.34c0 33.82 28 61.33 62 61.33h308c34 0 62-26.18 62-60V173.33c0-33.82-27.68-61.33-61.71-61.33m-77.15 61.34a46 46 0 1 1-46.28 46a46.19 46.19 0 0 1 46.28-46.01Zm-231.55 276c-17 0-29.86-13.75-29.86-30.66v-64.83l90.46-80.79a46.54 46.54 0 0 1 63.44 1.83L328.27 337l-113 112.33ZM480 418.67a30.67 30.67 0 0 1-30.71 30.66H259L376.08 333a46.24 46.24 0 0 1 59.44-.16L480 370.59Z"
								stroke-width="13"
								stroke="#fff"
							/>
							<path
								fill="#fff"
								d="M384 32H64A64 64 0 0 0 0 96v256a64.11 64.11 0 0 0 48 62V152a72 72 0 0 1 72-72h326a64.11 64.11 0 0 0-62-48"
								stroke-width="13"
								stroke="#fff"
							/>
						</svg>
					</button>
					<button @click="takePhoto" class="transition-all duration-300">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100"
							height="100"
							viewBox="0 0 32 32"
						>
							<circle
								cx="16"
								cy="16"
								r="10"
								fill="#fff"
								stroke-width="1"
								stroke="#fff"
							/>
							<path
								fill="#fff"
								d="M16 30a14 14 0 1 1 14-14a14.016 14.016 0 0 1-14 14m0-26a12 12 0 1 0 12 12A12.014 12.014 0 0 0 16 4"
								stroke-width="1"
								stroke="#fff"
							/>
						</svg>
					</button>
					<button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="35"
							height="35"
							viewBox="0 0 24 24"
						>
							<path
								fill="#fff"
								d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-1-5h2v2h-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1a1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355"
							/>
						</svg>
					</button>
				</div>
			</Transition>

			<!-- Gallery Modal -->
			<Transition name="fade" appear>
				<div
					v-if="showGallery"
					class="fixed inset-0 bg-black bg-opacity-75 p-4 flex items-center justify-center z-50"
				>
					<div class="bg-white p-4 rounded-lg w-full max-w-md">
						<h2 class="text-2xl font-bold mb-4">Снимки:</h2>
						<div class="grid grid-cols-2 gap-4">
							<div v-for="(photo, index) in photos" :key="index" class="photo">
								<img
									:src="photo"
									alt="Снимок"
									class="w-full h-auto rounded-lg shadow-md"
								/>
							</div>
						</div>
						<button
							@click="toggleGallery"
							class="bg-gray-500 text-white px-4 py-2 rounded-full transition-all duration-300 mt-4"
						>
							Закрыть
						</button>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { usePlantsStore } from '@/stores/plants'
import { useRouter } from 'vue-router'

const video = ref(null)
const canvas = ref(null)
const ctx = ref(null)
const photos = ref([])
const showGallery = ref(false)
const fileInput = ref(null)
const previewPhoto = ref(null)
const plantResult = ref(null)
const facingMode = ref('environment')
const streamRef = ref(null)
const is_diagnostic = ref(false)
const showRetryModal = ref(false)
const resultDisease = ref(null)

const classes = [
  { 
    id: 1, 
    name: "Яблоко___Парша яблони", 
    treatment: "Применение фунгицидов (например, сера, каптан), удаление поражённых листьев и плодов", 
    prevention: "Обработка деревьев до цветения, санитарная обрезка, уборка опавших листьев" 
  },
  { 
    id: 2, 
    name: "Яблоко___Чёрная гниль", 
    treatment: "Удаление поражённых плодов и ветвей, применение фунгицидов", 
    prevention: "Регулярная уборка опавших листьев, избегание чрезмерного полива" 
  },
  { 
    id: 3, 
    name: "Яблоко___Ржавчина кедрово-яблонная", 
    treatment: "Применение фунгицидов (миклобутанил), удаление близлежащих кедров, если возможно", 
    prevention: "Контроль за растениями-хозяевами (кедр, можжевельник), своевременная обрезка" 
  },
  { 
    id: 4, 
    name: "Яблоко___Здоровое", 
    treatment: "Лечение не требуется", 
    prevention: "Регулярный полив, подкормка, обрезка и осмотр деревьев" 
  },
  { 
    id: 5, 
    name: "Черника___Здоровое", 
    treatment: "Лечение не требуется", 
    prevention: "Поддержание кислой почвы, регулярный полив, защита от вредителей" 
  },
  { 
    id: 6, 
    name: "Вишня (включая кислую)___Здоровое", 
    treatment: "Лечение не требуется", 
    prevention: "Санитарная обрезка, подкормка, защита от заморозков" 
  },
  { 
    id: 7, 
    name: "Вишня (включая кислую)___Мучнистая роса", 
    treatment: "Применение фунгицидов (сера, триадимефон), удаление поражённых побегов", 
    prevention: "Обеспечение хорошей вентиляции кроны, избегание переувлажнения" 
  },
  { 
    id: 8, 
    name: "Кукуруза (маис)___Пятнистость листьев цероспороз Серая пятнистость листьев", 
    treatment: "Применение фунгицидов (азоксистробин), удаление поражённых остатков", 
    prevention: "Севооборот, использование устойчивых сортов, уборка растительных остатков" 
  },
  { 
    id: 9, 
    name: "Кукуруза (маис)___Обычная ржавчина", 
    treatment: "Применение фунгицидов (триазолы), своевременная обработка", 
    prevention: "Использование устойчивых сортов, севооборот, контроль влажности" 
  },
  { 
    id: 10, 
    name: "Кукуруза (маис)___Здоровое", 
    treatment: "Лечение не требуется", 
    prevention: "Севооборот, подкормка, контроль за вредителями" 
  },
  { 
    id: 11, 
    name: "Кукуруза (маис)___Северный листовой ожог", 
    treatment: "Применение фунгицидов, удаление поражённых листьев", 
    prevention: "Севооборот, использование устойчивых гибридов, уборка остатков" 
  },
  { 
    id: 12, 
    name: "Виноград___Чёрная гниль", 
    treatment: "Удаление поражённых ягод и листьев, применение фунгицидов (каптан)", 
    prevention: "Санитарная обрезка, обеспечение вентиляции кустов, уборка остатков" 
  },
  { 
    id: 13, 
    name: "Виноград___Эска (чёрная короста)", 
    treatment: "Применение фунгицидов (миклобутанил), удаление поражённых частей", 
    prevention: "Обработка до цветения, хорошая вентиляция, уборка опавших листьев" 
  },
  { 
    id: 14, 
    name: "Виноград___Здоровое", 
    treatment: "Лечение не требуется", 
    prevention: "Регулярная обрезка, подкормка, контроль влажности" 
  },
  { 
    id: 15, 
    name: "Виноград___Пятнистость листьев (Isariopsis Leaf Spot)", 
    treatment: "Применение фунгицидов, удаление поражённых листьев", 
    prevention: "Санитарная обрезка, контроль за влажностью, уборка остатков" 
  },
  { 
    id: 16, 
    name: "Апельсин___Хуанлунбин (зелёная болезнь цитрусовых)", 
    treatment: "Удаление заражённых деревьев, контроль насекомых-переносчиков (псиллиды)", 
    prevention: "Использование здорового посадочного материала, мониторинг насекомых" 
  },
  { 
    id: 17, 
    name: "Персик___Бактериальное пятно", 
    treatment: "Применение бактерицидов (медьсодержащие препараты), удаление поражённых ветвей", 
    prevention: "Использование устойчивых сортов, избегание переувлажнения" 
  },
  { 
    id: 18, 
    name: "Персик___Здоровое", 
    treatment: "Лечение не требуется", 
    prevention: "Регулярная обрезка, подкормка, защита от вредителей" 
  },
  { 
    id: 19, 
    name: "Перец сладкий___Бактериальное пятно", 
    treatment: "Применение медьсодержащих препаратов, удаление поражённых листьев", 
    prevention: "Севооборот, использование здоровых семян, избегание переувлажнения" 
  },
  { 
    id: 20, 
    name: "Перец сладкий___Здоровое", 
    treatment: "Лечение не требуется", 
    prevention: "Севооборот, подкормка, контроль за влажностью" 
  },
  { 
    id: 21, 
    name: "Картофель___Ранний ожог", 
    treatment: "Применение фунгицидов (хлороталонил), удаление поражённых растений", 
    prevention: "Севооборот, использование устойчивых сортов, уборка остатков" 
  },
  { 
    id: 22, 
    name: "Картофель___Здоровое", 
    treatment: "Лечение не требуется", 
    prevention: "Севооборот, использование здорового посадочного материала, подкормка" 
  },
  { 
    id: 23, 
    name: "Картофель___Поздний ожог", 
    treatment: "Применение фунгицидов (манкоцеб), удаление поражённых растений", 
    prevention: "Севооборот, использование устойчивых сортов, контроль влажности" 
  },
  { 
    id: 24, 
    name: "Малина___Здоровое", 
    treatment: "Лечение не требуется", 
    prevention: "Регулярная обрезка, подкормка, защита от вредителей" 
  },
  { 
    id: 25, 
    name: "Соя___Здоровое", 
    treatment: "Лечение не требуется", 
    prevention: "Севооборот, подкормка, контроль за вредителями" 
  },
  { 
    id: 26, 
    name: "Кабачок___Мучнистая роса", 
    treatment: "Применение фунгицидов (сера, триадимефон), удаление поражённых листьев", 
    prevention: "Обеспечение вентиляции, избегание переувлажнения, севооборот" 
  },
  { 
    id: 27, 
    name: "Клубника___Здоровое", 
    treatment: "Лечение не требуется", 
    prevention: "Мульчирование, регулярный полив, защита от вредителей" 
  },
  { 
    id: 28, 
    name: "Клубника___Листовой ожог", 
    treatment: "Применение фунгицидов, удаление поражённых листьев", 
    prevention: "Севооборот, использование здоровых саженцев, контроль влажности" 
  },
  { 
    id: 29, 
    name: "Томат___Бактериальное пятно", 
    treatment: "Применение медьсодержащих препаратов, удаление поражённых листьев", 
    prevention: "Севооборот, использование здоровых семян, избегание переувлажнения" 
  },
  { 
    id: 30, 
    name: "Томат___Ранний ожог", 
    treatment: "Применение фунгицидов (хлороталонил), удаление поражённых растений", 
    prevention: "Севооборот, использование устойчивых сортов, уборка остатков" 
  },
  { 
    id: 31, 
    name: "Томат___Здоровое", 
    treatment: "Лечение не требуется", 
    prevention: "Севооборот, подкормка, контроль за влажностью" 
  },
  { 
    id: 32, 
    name: "Томат___Поздний ожог", 
    treatment: "Применение фунгицидов (манкоцеб), удаление поражённых растений", 
    prevention: "Севооборот, использование устойчивых сортов, контроль влажности" 
  },
  { 
    id: 33, 
    name: "Томат___Листовая плесень", 
    treatment: "Применение фунгицидов (азоксистробин), удаление поражённых листьев", 
    prevention: "Обеспечение вентиляции, избегание переувлажнения, севооборот" 
  },
  { 
    id: 34, 
    name: "Томат___Септориоз (пятнистость листьев)", 
    treatment: "Применение фунгицидов (хлороталонил), удаление поражённых листьев", 
    prevention: "Севооборот, уборка растительных остатков, контроль влажности" 
  },
  { 
    id: 35, 
    name: "Томат___Паутинный клещ Двупятнистый паутинный клещ", 
    treatment: "Применение акарицидов, повышение влажности, удаление поражённых листьев", 
    prevention: "Регулярный осмотр, поддержание высокой влажности, биологический контроль" 
  },
  { 
    id: 36, 
    name: "Томат___Таргетное пятно", 
    treatment: "Применение фунгицидов, удаление поражённых листьев", 
    prevention: "Севооборот, уборка остатков, контроль влажности" 
  },
  { 
    id: 37, 
    name: "Томат___Томатный мозаичный вирус", 
    treatment: "Удаление заражённых растений, дезинфекция инструментов", 
    prevention: "Использование устойчивых сортов, контроль насекомых-переносчиков" 
  },
  { 
    id: 38, 
    name: "Томат___Вирус жёлтой курчавости листьев томата", 
    treatment: "Удаление заражённых растений, контроль белокрылки", 
    prevention: "Использование сеток против насекомых, устойчивые сорта" 
  },
  { 
    id: 39, 
    name: "томат", 
    treatment: "Консультация с агрономом для уточнения диагноза", 
    prevention: "Регулярный осмотр растений, севооборот, подкормка" 
  }
];

// Pinia and Router
const plantsStore = usePlantsStore()
const router = useRouter()

// Camera Constraints
const constraints = ref({
	audio: false,
	video: {
		facingMode: 'environment',
		width: { ideal: 1280 },
		height: { ideal: 720 },
		aspectRatio: { ideal: 16 / 9 },
	},
})

// Stage Messages
const stageMessage = computed(() => {
	switch (plantsStore.stage) {
		case 'uploading':
			return 'Загрузка фото...'
		case 'processing':
			return 'Обработка изображения...'
		case 'searching':
			return is_diagnostic.value ? 'Диагностика листа...' : 'Поиск растения...'
		case 'done':
			return 'Завершено!'
		default:
			return ''
	}
})

// Progress Bar
const progressWidth = computed(() => {
	switch (plantsStore.stage) {
		case 'uploading':
			return '25%'
		case 'processing':
			return '50%'
		case 'searching':
			return '75%'
		case 'done':
			return '100%'
		default:
			return '0%'
	}
})

// Start Camera
const startCamera = async () => {
	try {
		const stream = await navigator.mediaDevices.getUserMedia(constraints.value)
		streamRef.value = stream
		video.value.srcObject = stream
		video.value.play()

		video.value.onloadedmetadata = () => {
			canvas.value.width = video.value.videoWidth
			canvas.value.height = video.value.videoHeight
			requestAnimationFrame(draw)
		}
	} catch (e) {
		console.warn('Ошибка доступа к камере:', e)
		plantsStore.error = 'Не удалось получить доступ к камере'
	}
}

// Draw Video to Canvas
const draw = () => {
	if (ctx.value && video.value && canvas.value) {
		ctx.value.imageSmoothingEnabled = true
		ctx.value.drawImage(
			video.value,
			0,
			0,
			canvas.value.width,
			canvas.value.height
		)
		requestAnimationFrame(draw)
	}
}

// Take Photo
const takePhoto = () => {
	if (canvas.value) {
		const photo = canvas.value.toDataURL('image/png', 1.0)
		previewPhoto.value = photo
	}
}

// Confirm Photo
const confirmPhoto = async () => {
	if (!previewPhoto.value) {
		console.error('No preview photo selected')
		plantsStore.error = 'Не выбрано изображение для обработки'
		return
	}

	// Check internet connectivity
	const isOnline = navigator.onLine

	if (isOnline) {
		// Online: Use backend endpoints
		plantsStore.stage = 'uploading'
		const response = await fetch(previewPhoto.value)
		const blob = await response.blob()
		const formData = new FormData()
		formData.append('photo', blob, 'photo.png')

		let result
		if (is_diagnostic.value) {
			plantsStore.stage = 'processing'
			window.ok.recognizeDiseaseClick(previewPhoto.value)
		} else {
			result = await plantsStore.identifyPlant(formData)
			if (result.success && result.data.probability < 0.2) {
				showRetryModal.value = true
				previewPhoto.value = null
				plantsStore.stage = ''
				return
			}
		}

		plantsStore.stage = 'done'
		if (result.success) {
			photos.value.push(previewPhoto.value)
			if (!is_diagnostic.value) {
				plantResult.value = result.data
			}
		} else {
			plantsStore.error = result.error
		}
	} else if (is_diagnostic.value && window.ok?.recognizeDiseaseClick) {
		// Offline: Use Android Java method for diagnosis
		plantsStore.stage = 'processing'
		window.ok.recognizeDiseaseClick(previewPhoto.value)
	} else {
		console.error('Offline mode only supported for diagnosis with Android')
		plantsStore.error =
			'Оффлайн-режим доступен только для диагностики на Android'
	}

	previewPhoto.value = null
}

// Cancel Photo
const cancelPhoto = () => {
	previewPhoto.value = null
}

// Open Gallery
const openGallery = () => {
	fileInput.value.click()
}

// Handle Gallery Photo
const handleGalleryPhoto = async event => {
	const file = event.target.files[0]
	if (file) {
		const reader = new FileReader()
		reader.onload = async () => {
			const dataURL = reader.result
			const isOnline = navigator.onLine

			if (isOnline) {
				// Online: Use backend endpoints
				plantsStore.stage = 'uploading'
				const formData = new FormData()
				formData.append('photo', file)

				let result
				if (is_diagnostic.value) {
					result = await plantsStore.diagnoseLeaf(formData)
				} else {
					result = await plantsStore.identifyPlant(formData)
					if (result.success && result.data.probability < 0.2) {
						showRetryModal.value = true
						plantsStore.stage = ''
						return
					}
				}

				plantsStore.stage = 'done'
				if (result.success) {
					photos.value.push(dataURL)
					if (!is_diagnostic.value) {
						plantResult.value = result.data
					}
				} else {
					plantsStore.error = result.error
				}
			} else if (is_diagnostic.value && window.ok?.recognizeDiseaseClick) {
				// Offline: Use Android Java method for diagnosis
				plantsStore.stage = 'processing'
				window.ok.recognizeDiseaseClick(dataURL)
			} else {
				console.error('Offline mode only supported for diagnosis with Android')
				plantsStore.error =
					'Оффлайн-режим доступен только для диагностики на Android'
			}
		}
		reader.readAsDataURL(file)
		fileInput.value.value = null
	}
}

// Toggle Camera
const toggleCamera = async () => {
	stopCamera()
	facingMode.value = facingMode.value === 'user' ? 'environment' : 'user'
	constraints.value.video.facingMode = facingMode.value
	await startCamera()
}

// Toggle Gallery
const toggleGallery = () => {
	showGallery.value = !showGallery.value
}

// Stop Camera
const stopCamera = () => {
	if (streamRef.value) {
		streamRef.value.getTracks().forEach(track => track.stop())
		streamRef.value = null
		video.value.srcObject = null
	}
}

// View Plant Details
const viewPlantDetails = () => {
	if (plantResult.value && plantResult.value.id) {
		router.push(`/plant/${plantResult.value.id}`)
	}
}

// Lifecycle Hooks
onMounted(() => {
	if (video.value && canvas.value) {
		ctx.value = canvas.value.getContext('2d')
		startCamera()
	}

	// Set up Android callback for disease prediction
	window.handlePredictionResult = resultDiseases => {
		if (resultDiseases && typeof resultDiseases === 'string') {
			const classId = parseInt(resultDiseases.split(' ')[1]?.trim(), 10)
			if (!isNaN(classId)) {
				resultDisease.value = classId
				plantsStore.stage = 'done'
			} else {
				plantsStore.error =
					'Не удалось определить заболевание: неверный формат результата'
			}
		} else {
			plantsStore.error =
				'Не удалось определить заболевание: результат отсутствует'
		}
	}
})

onBeforeUnmount(() => {
	stopCamera()
	delete window.handlePredictionResult
})
</script>

<style scoped>
/* Fade-slide transition for elements */
.fade-slide-enter-active {
	transition: all 0.5s ease;
	transition-delay: calc(0.1s * var(--transition-index));
}

.fade-slide-enter-from {
	opacity: 0;
	transform: translateY(20px);
}

.fade-slide-enter-to {
	opacity: 1;
	transform: translateY(0);
}

/* Fade transition for modals */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}

/* Staggered transitions for elements */
div {
	--transition-index: 0;
}

div:nth-child(1) {
	--transition-index: 1;
}

div:nth-child(2) {
	--transition-index: 2;
}

div:nth-child(3) {
	--transition-index: 3;
}

div:nth-child(4) {
	--transition-index: 4;
}

/* Ensure canvas fills the screen */
canvas {
	object-fit: cover;
}
</style>
