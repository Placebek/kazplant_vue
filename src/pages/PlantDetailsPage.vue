<template>
  <div class=" min-h-screen">
    <div class="absolute top-4 left-3">
        <button
          @click="$router.push('/home')"
          class="bg-white text-white  p-2 rounded-full transition-all duration-300 "
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000000" d="M7.828 11H20v2H7.828l5.364 5.364l-1.414 1.414L4 12l7.778-7.778l1.414 1.414z"/></svg>
        </button>
    </div>
    <div class="bg-white rounded-lg max-w-md mx-auto">
        <div v-if="plantsStore.loading" class="text-center">
            <p class="text-gray-600">{{ stageMessage }}</p>
            <div class="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2">
                <div
                class="absolute h-full bg-green-500 transition-all duration-300"
                :style="{ width: progressWidth }"
                ></div>
            </div>
        </div>
        <div v-else-if="plant">
            <div v-if="plant.photos && plant.photos.length" class="mt-4">
                <div class="grid grid-cols-2 gap-4 mt-2">
                    <img
                    v-for="photo in plant.photos"
                    :key="photo.id"
                    :src="'https://192.168.253.31/' + photo.photo"  
                    alt="Фото растения"
                    class="w-full h-auto rounded-lg"
                    />
                </div>
                <h2 class="text-2xl font-bold mb-4">Информация о растении</h2>
          </div>
        <p><strong>Название:</strong> {{ plant.name }}</p>
        <p><strong>Описание:</strong> {{ plant.description }}</p>
        <p><strong>Семейство:</strong> {{ plant.family }}</p>
        <p><strong>Царство:</strong> {{ plant.kingdom }}</p>
        <button
          @click="$router.push('/home')"
          class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300 mt-4"
        >
          Назад
        </button>
      </div>
      <div v-else-if="plantsStore.error" class="text-red-500 text-center">
        <p>{{ plantsStore.error }}</p>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePlantsStore } from '@/stores/plants';

const route = useRoute();
const plantsStore = usePlantsStore();
const plant = ref(null);

// Сообщения для этапов
const stageMessage = computed(() => {
  return plantsStore.stage === 'fetching' ? 'Получение данных...' : 'Завершено!';
});

// Прогресс-бар
const progressWidth = computed(() => {
  return plantsStore.stage === 'fetching' ? '50%' : '100%';
});

// Загрузка данных растения
const fetchPlant = async () => {
  const plantId = route.params.id;
  const result = await plantsStore.getPlantById(plantId);
  if (result.success) {
    plant.value = result.data;
  }
};

onMounted(fetchPlant);
</script>

<style scoped>
/* Tailwind CSS уже используется */
</style>