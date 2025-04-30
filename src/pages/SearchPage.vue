<template>
    <div class="min-h-screen">
        <div class="min-w-[100vw] bg-[#129C52] p-4 text-xl text-white">
            Поиск
        </div>
        <div class="p-5">
            <input type="text" name="" id="" class="w-full h-[7vh] rounded-full px-5 border-2" placeholder="Поиск" />
            <div class="flex justify-center items-center min-h-full flex-col gap-3">
                <img src="../assets/img/home/plant.png" alt="" class="w-[60vw]" />
                <p class="text-[3.5vh] text-center font-semibold">Давайте начнем</p>
                <p class="text-center">
                    Получите профессиональные рекомендации по уходу за растениями, чтобы
                    сохранить их живыми
                </p>
            </div>
        </div>
    </div>
    <MenuBar :active="2"/>
</template>


<script setup>
import MenuBar from '@/components/menu/MenuBar.vue';

</script>