<template>
    <tbody>
        <tr class="grid grid-cols-7 gap-[1px] text-black" v-for="(row, index) in tableRows" :key="index">
            <td
            v-for="(singleDay, index) in days"
            :key="index"
            @click="emitDay(row, index + 1, dayIndex(row, index + 1))"
            :class="[dayIndex(row, index + 1) === day && isCurrentMonth && viewYear === currentYear && dayIndex(row, index + 1).length ? 'bg-blue-400 rounded-full text-white shadow-md' : 'hover:bg-blue-600 hover:rounded-full hover:text-white', selectedDay === dayIndex(row, index) ? 'border-blue-700': ''] " 
            class="p-2 rounded-full border border-transparent text-center text-black font-mono">
                {{ dayIndex(row, index + 1) }}
            </td>
        </tr>
    </tbody>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['emitDayIndex'])
const props = defineProps({
    tableRows: Number,
    days: Array,
    day: Number,
    firstDay: Number,
    isCurrentMonth: Boolean,
    viewYear: Number,
    currentYear: Number,
    selectedDay: Number,
    numberOfDays: Number,
})

const dayIndex = (rowNumber, index) => {
    return rowNumber === 1 && index > props.firstDay ? index - props.firstDay :
        rowNumber === 2 ? (index + 7) - props.firstDay :
            rowNumber === 3 ? (index + 14) - props.firstDay :
                rowNumber === 4 ? (index + 21) - props.firstDay :
                rowNumber === 5 && !(index + 28 - props.firstDay > props.numberOfDays) ? (index + 28) - props.firstDay :
                    rowNumber === 6 && !(index + 35 - props.firstDay > props.numberOfDays) ?
                            (index + 35) - props.firstDay : '-';
}

const emitDay = (row, index, validDay) => {
    if (validDay > 0) {
        emit('emitDayIndex', dayIndex(row, index));
    }
}

</script>
