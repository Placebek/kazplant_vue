<template>
  <div class="min-h-screen bg-custom-gradient">
    <!-- Заголовок -->
    <Transition name="fade-slide" appear>
      <div class="min-w-[100vw] bg-[#129C52] p-4 text-xl text-white" style="--transition-index: 1">
        Список растений
      </div>
    </Transition>

    <!-- Контент -->
    <div class="p-5 pb-20">
      <!-- Поле поиска -->
      <Transition name="fade-slide" appear>
        <input
          v-model="searchQuery"
          type="text"
          class="w-full h-[7vh] rounded-full px-5 border-2 border-gray-300 focus:outline-none focus:border-[#129C52]"
          placeholder="Поиск по названию"
          style="--transition-index: 2"
        />
      </Transition>

      <!-- Состояние загрузки -->
      <Transition name="fade" mode="out-in">
        <div v-if="plantsStore.loading" key="loading" class="text-center mt-5">
          <Transition name="fade-slide" appear>
            <div style="--transition-index: 3">
              <p class="text-gray-600">{{ stageMessage }}</p>
              <div class="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2">
                <div
                  class="absolute h-full bg-green-500 transition-all duration-300"
                  :style="{ width: progressWidth }"
                ></div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Ошибка -->
        <div v-else-if="plantsStore.error" key="error" class="text-red-500 text-center mt-5">
          <Transition name="fade-slide" appear>
            <div style="--transition-index: 3">
              <p>{{ plantsStore.error }}</p>
            </div>
          </Transition>
        </div>

        <!-- Список растений -->
        <div v-else key="plants" class="flex justify-center items-center min-h-full flex-col gap-3 mt-5">
          <Transition name="fade-slide" appear v-for="(plant, index) in filteredPlants" :key="plant.id">
            <div
              class="w-full p-4 border rounded-lg shadow bg-white flex items-center gap-4 cursor-pointer"
              :style="`--transition-index: ${index + 4}`"
              @click="$router.push(`/plant/${plant.id}`)"
            >
              <!-- Фото растения (если есть) -->
              <div v-if="plant.photos && plant.photos.length" class="w-20 h-20 flex-shrink-0">
                <img
                  :src="'https://pystorm.space/' + plant.photos[0].photo"
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
          </Transition>
          <!-- Пустое состояние -->
          <Transition name="fade-slide" appear>
            <p
              v-if="!filteredPlants.length"
              class="text-gray-500 text-center"
              style="--transition-index: 4"
            >
              Растения не найдены
            </p>
          </Transition>
        </div>
      </Transition>
    </div>

    <!-- Нижнее меню -->
    <Transition name="fade-slide" appear>
      <MenuBar :active="3" style="--transition-index: 3" />
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePlantsStore } from '@/stores/plants';
import MenuBar from '@/components/menu/MenuBar.vue';

const plantsStore = usePlantsStore();
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
/* Fade-slide transition для элементов */
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

/* Fade transition для переключения состояний */
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

/* Ограничиваем описание двумя строками */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>