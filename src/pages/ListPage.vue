<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Заголовок -->
    <div class="min-w-[100vw] bg-[#129C52] p-4 text-xl text-white ">
      Список растений
    </div>

    <!-- Контент -->
    <div class="p-5 pb-20">
      <!-- Поле поиска -->
      <input
        v-model="searchQuery"
        type="text"
        class="w-full h-[7vh] rounded-full px-5 border-2 border-gray-300 focus:outline-none focus:border-[#129C52]"
        placeholder="Поиск по названию"
      />

      <!-- Состояние загрузки -->
      <div v-if="plantsStore.loading" class="text-center mt-5">
        <p class="text-gray-600">{{ stageMessage }}</p>
        <div class="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2">
          <div
            class="absolute h-full bg-green-500 transition-all duration-300"
            :style="{ width: progressWidth }"
          ></div>
        </div>
      </div>

      <!-- Ошибка -->
      <div v-else-if="plantsStore.error" class="text-red-500 text-center mt-5">
        <p>{{ plantsStore.error }}</p>
      </div>

      <!-- Список растений -->
      <div v-else class="flex justify-center items-center min-h-full flex-col gap-3 mt-5">
        <div
          v-for="plant in filteredPlants"
          :key="plant.id"
          class="w-full p-4 border rounded-lg shadow bg-white flex items-center gap-4 cursor-pointer"
          @click="$router.push(`/plant/${plant.id}`)"
        >
          <!-- Фото растения (если есть) -->
          <div v-if="plant.photos && plant.photos.length" class="w-20 h-20 flex-shrink-0">
            <img
              :src="'https://pystorm.space//' + plant.photos[0].photo"
              alt="Фото растения"
              class="w-full h-full object-cover rounded-md"
              loading="lazy"
            />
          </div>
          <!-- Информация -->
          <div class="flex-1">
            <h3 class="text-lg font-bold">{{ plant.name }}</h3>
            <p class="text-sm text-gray-600 line-clamp-2">{{ plant.description }}</p>
          </div>
        </div>
        <!-- Пустое состояние -->
        <p v-if="!filteredPlants.length" class="text-gray-500 text-center">
          Растения не найдены
        </p>
      </div>
    </div>

    <!-- Нижнее меню -->
    <MenuBar :active="3" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import { usePlantsStore } from '@/stores/plants';
import MenuBar from '@/components/menu/MenuBar.vue';

const plantsStore = usePlantsStore();
// const router = useRouter();
const searchQuery = ref('');

// Сообщения для этапов
const stageMessage = computed(() => {
  return plantsStore.stage === 'fetching' ? 'Загрузка растений...' : 'Завершено!';
});

// Прогресс-бар
const progressWidth = computed(() => {
  return plantsStore.stage === 'fetching' ? '50%' : '100%';
});

// Фильтрация растений по поисковому запросу
const filteredPlants = computed(() => {
  // Ensure plants is initialized as an array
  const plants = plantsStore.plants || [];
  if (!searchQuery.value) return plants;
  return plants.filter(plant =>
    plant.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Загрузка списка растений
const fetchPlants = async () => {
  await plantsStore.getAllPlants();
};

onMounted(fetchPlants);
</script>

<style scoped>
/* Ограничиваем описание двумя строками */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>