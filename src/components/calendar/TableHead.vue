<template>
    <thead>
        <th class="font-semibold text-[10px] font-mono text-blue-400 grid grid-cols-7">
            <td
            v-for="(dayName , index) in weekDays"
            :key="index"
            :class="[weekDays[firstDayOfMonth] === dayName ? 'border border-blue-400 rounded-md' : '', weekDays[weekDayIndex] === '' ? 'text-blue-700' : '']">
                {{ dayName }}
            </td>
        </th>
    </thead>

</template>

<script setup>
import { ref, defineProps } from 'vue';
const weekDays = ref(['sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat',])

const props = defineProps({
    firstDayOfMonth: Number,
    weekDayIndex: Number
})
</script>

