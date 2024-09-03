<template>
    <div v-show="toggle" class="w-[250px] text-xs h-fit flex left-0 absolute top-[30px] items-center justify-center gap-10">
        <div class="p-2 text-gray-200 bg-white border rounded-md shadow-lg ">
            <Head  :viewYear="viewYear" :monthName="monthName" @switch="$emit('switch', $event)" />
            
            <Table
            @dayIndex="$emit('dayIndex', $event)"
            :dayIndex="dayIndex"
            :weekDayIndex="weekDayIndex"
            :firstDayOfMonth="firstDayOfMonth"
            :totalNumberOfRows="totalNumberOfRows" 
            :numberOfDaysInMonth="numberOfDaysInMonth" />

        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Table from './Table.vue';
import Head from './Head.vue'

const props = defineProps({
    viewYear: Number,
    monthName: String,
    toggle: Boolean,
    firstDayOfMonth: Number,
    totalNumberOfRows: Number,
    numberOfDaysInMonth: Number,
    weekDayIndex: Number,
    dayIndex: Number,
})
</script>
