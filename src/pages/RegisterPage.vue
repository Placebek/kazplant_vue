<template>
	<div class="min-h-screen bg-white">
		<!-- Back button -->
		<router-link to="/home" class="absolute z-10 top-4 left-4">
			<button>
				<svg
					width="34"
					height="34"
					viewBox="0 0 34 34"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="34" height="34" rx="17" fill="#C4E4E0" />
					<path
						d="M11.4 24L10 22.6L15.6 17L10 11.4L11.4 10L17 15.6L22.6 10L24 11.4L18.4 17L24 22.6L22.6 24L17 18.4L11.4 24Z"
						fill="#169C89"
					/>
				</svg>
			</button>
		</router-link>

		<!-- Decorative SVGs -->
		<div class="absolute top-0 right-0">
			<svg
				width="252"
				height="236"
				viewBox="0 0 252 236"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle opacity="0.2" cx="206" cy="30" r="206" fill="#169C89" />
			</svg>
		</div>
		<div class="absolute top-0 left-0">
			<svg
				width="412"
				height="358"
				viewBox="0 0 412 358"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="73.5"
					cy="-17.5"
					r="375.5"
					fill="url(#paint0_radial_1_196)"
				/>
				<defs>
					<radialGradient
						id="paint0_radial_1_196"
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(73.5 -17.5) rotate(90) scale(375.5)"
					>
						<stop stop-color="#C1F6F0" />
						<stop offset="1" stop-color="#DDF6F3" stop-opacity="0" />
					</radialGradient>
				</defs>
			</svg>
		</div>

		<!-- Register image -->
		<div class="relative flex justify-center">
			<img
				src="@/assets/img/auth/register.png"
				alt="register"
				class="w-[282px] h-[245px]"
			/>
		</div>

		<!-- Form section -->
		<div class="flex flex-col items-center">
			<div class="mb-[10px] text-center">
				<div class="text-[#169C89] font-medium text-[26px] leading-7">
					Регистрация
				</div>
				<div class="text-[#999999] text-[18px]">
					Создай аккаунт, чтобы пройти дальше.
				</div>
			</div>
			<form class="flex flex-col gap-y-[10px]" @submit.prevent="register">
				<!-- Username input -->
				<div class="relative w-[343px]">
					<span
						class="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C7C7C7]"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.5 17.38 16.93 18.28C15.5294 19.396 13.7909 20.0026 12 20C10.14 20 8.43 19.36 7.07 18.28ZM18.36 16.83C16.93 15.09 13.46 14.5 12 14.5C10.54 14.5 7.07 15.09 5.64 16.83C4.57618 15.4446 3.99967 13.7467 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 13.82 19.38 15.5 18.36 16.83ZM12 6C10.06 6 8.5 7.56 8.5 9.5C8.5 11.44 10.06 13 12 13C13.94 13 15.5 11.44 15.5 9.5C15.5 7.56 13.94 6 12 6ZM12 11C11.6022 11 11.2206 10.842 10.9393 10.5607C10.658 10.2794 10.5 9.89782 10.5 9.5C10.5 9.10218 10.658 8.72064 10.9393 8.43934C11.2206 8.15804 11.6022 8 12 8C12.3978 8 12.7794 8.15804 13.0607 8.43934C13.342 8.72064 13.5 9.10218 13.5 9.5C13.5 9.89782 13.342 10.2794 13.0607 10.5607C12.7794 10.842 12.3978 11 12 11Z"
								fill="#B1B1B1"
							/>
						</svg>
					</span>
					<input
						v-model="form.username"
						type="text"
						placeholder="Имя пользователя"
						class="border-2 border-[#DDDDDD] w-[343px] h-[58px] bg-[#F8F8F8] rounded-[10px] pl-[48px] placeholder:text-[#C7C7C7] placeholder:leading-3"
						:class="{ 'border-red-500': errors.username }"
						@input="clearError('username')"
					/>
					<p v-if="errors.username" class="text-red-500 text-sm mt-1">
						{{ errors.username }}
					</p>
				</div>

				<!-- Full Name input -->
				<div class="relative w-[343px]">
					<span
						class="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C7C7C7]"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.5 17.38 16.93 18.28C15.5294 19.396 13.7909 20.0026 12 20C10.14 20 8.43 19.36 7.07 18.28ZM18.36 16.83C16.93 15.09 13.46 14.5 12 14.5C10.54 14.5 7.07 15.09 5.64 16.83C4.57618 15.4446 3.99967 13.7467 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 13.82 19.38 15.5 18.36 16.83ZM12 6C10.06 6 8.5 7.56 8.5 9.5C8.5 11.44 10.06 13 12 13C13.94 13 15.5 11.44 15.5 9.5C15.5 7.56 13.94 6 12 6ZM12 11C11.6022 11 11.2206 10.842 10.9393 10.5607C10.658 10.2794 10.5 9.89782 10.5 9.5C10.5 9.10218 10.658 8.72064 10.9393 8.43934C11.2206 8.15804 11.6022 8 12 8C12.3978 8 12.7794 8.15804 13.0607 8.43934C13.342 8.72064 13.5 9.10218 13.5 9.5C13.5 9.89782 13.342 10.2794 13.0607 10.5607C12.7794 10.842 12.3978 11 12 11Z"
								fill="#B1B1B1"
							/>
						</svg>
					</span>
					<input
						v-model="form.full_name"
						type="text"
						placeholder="Полное имя"
						class="border-2 border-[#DDDDDD] w-[343px] h-[58px] bg-[#F8F8F8] rounded-[10px] pl-[48px] placeholder:text-[#C7C7C7] placeholder:leading-3"
						:class="{ 'border-red-500': errors.full_name }"
						@input="clearError('full_name')"
					/>
					<p v-if="errors.full_name" class="text-red-500 text-sm mt-1">
						{{ errors.full_name }}
					</p>
				</div>

				<!-- Email input -->
				<div class="relative w-[343px]">
					<span
						class="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C7C7C7]"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
								fill="#B1B1B1"
							/>
						</svg>
					</span>
					<input
						v-model="form.email"
						type="email"
						placeholder="Электронный адрес"
						class="border-2 border-[#DDDDDD] w-[343px] h-[58px] bg-[#F8F8F8] rounded-[10px] pl-[48px] placeholder:text-[#C7C7C7] placeholder:leading-3"
						:class="{ 'border-red-500': errors.email }"
						@input="clearError('email')"
					/>
					<p v-if="errors.email" class="text-red-500 text-sm mt-1">
						{{ errors.email }}
					</p>
				</div>

				<!-- Password input -->
				<div class="relative w-[343px]">
					<span
						class="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C7C7C7]"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 17C11.4696 17 10.9609 16.7893 10.5858 16.4142C10.2107 16.0391 10 15.5304 10 15C10 13.89 10.89 13 12 13C12.5304 13 13.0391 13.2107 13.4142 13.5858C13.7893 13.9609 14 14.4696 14 15C14 15.5304 13.7893 16.0391 13.4142 16.4142C13.0391 16.7893 12.5304 17 12 17ZM18 20V10H6V20H18ZM18 8C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V10C4 8.89 4.89 8 6 8H7V6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1C12.6566 1 13.3068 1.12933 13.9134 1.3806C14.52 1.63188 15.0712 2.00017 15.5355 2.46447C15.9998 2.92876 16.3681 3.47995 16.6194 4.08658C16.8707 4.69321 17 5.34339 17 6V8H18ZM12 3C11.2044 3 10.4413 3.31607 9.87868 3.87868C9.31607 4.44129 9 5.20435 9 6V8H15V6C15 5.20435 14.6839 4.44129 14.1213 3.87868C13.5587 3.31607 12.7956 3 12 3Z"
								fill="#B1B1B1"
							/>
						</svg>
					</span>
					<input
						v-model="form.password"
						:type="showPassword ? 'text' : 'password'"
						placeholder="Пароль"
						class="border-2 border-[#DDDDDD] w-[343px] h-[58px] bg-[#F8F8F8] rounded-[10px] pl-[48px] pr-[48px] placeholder:text-[#C7C7C7] placeholder:leading-3"
						:class="{ 'border-red-500': errors.password }"
						@input="clearError('password')"
					/>
					<span
						class="absolute right-4 top-1/2 -translate-y-1/2 text-[#C7C7C7] cursor-pointer"
						@click="showPassword = !showPassword"
					>
						<svg
							v-if="showPassword"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
								stroke="#B1B1B1"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
								stroke="#B1B1B1"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<svg
							v-else
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2 5.27L3.28 4L20 20.72L18.73 22L15.65 18.92C14.5 19.3 13.28 19.5 12 19.5C7 19.5 2.73 16.39 1 12C1.69 10.24 2.79 8.69 4.19 7.46L2 5.27ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15.0005 12.3406 14.943 12.6787 14.83 13L11 9.17C11.3213 9.05698 11.6594 8.99949 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C22.1839 14.0732 20.7969 15.8727 19 17.19L17.58 15.76C18.9629 14.8034 20.0782 13.5091 20.82 12C20.0116 10.3499 18.7564 8.95977 17.1973 7.9875C15.6381 7.01524 13.8375 6.49988 12 6.5C10.91 6.5 9.84 6.68 8.84 7L7.3 5.47C8.74 4.85 10.33 4.5 12 4.5ZM3.18 12C3.98844 13.6501 5.24357 15.0402 6.80273 16.0125C8.36189 16.9848 10.1625 17.5001 12 17.5C12.69 17.5 13.37 17.43 14 17.29L11.72 15C11.0242 14.9254 10.3748 14.6149 9.87997 14.12C9.38512 13.6252 9.07458 12.9758 9 12.28L5.6 8.87C4.61 9.72 3.78 10.78 3.18 12Z"
								fill="#169C89"
							/>
						</svg>
					</span>
					<p v-if="errors.password" class="text-red-500 text-sm mt-1">
						{{ errors.password }}
					</p>
				</div>

				<!-- Confirm Password input -->
				<div class="relative w-[343px]">
					<span
						class="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C7C7C7]"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 17C11.4696 17 10.9609 16.7893 10.5858 16.4142C10.2107 16.0391 10 15.5304 10 15C10 13.89 10.89 13 12 13C12.5304 13 13.0391 13.2107 13.4142 13.5858C13.7893 13.9609 14 14.4696 14 15C14 15.5304 13.7893 16.0391 13.4142 16.4142C13.0391 16.7893 12.5304 17 12 17ZM18 20V10H6V20H18ZM18 8C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V10C4 8.89 4.89 8 6 8H7V6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1C12.6566 1 13.3068 1.12933 13.9134 1.3806C14.52 1.63188 15.0712 2.00017 15.5355 2.46447C15.9998 2.92876 16.3681 3.47995 16.6194 4.08658C16.8707 4.69321 17 5.34339 17 6V8H18ZM12 3C11.2044 3 10.4413 3.31607 9.87868 3.87868C9.31607 4.44129 9 5.20435 9 6V8H15V6C15 5.20435 14.6839 4.44129 14.1213 3.87868C13.5587 3.31607 12.7956 3 12 3Z"
								fill="#B1B1B1"
							/>
						</svg>
					</span>
					<input
						v-model="form.confirm_password"
						:type="showPassword ? 'text' : 'password'"
						placeholder="Подтвердите пароль"
						class="border-2 border-[#DDDDDD] w-[343px] h-[58px] bg-[#F8F8F8] rounded-[10px] pl-[48px] pr-[48px] placeholder:text-[#C7C7C7] placeholder:leading-3"
						:class="{ 'border-red-500': errors.confirm_password }"
						@input="clearError('confirm_password')"
					/>
					<span
						class="absolute right-4 top-1/2 -translate-y-1/2 text-[#C7C7C7] cursor-pointer"
						@click="showPassword = !showPassword"
					>
						<svg
							v-if="showPassword"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
								stroke="#B1B1B1"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
								stroke="#B1B1B1"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<svg
							v-else
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2 5.27L3.28 4L20 20.72L18.73 22L15.65 18.92C14.5 19.3 13.28 19.5 12 19.5C7 19.5 2.73 16.39 1 12C1.69 10.24 2.79 8.69 4.19 7.46L2 5.27ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15.0005 12.3406 14.943 12.6787 14.83 13L11 9.17C11.3213 9.05698 11.6594 8.99949 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C22.1839 14.0732 20.7969 15.8727 19 17.19L17.58 15.76C18.9629 14.8034 20.0782 13.5091 20.82 12C20.0116 10.3499 18.7564 8.95977 17.1973 7.9875C15.6381 7.01524 13.8375 6.49988 12 6.5C10.91 6.5 9.84 6.68 8.84 7L7.3 5.47C8.74 4.85 10.33 4.5 12 4.5ZM3.18 12C3.98844 13.6501 5.24357 15.0402 6.80273 16.0125C8.36189 16.9848 10.1625 17.5001 12 17.5C12.69 17.5 13.37 17.43 14 17.29L11.72 15C11.0242 14.9254 10.3748 14.6149 9.87997 14.12C9.38512 13.6252 9.07458 12.9758 9 12.28L5.6 8.87C4.61 9.72 3.78 10.78 3.18 12Z"
								fill="#169C89"
							/>
						</svg>
					</span>
					<p v-if="errors.confirm_password" class="text-red-500 text-sm mt-1">
						{{ errors.confirm_password }}
					</p>
				</div>

				<!-- Register button -->
				<button
					type="submit"
					class="bg-[#169C89] text-white w-[343px] h-[58px] text-[20px] mt-[20px] rounded-md flex items-center justify-center"
					:disabled="plantsStore.loading"
				>
					<span v-if="!plantsStore.loading">Зарегистрироваться</span>
					<span v-else class="flex items-center gap-2">
						Регистрация
						<span class="typing-dots">
							<span>.</span><span>.</span><span>.</span>
						</span>
					</span>
				</button>
			</form>
		</div>

		<!-- Footer -->

		<!-- Error Modal -->
		<div
			v-if="plantsStore.error"
			class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
		>
			<div class="bg-white p-6 rounded-lg max-w-md w-full text-center">
				<p class="text-red-500">{{ plantsStore.error }}</p>
				<button
					@click="plantsStore.error = null"
					class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300 mt-4"
				>
					Закрыть
				</button>
			</div>
		</div>
	</div>
  <div
    class="bg-[#E8F3F2] w-full h-[80px] flex justify-center flex-row gap-2 items-center"
  >
    <div class="text-[#999999] text-[18px]">Уже есть аккаунт?</div>
    <router-link to="/login" class="text-[#169C89] text-[18px]">
      Войти
    </router-link>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const plantsStore = useAuthStore()

