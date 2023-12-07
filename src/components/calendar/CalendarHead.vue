<template>
    <div class="flex items-center justify-between text-black">
        <div @click="emitEvent('prev')"  class="text-xl font-bold font-mono text-center">&lt;</div>
        <div @click="openInput" class="text-center uppercase py-2 font-semibold text-teal-800">
            <div class="w-fit text-[10px]">
                {{ month }} {{ viewYear }}
            </div> 
        </div>
        <div @click="emitEvent('next')" class="text-xl font-bold font-mono text-center">></div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['emitPreviousOrNextEvent'])
const props = defineProps({
    month: String,
    viewYear: Number,
})

const emitEvent = (event) => {
    emit('emitPreviousOrNextEvent', event)
}

</script>
