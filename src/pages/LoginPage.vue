<template>
  <div class="relative h-screen">
    <!-- Кнопка назад -->
    <router-link to="/" class="absolute z-10 top-4 left-4">
      <button>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="34" height="34" rx="17" fill="#C4E4E0" />
          <path d="M11.4 24L10 22.6L15.6 17L10 11.4L11.4 10L17 15.6L22.6 10L24 11.4L18.4 17L24 22.6L22.6 24L17 18.4L11.4 24Z" fill="#169C89" />
        </svg>
      </button>
    </router-link>

    <!-- SVG-украшения -->
    <div class="absolute top-0 right-0">
      <svg width="252" height="236" viewBox="0 0 252 236" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle opacity="0.2" cx="206" cy="30" r="206" fill="#169C89" />
      </svg>
    </div>

    <div class="absolute top-0 left-0">
      <svg width="393" height="358" viewBox="0 0 393 358" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="73.5" cy="-17.5" r="375.5" fill="url(#paint0_radial_1_196)" />
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

    <!-- Картинка входа -->
    <transition name="image">
      <img
        :key="loginImg"
        :src="loginImg"
        alt="login"
        class="relative z-10 w-[251px] h-[251px] mx-auto"
      />
    </transition>

    <!-- Форма входа -->
    <transition name="container">
      <div class="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="mb-[30px] text-center">
          <div class="text-[#169C89] font-medium text-[31px] leading-6">С возвращением!</div>
          <div class="text-[#999999] text-[22px]">Введите свои данные для входа</div>
        </div>

        <div class="flex flex-col gap-y-[10px]">
          <!-- Поле логина -->
          <div class="relative w-[343px]">
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C7C7C7]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#B1B1B1" d="M6.578 15.482c-1.415.842-5.125 2.562-2.865 4.715C4.816 21.248 6.045 22 7.59 22h8.818c1.546 0 2.775-.752 3.878-1.803c2.26-2.153-1.45-3.873-2.865-4.715a10.66 10.66 0 0 0-10.844 0M16.5 6.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0" /></svg>
            </span>
            <input
              type="text"
              placeholder="Имя пользователя"
              v-model="username"
              class="border-2 border-[#DDDDDD] w-full h-[58px] bg-[#F8F8F8] rounded-[10px] pl-[48px] placeholder:text-[#C7C7C7] placeholder:leading-3 focus:scale-[1.02] transition-transform duration-300"
            />
          </div>

          <!-- Поле пароля -->
          <div class="relative w-[343px]">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#C7C7C7]">
              <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 17C11.47 17 10.96 16.79 10.59 16.41C10.21 16.04 10 15.53 10 15C10 13.89 10.89 13 12 13C13.11 13 14 13.89 14 15C14 15.53 13.79 16.04 13.41 16.41C13.04 16.79 12.53 17 12 17ZM18 20V10H6V20H18ZM18 8C19.11 8 20 8.89 20 10V20C20 21.1 19.11 22 18 22H6C4.89 22 4 21.1 4 20V10C4 8.89 4.89 8 6 8H7V6C7 4.68 7.53 3.4 8.46 2.46C9.4 1.53 10.67 1 12 1C13.33 1 14.6 1.53 15.54 2.46C16.47 3.4 17 4.68 17 6V8H18ZM12 3C11.2 3 10.44 3.32 9.88 3.88C9.32 4.44 9 5.2 9 6V8H15V6C15 5.2 14.68 4.44 14.12 3.88C13.56 3.32 12.8 3 12 3Z" fill="#B1B1B1"/></svg>
            </span>
            <input
              :type="showPassword ? 'text' : 'password'"
              placeholder="Пароль"
              v-model="password"
              class="border-2 border-[#DDDDDD] w-full h-[58px] bg-[#F8F8F8] rounded-[10px] pl-[48px] pr-[48px] placeholder:text-[#C7C7C7] placeholder:leading-3 focus:scale-[1.02] transition-transform duration-300"
            />
            <span
              class="absolute right-4 top-1/2 -translate-y-1/2 text-[#C7C7C7] cursor-pointer"
              @click="togglePasswordVisibility"
            >
              <svg v-if="showPassword" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 5.27L3.28 4L20 20.72L18.73 22L15.65 18.92C14.5 19.3 13.28 19.5 12 19.5C7 19.5 2.73 16.39 1 12C1.69 10.24 2.79 8.69 4.19 7.46L2 5.27ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15.0005 12.3406 14.943 12.6787 14.83 13L11 9.17C11.3213 9.05698 11.6594 8.99949 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C22.1839 14.0732 20.7969 15.8727 19 17.19L17.58 15.76C18.9629 14.8034 20.0782 13.5091 20.82 12C20.0116 10.3499 18.7564 8.95977 17.1973 7.9875C15.6381 7.01524 13.8375 6.49988 12 6.5C10.91 6.5 9.84 6.68 8.84 7L7.3 5.47C8.74 4.85 10.33 4.5 12 4.5ZM3.18 12C3.98844 13.6501 5.24357 15.0402 6.80273 16.0125C8.36189 16.9848 10.1625 17.5001 12 17.5C12.69 17.5 13.37 17.43 14 17.29L11.72 15C11.0242 14.9254 10.3748 14.6149 9.87997 14.12C9.38512 13.6252 9.07458 12.9758 9 12.28L5.6 8.87C4.61 9.72 3.78 10.78 3.18 12Z"
                  fill="#169C89"
                />
              </svg>
            </span>
          </div>
          <button
            @click="login"
            class="bg-[#169C89] text-white w-[343px] h-[58px] text-[20px] mt-[30px] rounded-md hover:scale-[1.05] active:scale-[0.95] transition-transform duration-300"
          >
            Войти
          </button>
          <!-- Сообщение об ошибке -->
          <div v-if="errorMessage" class="text-red-500 text-[16px] mt-2 text-center">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </transition>
    <div class="absolute bottom-0 bg-[#E8F3F2] w-full h-[80px] flex justify-center items-center">
      <div class="text-[#999999] text-[18px]">Нет аккаунта?</div>
      <router-link to="/register" class="text-[#169C89] text-[18px] ml-2">
        Зарегистрироваться
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import loginImg from '../assets/img/auth/login.png'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const router = useRouter()

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const login = async () => {
  try {
    const response = await axios.post('https://pystorm.space//v1/authlogin-user', {
      username: username.value,
      password: password.value
    })
    // Сохраняем токен и время истечения
    localStorage.setItem('access_token', response.data.access_token)
    localStorage.setItem('access_token_expire_time', response.data.access_token_expire_time)
    // Перенаправляем на главную страницу
    router.push('/home')
  } catch (error) {
    // Обрабатываем ошибки
    if (error.response) {
      errorMessage.value = error.response.data.detail || 'Ошибка авторизации'
    } else {
      errorMessage.value = 'Не удалось подключиться к серверу'
    }
  }
}
</script>

<style scoped>
.image-enter-active,
.image-leave-active,
.container-enter-active,
.container-leave-active {
  transition: all 0.5s ease;
}
.image-enter-from,
.image-leave-to,
.container-enter-from,
.container-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>