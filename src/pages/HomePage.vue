<template>
	<div class="min-w-[100vw] bg-[#129C52] p-4 text-xl text-white">
		Напоминалки
	</div>
	<div class="p-5">
		<div
			v-if="countPlant === 0"
			class="flex justify-center items-center min-h-full flex-col gap-3"
		>
			<img src="../assets/img/home/plant.png" alt="" class="w-[60vw]" />
			<p class="text-[3.5vh] text-center font-semibold">Давайте начнем</p>
			<p class="text-center">
				Получите профессиональные рекомендации по уходу за растениями, чтобы
				сохранить их живыми!
			</p>
			<router-link to="/scan">
				<button
					class="bg-[#129C52] text-white font-bold py-2 min-w-[90vw] justify-center items-center rounded-full flex flex-row gap-4"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						viewBox="0 0 24 24"
					>
						<path fill="#fff" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
					</svg>
					Добавить растение
				</button>
			</router-link>
		</div>
		<div>
			<div
				v-if="countPlant > 0"
				class="flex min-h-full flex-col gap-3"
			>
				<p class="text-[3.5vh] font-semibold">
					Задачи для вас
				</p>
				<p class="text-center">
					Получите профессиональные рекомендации по уходу за растениями, чтобы
					сохранить их живыми!
				</p>
			</div>
		</div>
	</div>
	<MenuBar :active="1" />
</template>

<script setup>
import MenuBar from '@/components/menu/MenuBar.vue'
import { ref } from 'vue'

const countPlant = ref(1)
</script>
