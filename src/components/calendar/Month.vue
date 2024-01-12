<template>
    <div v-show="toggleCalendar" class="month-calendar">
        <div class="month">
            <Head />
            <Table />
        </div>
    </div>
</template>

<script setup>
import Table from './Table.vue';
import Head from './Head.vue'
import { useCalendarStore } from './store/calendar-store';
import {storeToRefs} from 'pinia'

const store = useCalendarStore()
const {toggleCalendar} = storeToRefs(store)
</script>

<style scoped>
.month-container {
    @apply w-[250px] text-xs h-fit flex left-0 absolute top-[30px] items-center justify-center gap-10
}
.month {
    @apply bg-white border p-2 rounded-md shadow-lg text-gray-200 
}
</style>
