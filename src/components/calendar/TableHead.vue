<template>
    <thead class="">
        <th class="font-semibold text-[10px] font-mono text-blue-400 grid grid-cols-7">
            <td
            v-for="(dayName , index) in weekDays"
            :key="index"
            :class="[weekDays[firstDay] === dayName ? 'border border-blue-400 rounded-md' : '', weekDays[weekDayIndex] === '' ? 'text-blue-700' : '']">
                {{ dayName }}
            </td>
        </th>
    </thead>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import { useCalendarStore } from './store/calendar-store';

const calendarStore = useCalendarStore()
const {weekDays, firstDay, weekDayIndex} = storeToRefs(calendarStore)
</script>