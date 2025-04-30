<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-green-600 mb-4">KazPlant</h1>
    <button
      @click="requestPhoto"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
    >
      Сфотографировать
    </button>
    <img v-if="photo" :src="photo" alt="Plant" class="my-4 max-w-xs mx-auto rounded" />
    <p class="text-lg text-gray-700">Результат: {{ disease || 'Ожидание результата' }}</p>
    <input
      v-model="chatInput"
      placeholder="Введите вопрос (например, Как лечить фитофтору?)"
      class="border p-2 w-full my-4 rounded"
    />
    <button
      @click="handleChat"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Отправить вопрос
    </button>
    <p class="text-lg text-gray-700">Ответ бота: {{ chatOutput || 'Введите вопрос' }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'KazPlant',
  data() {
    return {
      disease: '',
      chatInput: '',
      chatOutput: '',
      photo: null,
    };
  },
  mounted() {
    window.addEventListener('message', (event) => {
      if (event.data.disease) {
        this.disease = event.data.disease;
        this.photo = event.data.photoUrl;
      }
    });
  },
  methods: {
    requestPhoto() {
      if (window.FlutterBridge) {
        window.FlutterBridge.postMessage('takePhoto');
      } else {
        this.disease = 'Ошибка: FlutterBridge не доступен';
      }
    },
    async handleChat() {
      try {
        const response = await axios.post('http://your-backend/chat', { text: this.chatInput });
        this.chatOutput = response.data.response;
      } catch (error) {
        this.chatOutput = 'Ошибка при отправке вопроса';
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* Дополнительные стили */
</style>