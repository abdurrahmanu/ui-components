<template>
    <table class="m-auto transition-all duration-75 text-[11px]">
        <TableHead
        :weekDayIndex="weekDayIndex"
        :firstDayOfMonth="firstDayOfMonth"/>

        <TableBody
        @dayIndex="$emit('dayIndex', $event)"
        :firstDayOfMonth="firstDayOfMonth" 
        :totalNumberOfRows="totalNumberOfRows"
        :dayIndex="dayIndex"
        :weekDayIndex="weekDayIndex" 
        :numberOfDaysInMonth="numberOfDaysInMonth"  />
    </table>
</template>

<script setup>
import { defineProps } from 'vue';
import TableHead from './TableHead.vue'
import TableBody from './TableBody.vue';

const props = defineProps({
    firstDayOfMonth: Number,
    totalNumberOfRows: Number,
    numberOfDaysInMonth: Number,
    weekDayIndex: Number,
    dayIndex: Number,
})
</script>