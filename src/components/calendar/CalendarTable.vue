<template>
    <table class="m-auto transition-all duration-75 text-[11px]">
        <CalendarTableHead
        :day="day"
        :days="days"
        :firstDay="firstDay"
        />

        <CalendarTableBody
        @emitDayIndex="$emit('emitDayIndex', $event)"
        :day="day"
        :firstDay="firstDay"
        :days="days"
        :tableRows="tableRows"
        :selectedDay="selectedDay"
        :isCurrentMonth="isCurrentMonth"
        :viewYear="viewYear"
        :currentYear="currentYear"   
        :numberOfDays="numberOfDays"
        />
    </table>
</template>

<script setup>
import CalendarTableBody from './CalendarTableBody.vue';
import CalendarTableHead from './CalendarTableHead.vue';
import { defineProps } from 'vue';

const emit = defineEmits(['emitDayIndex'])
const props = defineProps({
    day: Number,
    days: Array,
    firstDay: Number,
    tableRows: Number,
    selectedDay: Number, 
    isCurrentMonth: Boolean,
    viewYear: Number,
    currentYear: Number,
    numberOfDays: Number,

})
</script>
