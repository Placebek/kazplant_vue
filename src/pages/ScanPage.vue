<template>
  <div class="">
    <div class="camera-container relative">
      <!-- Заголовок и кнопки -->
      <div class="bg-[#129C52] p-4 flex items-center justify-between fixed w-full z-10">
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

      <!-- Метка фокуса -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="380"
          height="380"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="20"
            d="M336 448h56a56 56 0 0 0 56-56v-56m0-160v-56a56 56 0 0 0-56-56h-56M176 448h-56a56 56 0 0 1-56-56v-56m0-160v-56a56 56 0 0 1 56-56h56"
          />
        </svg>
      </div>

      <!-- Видео и канвас -->
      <video
        ref="video"
        autoplay
        playsinline
        webkit-playsinline
        muted
        class="hidden"
      ></video>
      <canvas ref="canvas" class="bg-black w-[100vw] h-full"></canvas>

      <!-- Предварительный просмотр снимка -->
      <div
        v-if="previewPhoto"
        class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      >
        <div class="relative max-w-md w-full p-4 flex flex-col justify-center items-center">
          <img
            :src="previewPhoto"
            alt="Предпросмотр"
            class="w-[80vw] h-[80vw] object-cover rounded-lg"
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

      <!-- Этапы загрузки и обработки -->
      <div
        v-if="plantsStore.loading"
        class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg max-w-md w-full text-center">
          <h2 class="text-xl font-bold mb-4">Обработка...</h2>
          <div class="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="absolute h-full bg-green-500 transition-all duration-300"
              :style="{ width: progressWidth }"
            ></div>
          </div>
          <p class="mt-2 text-gray-600">{{ stageMessage }}</p>
        </div>
      </div>

      <!-- Результат идентификации растения -->
      <div
        v-if="plantResult"
        class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 class="text-2xl font-bold mb-4">Результат идентификации</h2>
          <p><strong>Название:</strong> {{ plantResult.name }}</p>
          <p><strong>Описание:</strong> {{ plantResult.description }}</p>
          <p><strong>Семейство:</strong> {{ plantResult.family }}</p>
          <p><strong>Царство:</strong> {{ plantResult.kingdom }}</p>
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

      <!-- Результат диагностики листа -->
      <div
        v-if="plantsStore.leafResult"
        class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 class="text-2xl font-bold mb-4">Результат диагностики</h2>
          <p><strong>Заболевание:</strong> {{ plantsStore.leafResult.disease.name }}</p>
          <p><strong>Лечение:</strong> {{ plantsStore.leafResult.disease.treatment }}</p>
          <p><strong>Профилактика:</strong> {{ plantsStore.leafResult.disease.prevention }}</p>
          <div class="flex gap-4 mt-4">
            <button
              @click="plantsStore.leafResult = null"
              class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>

      <!-- Скрытый input для галереи -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleGalleryPhoto"
      />

      <!-- Переключатель режимов -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 text-[1.5vh]">
        <button
          @click="is_diagnostic = false"
          class="text-white px-3 py-1 rounded-full"
          :class="{ 'bg-[#129C52]': !is_diagnostic, 'bg-gray-500': is_diagnostic }"
        >
          Идентифицировать
        </button>
        <button
          @click="is_diagnostic = true"
          class="text-white px-3 py-1 rounded-full"
          :class="{ 'bg-[#129C52]': is_diagnostic, 'bg-gray-500': !is_diagnostic }"
        >
          Диагностика
        </button>
      </div>

      <!-- Нижняя панель -->
      <div
        class="fixed bottom-3 left-1/2 transform -translate-x-1/2 flex gap-3 h-[80px] bg-[#129C52] w-full justify-between px-8 z-10"
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
            width="60"
            height="60"
            viewBox="0 0 32 32"
          >
            <circle cx="16" cy="16" r="10" fill="#fff" stroke-width="1" stroke="#fff" />
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
    </div>

    <!-- Встроенная галерея -->
    <div
      v-if="showGallery"
      class="gallery p-4 max-w-md mx-auto transition-opacity duration-500"
      :class="{ 'opacity-100': showGallery, 'opacity-0': !showGallery }"
    >
      <h2 class="text-2xl font-bold mb-4">Снимки:</h2>
      <div class="photos grid grid-cols-2 gap-4">
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
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { usePlantsStore } from '@/stores/plants';
import { useRouter } from 'vue-router';

