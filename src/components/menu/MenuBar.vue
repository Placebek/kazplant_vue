<template>
	<div
		class="fixed bottom-0 bg-white shadow-custom-top w-full min-h-[70px] p-1 flex flex-row justify-between px-7 items-center"
	>
		<!-- First element (Home) -->
		<router-link
			to="/home"
			class="flex flex-col gap-1 transition-transform duration-500 ease-in-out"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="35"
				height="35"
                :class="{ 'scale-125 ': active === 1 }"
				viewBox="0 0 24 24"
			>
				<path
					:fill="active === 1 ? '#129C52' : '#525252'"
					d="M12 20a7 7 0 0 1-7-7a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7m0-16a9 9 0 0 0-9 9a9 9 0 0 0 9 9a9 9 0 0 0 9-9a9 9 0 0 0-9-9m.5 4H11v6l4.75 2.85l.75-1.23l-4-2.37zM7.88 3.39L6.6 1.86L2 5.71l1.29 1.53zM22 5.72l-4.6-3.86l-1.29 1.53l4.6 3.86z"
				/>
			</svg>
		</router-link>

		<!-- Second element (Search) -->
		<router-link
			to="/search"
			class="mr-3 transition-transform duration-300 ease-in-out"
			:class="{ 'scale-125': active === 2 }"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="35"
				height="35"
				viewBox="0 0 24 24"
			>
				<path
					:fill="active === 2 ? '#129C52' : '#525252'"
					d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
				/>
			</svg>
		</router-link>

		<!-- Third element (Scanner, always green, no scaling) -->
		<router-link to="/scan" class="">
			<div class="rounded-full bg-[#129C52] p-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="35"
					height="35"
					viewBox="0 0 24 24"
				>
					<path
						fill="none"
						stroke="#fff"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.5"
						d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2m4-5h10"
					/>
				</svg>
			</div>
		</router-link>

		<!-- Fourth element (List) -->
		<router-link
			to="/plant"
			class="ml-3 transition-transform duration-300 ease-in-out"
			:class="{ 'scale-125': active === 3 }"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="35"
				height="35"
				viewBox="0 0 16 16"
			>
				<path
					fill="none"
					:stroke="active === 3 ? '#129C52' : '#525252'"
					stroke-linejoin="round"
					d="M4 8h6M4 5.5h6m1 0h1M11 8h1m-1 2.5h1m-8 0h6m-7.5-8h11v11h-11z"
					stroke-width="1.4"
				/>
			</svg>
		</router-link>

		<!-- Fifth element (Profile) -->
		<router-link
			to="/my-plants"
			class="transition-transform duration-300 ease-in-out"
			:class="{ 'scale-125': active === 4 }"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="35"
				height="35"
				viewBox="0 0 24 24"
			>
				<path
					:fill="active === 4 ? '#129C52' : '#525252'"
					d="M5.998 2a7 7 0 0 1 6.197 3.741A6.49 6.49 0 0 1 17.498 3h3.5v2.5a6.5 6.5 0 0 1-6.5 6.5h-1.5v1h5v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-7h5v-2h-2a7 7 0 0 1-7-7V2zm10 13h-8v5h8zm3-10h-1.5a4.5 4.5 0 0 0-4.5 4.5v.5h1.5a4.5 4.5 0 0 0 4.5-4.5zm-13-1h-2a5 5 0 0 0 5 5h2a5 5 0 0 0-5-5"
				/>
			</svg>
		</router-link>
	</div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
	active: {
		type: Number,
		default: 0,
	},
})
</script>

<style scoped>
.transition-transform {
	transform-origin: center;
}
</style>
