<template>
    <tbody>
        <tr class="row" v-for="(row, index) in tableRows" :key="index">

            <td
            v-for="(singleDay, index) in weekDays"
            :key="index"
            @click="watchDay(row, index + 1, dayIndexFn(row, index + 1))"
            :class="[dayIndexFn(row, index + 1) === weekDayIndex && viewYear === currentYear && dayIndexFn(row, index + 1).length ? 'bg-blue-400 rounded-full text-white shadow-md' : 'hover:bg-blue-600 hover:rounded-full hover:text-white', selectedDay === dayIndexFn(row, index) ? 'border-blue-700': ''] " 
            class="day">
                {{ dayIndexFn(row, index + 1) }}
            </td>

        </tr>
    </tbody>
</template>

<script setup>
import { ref } from 'vue';
import {storeToRefs} from 'pinia'
import { useCalendarStore } from './store/calendar-store';

const store = useCalendarStore()
const selectedDay = ref('')
const { viewYear, currentYear, firstDay, tableRows, numberOfDays, weekDays, weekDayIndex, dayIndex  } = storeToRefs(store)

const dayIndexFn = (rowNumber, index) => {
    return rowNumber === 1 && index > firstDay.value ? index - firstDay.value :
        rowNumber === 2 ? (index + 7) - firstDay.value :
            rowNumber === 3 ? (index + 14) - firstDay.value :
                rowNumber === 4 ? (index + 21) - firstDay.value :
                rowNumber === 5 && !(index + 28 - firstDay.value > numberOfDays.value) ? (index + 28) - firstDay.value :
                    rowNumber === 6 && !(index + 35 - firstDay.value > numberOfDays.value) ?
                            (index + 35) - firstDay.value : '-';
}

const watchDay = (row, index, validDay) => {
    if (validDay > 0) {
        dayIndex.value = dayIndexFn(row, index)
    }
}
</script>

<style scoped>

.row {
    @apply grid grid-cols-7 gap-[1px] text-black
}

.day {
    @apply p-2 rounded-full border border-transparent text-center text-black font-mono
}
</style>
