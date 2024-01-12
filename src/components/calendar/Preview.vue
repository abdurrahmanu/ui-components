<template>
    <div 
    class="calendar-preview"
    :class="[toggleCalendar ? 'border-black' : 'border-blue-500']" >
    <div class="w-fit">
        <input 
        @input="validateDateInput" 
        @blur="validateDate" 
        class="w-24 outline-none inline-block" 
        type="text" 
        maxlength="10" 
        v-model="date">
    </div>

    <div
    @click="toggleCalendarFunction()" 
    class="w-4 h-4 rounded-[4px]"
    :class="[toggleCalendar ? 'bg-black' : 'bg-blue-500']"></div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useCalendarStore } from './store/calendar-store';
import {storeToRefs} from 'pinia'

const store = useCalendarStore()
const { toggleCalendar, validatedDate } = storeToRefs(store)
const { toggleCalendarFunction, validateDateInput, validateDate } = store

const date = ref(validatedDate.value)
watchEffect(() => date.value = validatedDate.value)
</script>

<style scoped>
.calendar-preview {
    @apply flex font-mono text-teal-700 px-2 items-center border rounded-md w-fit
}
</style>