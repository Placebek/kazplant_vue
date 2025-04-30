<template>
  <div class="relative min-h-screen bg-white overflow-hidden">
    <!-- Фоновый SVG -->
    
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <svg
        viewBox="0 0 360 374"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M-82.2908 148.306C-91.9072 53.9304 -61.4121 -60.3311 21.0274 -99.7599C97.4636 -136.317 161.238 -23.3334 243.935 -7.71953C337.961 10.0333 471.072 -94.3343 516.364 -6.23623C561.092 80.7655 420.28 146.665 364.129 226.073C329.01 275.739 311.949 340.627 256.379 361.429C192.944 385.176 123.358 374.158 65.6145 337.821C-4.64163 293.609 -73.5939 233.658 -82.2908 148.306Z"
          fill="#129C52"
          fill-opacity="0.12"
        />
      </svg>
    </div>
    <!-- Контент слайда -->
    <transition name="fade" mode="out-in">
      <div :key="is_active" class="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <template v-if="is_active <= 3">
          <img
            :src="slideImage"
            alt="Slide"
            class="w-[90%] mt-20 z-10"
          />
          <div class="mt-[8vh]">
            <p class="font-semibold text-[4vh] leading-8 text-gray-800">
              {{ slideTitle }}
            </p>
            <p class="text-[2vh] text-[#A7A7A7] mt-6 leading-7 max-w-[80%] mx-auto">
              {{ slideDescription1 }}
            </p>
          </div>
        </template>

        <template v-else>
          <div class="flex flex-col items-center mt-20">
            <h1 class="text-[50px] leading-10 font-bold text-[#129C52]">Добро пожаловать!</h1>

                <img src="../../assets/img/plant.png" alt="" class="ml-16 ">
            
          </div>
        </template>
      </div>
    </transition>

    <!-- Навигация -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 mb-[5vh] w-full px-10">
      <div v-if="is_active <= 3" class="flex flex-row justify-between items-center">
        <div class="flex flex-row gap-3">
          <div
            v-for="index in 3"
            :key="index"
            class="w-3 h-3 rounded-full cursor-pointer transition-colors duration-300"
            :class="is_active === index ? 'bg-[#129C52]' : 'bg-gray-300'"
            @click="is_active = index"
          ></div>
        </div>
        <button
          @click="nextSlide"
          class="py-2 px-5 rounded-[30px] bg-[#129C52] text-white text-[2vh] flex items-center gap-2 shadow-md hover:brightness-110 transition"
        >
          Дальше
        </button>
      </div>

      <div v-else class="flex justify-center">
        <button
          @click="startApp"
          class="w-full py-3 rounded-[30px] bg-[#129C52]  text-white text-[2.5vh] font-semibold shadow-2xl shadow-[#129C52] hover:brightness-110 transition"
        >
          Давайте начнем
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import firstSlideImg from '@/assets/img/first-slide-img.png';
import secondSlideImg from '@/assets/img/second-slide-img.png';
import thirdSlideImg from '@/assets/img/third-slide-img.png';

const is_active = ref(1);
const router = useRouter();

const slides = {
  1: {
    title: 'Никогда больше не убьете растения!',
    description1: 'С помощью KazPlant вы сможете легко и быстро определить болезни растений и получить советы по уходу за ними.',
    image: firstSlideImg,
  },
  2: {
    title: 'Сканируйте, чтобы узнать свои растения',
    description1: 'Сканируйте свои растения и/или просматривайте библиотеку растений, чтобы создать свой цифровой сад.',
    image: secondSlideImg,
  },
  3: {
    title: 'Узнайте больше о растениях',
    description1: 'Узнайте больше о здоровье растений и руководстве по уходу за ними.',
    image: thirdSlideImg,
  },
};

const slideTitle = computed(() => slides[is_active.value]?.title || '');
const slideDescription1 = computed(() => slides[is_active.value]?.description1 || '');
const slideImage = computed(() => slides[is_active.value]?.image || '');

const nextSlide = () => {
  is_active.value++;
};

const startApp = () => {
  router.push('/login');
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
