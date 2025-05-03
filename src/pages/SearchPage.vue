<template>
  <div class=" bg-gray-100">
    <!-- Заголовок -->
    <div class="min-w-[100vw] bg-[#129C52] p-4 text-xl text-white">
      AI помощник
    </div>

    <!-- Контент -->
    <div class="p-5 flex flex-col h-[]">
      <!-- Начальное состояние -->
      <div
        v-if="countMessages === 0 && !plantsStore.loading"
        class="flex justify-center items-center  flex-col gap-3"
      >
        <img src="../assets/img/home/plant.png" alt="Plant" class="w-[60vw]" />
        <p class="text-[3.5vh] text-center font-semibold">Давайте начнем</p>
        <p class="text-center text-gray-600">
          Получите профессиональные рекомендации по уходу за растениями, чтобы сохранить их живыми
        </p>
      </div>

      <!-- Чат -->
      <div
        class="flex flex-col gap-3 mt-5 overflow-y-auto flex-1"
        ref="chatContainer"
      >
        <div
          v-for="(message, index) in plantsStore.chatMessages"
          :key="index"
          :class="[
            'p-3 rounded-lg max-w-[80%]',
            message.type === 'user'
              ? 'bg-[#129C52] text-white self-end'
              : 'bg-gray-200 text-gray-800 self-start',
          ]"
        >
          {{ message.text }}
        </div>
        <!-- Лоадер "печатает" -->
        <div
          v-if="plantsStore.loading"
          class="p-3 rounded-lg max-w-[80%] bg-gray-200 text-gray-800 self-start flex items-center gap-2"
        >
          <span>AI думает</span>
          <span class="typing-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
      </div>

      <!-- Поле ввода и выбор растения -->
      <div class="mt-4 flex flex-col gap-2">
        <select
          v-model="selectedPlantId"
          class="w-full h-[7vh] rounded-full px-5 border-2 border-gray-300 focus:outline-none focus:border-[#129C52]"
        >
          <option value="" disabled>Выберите растение</option>
          <option v-for="plant in plantsStore.plants" :key="plant.id" :value="plant.id">
            {{ plant.name }}
          </option>
        </select>
        <div class="flex gap-2  bottom-[70px] left-0 right-0 mx-auto p-4 sticky">
          <input
            v-model="question"
            type="text"
            placeholder="Задайте вопрос о растении..."
            class="w-full h-[7vh] rounded-full px-5 border-2 border-gray-300 focus:outline-none focus:border-[#129C52]"
            @keyup.enter="sendQuestion"
          />
          <button
            :disabled="!selectedPlantId || !question || plantsStore.loading"
            @click="sendQuestion"
            class="bg-[#129C52] text-white px-4 py-2 rounded-full hover:bg-[#0e7a3d] transition-all duration-300"
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Ошибка -->
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

    <!-- Нижнее меню -->
    <MenuBar :active="2" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import MenuBar from '@/components/menu/MenuBar.vue';
import { usePlantsStore } from '@/stores/plants';

const plantsStore = usePlantsStore();
const question = ref('');
const selectedPlantId = ref('');
const chatContainer = ref(null);

// Количество сообщений
const countMessages = computed(() => plantsStore.chatMessages.length);

// Загрузка списка растений
const fetchPlants = async () => {
  await plantsStore.getAllPlants();
};

// Отправка вопроса
const sendQuestion = async () => {
  if (!selectedPlantId.value || !question.value.trim()) return;

  const plantId = selectedPlantId.value;
  const questionText = question.value.trim();

  // Добавляем сообщение пользователя в чат сразу
  plantsStore.chatMessages.push({ type: 'user', text: questionText });

  // Очистка поля ввода
  question.value = '';

  // Прокрутка чата вниз
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });

  // Отправка запроса к API
  await plantsStore.askPlantQuestion(plantId, questionText);

  // Прокрутка чата вниз после ответа
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

onMounted(fetchPlants);
</script>

<style scoped>
/* Стили для чата */
.self-end {
  margin-left: auto;
}

.self-start {
  margin-right: auto;
}

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