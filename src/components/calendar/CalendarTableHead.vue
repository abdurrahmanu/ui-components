<template>
    <thead class="">
        <th class="font-semibold text-[10px] font-mono text-blue-400 grid grid-cols-7">
            <td class=""
            v-for="(dayName , index) in days"
            :class="[days[firstDay] === dayName ? 'border border-blue-400 rounded-md' : '', days[day] === '' ? 'text-blue-700' : '']" 
            :key="index">{{ dayName }}</td>
        </th>
    </thead>
</template>

<script setup>
import { defineProps } from 'vue';

const emits = ([])
const props = defineProps({
    day: Number,
    days: Array,
    firstDay: Number,
})

</script>