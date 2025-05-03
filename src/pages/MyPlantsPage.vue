<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <Transition name="fade-slide" appear>
      <div class="min-w-[100vw] bg-[#129C52] p-4 text-xl text-white">
        Мои растения
      </div>
    </Transition>

    <!-- Main Content -->
    <div class="p-5">
      <!-- User Profile -->
      <Transition name="fade-slide" appear>
        <div v-if="plantsStore.userProfile" class="mb-6">
          <h2 class="text-2xl font-semibold text-[#129C52]">{{ plantsStore.userProfile.full_name }}</h2>
          <p class="text-gray-600">{{ plantsStore.userProfile.email }}</p>
          <p class="text-gray-600">@{{ plantsStore.userProfile.username }}</p>
        </div>
        <div v-else-if="plantsStore.loading" class="mb-6 text-center text-gray-500">
          Загрузка профиля...
        </div>
        <div v-else class="mb-6 text-center text-red-500">
          {{ plantsStore.error || 'Не удалось загрузить профиль' }}
        </div>
      </Transition>

      <!-- Plants Section -->
      <Transition name="fade-slide" appear>
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-[#129C52] mb-4">Ваши растения</h3>
          <div v-if="plantsStore.userPlants.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="(plant, index) in plantsStore.userPlants"
              :key="plant.id"
              class="bg-[#F8F8F8] p-4 rounded-lg shadow-sm"
              :style="`--transition-index: ${index + 3}`"
            >
              <img
                v-if="plant.photos && plant.photos[0]"
                :src="'https://pystorm.space/' + plant.photos[0].photo"
                :alt="plant.name"
                class="w-full h-32 object-cover rounded-md mb-2"
              />
              <h4 class="text-lg font-medium">{{ plant.name }}</h4>
              <p class="text-gray-600 text-sm">{{ plant.description }}</p>
              <p class="text-gray-500 text-sm">Семейство: {{ plant.family }}</p>
              <p class="text-gray-500 text-sm">Вероятность: {{ (plant.probability * 100).toFixed(1) }}%</p>
            </div>
          </div>
          <div v-else-if="plantsStore.loading" class="text-center text-gray-500">
            Загрузка растений...
          </div>
          <div v-else class="text-center text-gray-500">
            У вас пока нет растений. Добавьте первое!
          </div>
        </div>
      </Transition>

      <!-- Leafs Section -->
      <Transition name="fade-slide" appear>
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-[#129C52] mb-4">Диагностика листьев</h3>
          <div v-if="plantsStore.userLeafs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="(leaf, index) in plantsStore.userLeafs"
              :key="leaf.id"
              class="bg-[#F8F8F8] p-4 rounded-lg shadow-sm"
              :style="`--transition-index: ${index + 5}`"
            >
              <img
                :src="leaf.leaf.photo"
                alt="Leaf"
                class="w-full h-32 object-cover rounded-md mb-2"
              />
              <h4 class="text-lg font-medium">{{ leaf.disease.name }}</h4>
              <p class="text-gray-600 text-sm">Лечение: {{ leaf.disease.treatment }}</p>
              <p class="text-gray-600 text-sm">Профилактика: {{ leaf.disease.prevention }}</p>
              <p class="text-gray-500 text-sm">
                Дата: {{ new Date(leaf.leaf.created_at).toLocaleDateString() }}
              </p>
            </div>
          </div>
          <div v-else-if="plantsStore.loading" class="text-center text-gray-500">
            Загрузка диагностик...
          </div>
          <div v-else class="text-center text-gray-500">
            У вас пока нет диагностик листьев.
          </div>
        </div>
      </Transition>

      <!-- Empty State (Initial Illustration) -->
      <Transition name="fade-slide" appear>
        <div
          v-if="!plantsStore.userPlants.length && !plantsStore.userLeafs.length && !plantsStore.loading"
          class="flex justify-center items-center min-h-full flex-col gap-3 mt-5"
        >
          <img src="@/assets/img/home/plant.png" alt="Plant" class="w-[60vw] max-w-[300px]" />
          <p class="text-[3.5vh] text-center font-semibold">Давайте начнем</p>
          <p class="text-center text-gray-600">
            Получите профессиональные рекомендации по уходу за растениями, чтобы сохранить их живыми
          </p>
        </div>
      </Transition>
    </div>

    <!-- Menu Bar -->
    <Transition name="fade-slide" appear>
      <MenuBar :active="4" />
    </Transition>

    <!-- Error Modal -->
    <Transition name="fade" appear>
      <div
        v-if="plantsStore.error"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg max-w-md w-[80vw] text-center">
          <p class="text-red-500">{{ plantsStore.error }}</p>
          <button
            @click="plantsStore.error = null"
            class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300 mt-4"
          >
            Закрыть
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import MenuBar from '@/components/menu/MenuBar.vue';
import { usePlantsStore } from '@/stores/plants';

const plantsStore = usePlantsStore();

onMounted(async () => {
  await Promise.all([
    plantsStore.getUserProfile(),
    plantsStore.getUserPlants(),
    plantsStore.getUserLeafs(),
  ]);
});
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

/* Fade transition for error modal */
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

div:nth-child(5) {
  --transition-index: 5;
}

.grid > div {
  --transition-index: 0;
}

/* Responsive grid */
.grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>