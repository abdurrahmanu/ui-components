<template>
    <tbody>
        <tr class="grid grid-cols-7 gap-[1px] text-black" v-for="(row, index) in totalNumberOfRows" :key="index">
            <td
            v-for="(singleDay, index) in weekDays"
            :key="index"
            @click="watchDay(row, index + 1, dayIndexFn(row, index + 1))"
            :class="[dayIndexFn(row, index + 1) === weekDayIndex && dayIndexFn(row, index + 1).length ? 'bg-blue-400 rounded-full text-white shadow-md' : 'hover:bg-blue-600 hover:rounded-full hover:text-white', selectedDay === dayIndexFn(row, index) ? 'border-blue-700': ''] " 
            class="p-2 font-mono text-center text-black border border-transparent rounded-full">
                {{ dayIndexFn(row, index + 1) }}
            </td>
        </tr>
    </tbody>
</template>

<script setup>
import { ref } from 'vue';

const selectedDay = ref('')
const weekDays = ref(['sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat',])

const emit = defineEmits(['dayIndex'])
const props = defineProps({
    firstDayOfMonth: Number,
    totalNumberOfRows: Number,
    numberOfDaysInMonth: Number,
    weekDayIndex: Number,
    dayIndex: Number
})

const dayIndexFn = (rowNumber, index) => {
    return rowNumber === 1 && index > props.firstDayOfMonth ? index - props.firstDayOfMonth :
        rowNumber === 2 ? (index + 7) - props.firstDayOfMonth :
            rowNumber === 3 ? (index + 14) - props.firstDayOfMonth :
                rowNumber === 4 ? (index + 21) - props.firstDayOfMonth :
                rowNumber === 5 && !(index + 28 - props.firstDayOfMonth > props.numberOfDaysInMonth) ? (index + 28) - props.firstDayOfMonth :
                    rowNumber === 6 && !(index + 35 - props.firstDayOfMonth > props.numberOfDaysInMonth) ?
                            (index + 35) - props.firstDayOfMonth : '-';
}

const watchDay = (row, index, validDay) => {
    if (validDay > 0) {
        emit('dayIndex', dayIndexFn(row, index))
    }
}
</script>
