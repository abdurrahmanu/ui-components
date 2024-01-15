<template>
    <div class="flex items-center justify-between text-black">
        <div @click="$emit('switchMonth', 'prev')"  class="ptext-xl font-bold font-mono text-centerrev">&lt;</div>
        <div class="text-containertext-center uppercase py-2 font-semibold text-teal-800">
            <div class="textw-fit text-[10px]">
                {{ monthName }} {{ viewYear }}
            </div> 
        </div>
        <div @click="$emit('switchMonth', 'next')" class="ntext-xl font-bold font-mono text-centerext">></div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';

// const emit = defineEmits(['switchMonth'])
const props = defineProps({
    viewYear: Number,
    monthName: String
})
</script>
