<template>
    <div class="flex items-center justify-between text-black">
        <div @click="$emit('switch', 'previous')"  class="font-mono font-bold ptext-xl text-centerrev">&lt;</div>
        <p class="py-2 font-semibold text-teal-800 uppercase text-containertext-center text-[10px]">{{ monthName }} {{ viewYear }}</p>
        <div @click="$emit('switch', 'next')" class="font-mono font-bold ntext-xl text-centerext">></div>
    </div>
</template>

<script setup>
const props = defineProps({
    viewYear: Number,
    monthName: String
})
</script>
