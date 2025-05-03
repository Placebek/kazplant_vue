<template>
  <div class="min-h-screen bg-custom-gradient">
    <!-- Header -->
    <Transition name="fade-slide" appear>
      <div class="min-w-[100vw] bg-[#129C52] p-4 text-xl text-white" style="--transition-index: 1">
        Добро пожаловать!
      </div>
    </Transition>

    <!-- Main Content -->
    <div class="p-5">
      <!-- Анимация для блока без растений и с контентом -->
      <Transition name="fade" mode="out-in">
        <div
          v-if="userPlants.length === 0"
          key="empty"
          class="flex justify-center items-center min-h-full flex-col gap-3"
        >
          <Transition name="fade-slide" appear>
            <div style="--transition-index: 2">
              <img src="../assets/img/home/plant.png" alt="Plant" class="w-[60vw] max-w-[300px]" />
              <p class="text-[3.5vh] text-center font-semibold">Давайте начнем</p>
              <p class="text-center text-gray-600">
                Добавьте своё первое растение, чтобы начать ухаживать за ним!
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
                  Сканировать растение
                </button>
              </router-link>
            </div>
          </Transition>
        </div>

        <!-- Анимация для блока с контентом -->
        <div v-else key="withPlants" class="flex min-h-full flex-col gap-3">
          <Transition name="fade-slide" appear>
            <div style="--transition-index: 2">
              <p class="text-[3.5vh] font-semibold">Ваш зелёный уголок</p>
              <p class="text-center text-gray-600">
                Следите за своими растениями и их уходом
              </p>
            </div>
          </Transition>

          <!-- Статистика -->
          <Transition name="fade-slide" appear>
            <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" style="--transition-index: 3">
              <div class="bg-[#F8F8F8] p-4 rounded-lg shadow-sm border-2">
                <h4 class="text-lg font-medium text-[#129C52]">Ваши растения</h4>
                <p class="text-gray-600 text-sm">{{ userPlants.length }} растений</p>
              </div>
              <div class="bg-[#F8F8F8] p-4 rounded-lg shadow-sm border-2">
                <h4 class="text-lg font-medium text-[#129C52]">Записи ухода</h4>
                <p class="text-gray-600 text-sm">{{ totalCareLogs }} записей</p>
              </div>
            </div>
          </Transition>

          <!-- Быстрые действия -->
          <Transition name="fade-slide" appear>
            <div class="mt-6" style="--transition-index: 4">
              <h3 class="text-xl font-semibold text-[#129C52] mb-4">Быстрые действия</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <router-link to="/scan">
                  <button
                    class="bg-[#129C52] text-white font-bold py-2 w-full rounded-full flex flex-row gap-4 justify-center items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path fill="#fff" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
                    </svg>
                    Сканировать растение
                  </button>
                </router-link>
                <router-link to="/care-log">
                  <button
                    class="bg-gray-500 text-white font-bold py-2 w-full rounded-full flex flex-row gap-4 justify-center items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    Просмотреть журнал ухода
                  </button>
                </router-link>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>

    <!-- Menu Bar -->
    <Transition name="fade-slide" appear>
      <MenuBar :active="0" style="--transition-index: 5" />
    </Transition>
  </div>
</template>

<script setup>
import MenuBar from '@/components/menu/MenuBar.vue';
import { ref, computed } from 'vue';

// Статические данные о растениях
const userPlants = ref([
  {
    id: 1,
    name: 'Монстера',
    careLogs: [
      { id: 1, action: 'Полив', notes: '1 литр воды', date: '2025-04-20' },
      { id: 2, action: 'Удобрение', notes: 'Жидкое удобрение', date: '2025-04-25' },
    ],
  },
  {
    id: 2,
    name: 'Фикус',
    careLogs: [{ id: 3, action: 'Полив', notes: '0.5 литра воды', date: '2025-04-22' }],
  },
]);

// Вычисляем общее количество записей ухода
const totalCareLogs = computed(() => {
  return userPlants.value.reduce((total, plant) => total + (plant.careLogs?.length || 0), 0);
});
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