const showPassword = ref(false)

const form = reactive({
	username: '',
	full_name: '',
	email: '',
	password: '',
	confirm_password: '',
})

const errors = reactive({
	username: '',
	full_name: '',
	email: '',
	password: '',
	confirm_password: '',
})

const clearError = field => {
	errors[field] = ''
}

const validateForm = () => {
	let isValid = true
	errors.username = ''
	errors.full_name = ''
	errors.email = ''
	errors.password = ''
	errors.confirm_password = ''

	if (!form.username.trim()) {
		errors.username = 'Имя пользователя обязательно'
		isValid = false
	}

	if (!form.full_name.trim()) {
		errors.full_name = 'Полное имя обязательно'
		isValid = false
	}

	if (!form.email.trim()) {
		errors.email = 'Электронный адрес обязателен'
		isValid = false
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
		errors.email = 'Неверный формат email'
		isValid = false
	}

	if (!form.password) {
		errors.password = 'Пароль обязателен'
		isValid = false
	} else if (form.password.length < 6) {
		errors.password = 'Пароль должен содержать минимум 6 символов'
		isValid = false
	}

	if (!form.confirm_password) {
		errors.confirm_password = 'Подтверждение пароля обязательно'
		isValid = false
	} else if (form.password !== form.confirm_password) {
		errors.confirm_password = 'Пароли не совпадают'
		isValid = false
	}

	return isValid
}

const register = async () => {
	if (!validateForm()) return

	const result = await plantsStore.registerUser({
		username: form.username,
		full_name: form.full_name,
		email: form.email,
		password: form.password,
	})

	if (result.success) {
		router.push('/home')
	}
}
</script>

<style scoped>
/* Стили для лоадера "печатает" */
.typing-dots {
	display: inline-flex;
	align-items: center;
}

.typing-dots span {
	animation: typing 1.4s infinite;
	font-size: 1.5em;
	line-height: 1;
}

.typing-dots span:nth-child(2) {
	animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
	animation-delay: 0.4s;
}

@keyframes typing {
	0%,
	60% {
		opacity: 1;
	}
	30% {
		opacity: 0.2;
	}
}
</style>
