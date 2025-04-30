<template>
    <div class="min-h-screen">
        <div class="min-w-[100vw] bg-[#129C52] p-4 text-xl text-white">
            Список
        </div>
        <div class="p-5">
            <input type="text" name="" id="" class="w-full h-[7vh] rounded-full px-5 border-2" placeholder="Поиск" />
            <div class="flex justify-center items-center min-h-full flex-col gap-3 mt-5">
               
                <div v-for="plant in plants" :key="plant.id" class="w-full p-4 border rounded-lg shadow">
                    <h3 class="text-lg font-bold">{{ plant.name }}</h3>
                    <p class="text-sm text-gray-600">{{ plant.description }}</p>
                </div>
            </div>
        </div>
    </div>
    <MenuBar :active="3"/>
</template>


<script setup>
import MenuBar from '@/components/menu/MenuBar.vue';
import { ref } from 'vue'


const plants = ref([
    { id: 1, name: 'Картошка', description: 'Картошка это овощ, который широко используется в кулинарии.' },
    { id: 2, name: 'Помидор', description: 'Помидор это фрукт, который часто используется в салатах.' },
    { id: 3, name: 'Пшеница', description: 'Пшеница это злаковая культура, используемая для производства муки.' },
    // Добавьте больше растений по мере необходимости
])

</script>