const video = ref(null);
const canvas = ref(null);
const ctx = ref(null);
const photos = ref([]);
const showGallery = ref(false);
const fileInput = ref(null);
const previewPhoto = ref(null);
const plantResult = ref(null);
const facingMode = ref('environment');
const streamRef = ref(null);
const is_diagnostic = ref(false);

// Pinia и роутер
const plantsStore = usePlantsStore();
const router = useRouter();

// Настройки камеры
const constraints = ref({
  audio: false,
  video: {
    facingMode: 'environment',
    width: { ideal: 1280 },
    height: { ideal: 720 },
    aspectRatio: { ideal: 16 / 9 },
  },
});

// Сообщения для этапов
const stageMessage = computed(() => {
  switch (plantsStore.stage) {
    case 'uploading':
      return 'Загрузка фото...';
    case 'processing':
      return 'Обработка изображения...';
    case 'searching':
      return is_diagnostic.value ? 'Диагностика листа...' : 'Поиск растения...';
    case 'done':
      return 'Завершено!';
    default:
      return '';
  }
});

// Прогресс-бар
const progressWidth = computed(() => {
  switch (plantsStore.stage) {
    case 'uploading':
      return '25%';
    case 'processing':
      return '50%';
    case 'searching':
      return '75%';
    case 'done':
      return '100%';
    default:
      return '0%';
  }
});

// Инициализация камеры
const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints.value);
    streamRef.value = stream;
    video.value.srcObject = stream;
    video.value.play();

    video.value.onloadedmetadata = () => {
      canvas.value.width = video.value.videoWidth;
      canvas.value.height = video.value.videoHeight;
      requestAnimationFrame(draw);
    };
  } catch (e) {
    console.warn('Ошибка доступа к камере:', e);
  }
};

// Отрисовка видео
const draw = () => {
  if (ctx.value && video.value && canvas.value) {
    ctx.value.imageSmoothingEnabled = true;
    ctx.value.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
    requestAnimationFrame(draw);
  }
};

// Создание снимка
const takePhoto = () => {
  if (canvas.value) {
    const photo = canvas.value.toDataURL('image/png', 1.0);
    previewPhoto.value = photo;
  }
};

// Подтверждение снимка
const confirmPhoto = async () => {
  if (previewPhoto.value) {
    const response = await fetch(previewPhoto.value);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('photo', blob, 'photo.png');

    let result;
    if (is_diagnostic.value) {
      result = await plantsStore.diagnoseLeaf(formData);
    } else {
      result = await plantsStore.identifyPlant(formData);
    }

    if (result.success) {
      photos.value.push(previewPhoto.value);
      if (!is_diagnostic.value) {
        plantResult.value = result.data;
      }
    }
  }
  previewPhoto.value = null;
};

// Отмена снимка
const cancelPhoto = () => {
  previewPhoto.value = null;
};

// Открытие галереи
const openGallery = () => {
  fileInput.value.click();
};

// Обработка фото из галереи
const handleGalleryPhoto = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('photo', file);

    let result;
    if (is_diagnostic.value) {
      result = await plantsStore.diagnoseLeaf(formData);
    } else {
      result = await plantsStore.identifyPlant(formData);
    }

    if (result.success) {
      const reader = new FileReader();
      reader.onload = () => photos.value.push(reader.result);
      reader.readAsDataURL(file);
      if (!is_diagnostic.value) {
        plantResult.value = result.data;
      }
    }
    fileInput.value.value = null;
  }
};

// Переключение камеры
const toggleCamera = async () => {
  stopCamera();
  facingMode.value = facingMode.value === 'user' ? 'environment' : 'user';
  constraints.value.video.facingMode = facingMode.value;
  await startCamera();
};

// Показ/скрытие галереи
const toggleGallery = () => {
  showGallery.value = !showGallery.value;
};

// Остановка камеры
const stopCamera = () => {
  if (streamRef.value) {
    streamRef.value.getTracks().forEach(track => track.stop());
    streamRef.value = null;
    video.value.srcObject = null;
  }
};

// Переход к деталям растения
const viewPlantDetails = () => {
  if (plantResult.value && plantResult.value.id) {
    router.push(`/plant/${plantResult.value.id}`);
  }
};

// Инициализация
onMounted(() => {
  if (video.value && canvas.value) {
    ctx.value = canvas.value.getContext('2d');
    startCamera();
  }
});

// Очистка
onBeforeUnmount(() => {
  stopCamera();
});
</script>

<style scoped>
/* Tailwind CSS уже используется */
</style>