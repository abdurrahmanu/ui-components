<template>
    <div v-if="isCurrentMonth" class="month">
        <CalendarHead
        @emitPreviousOrNextEvent="$emit('switchMonth', $event)"
        :month="month"
        :viewYear="viewYear" />
        
        <CalendarTable
        v-if="afterEnterDelay"
        @emitDayIndex="emitDay($event)"
        :day="day"
        :days="days"
        :firstDay="firstDay"
        :tableRows="tableRows"
        :numberOfDays="numberOfDays"
        :isCurrentMonth="isCurrentMonth"
        :selectedDay="selectedDay"
        :viewYear="viewYear"
        :currentYear="currentYear" />
        </div>
</template>

<script setup>
import { ref, computed, defineProps, watchEffect, defineEmits } from 'vue';
import CalendarTable from './CalendarTable.vue';
import CalendarHead from './CalendarHead.vue'

const emit = defineEmits(['day', 'switchMonth'])
const currentYear = ref(new Date().getFullYear());
const day = ref(new Date().getDate())
const days = ['sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat',]
const firstDay = ref(new Date(props.viewYear, props.id).getDay())
const afterEnterDelay = ref(false)

const props = defineProps({
    month: String,
    isLeapYear: Boolean,
    isCurrentMonth: Boolean,
    viewYear: Number,
    daysNumber: Number,
    currentMonth: String,
    id: Number,
    numberOfDays: Number,
})

const emitDay = (day) => {
    emit('day', day)
}

const selectedDay = ref(new Date().getDate())
watchEffect(() => {
    firstDay.value = new Date(props.viewYear, props.id).getDay();

    if (props.isCurrentMonth) {
        setTimeout(() => {
            afterEnterDelay.value = true
        }, 0);
    }
})

const tableRows = computed(() => {
    const rowCount = ref(0)
    const boxes = ref(props.daysNumber + firstDay.value)
    rowCount.value = Math.round(boxes.value / 7)
    if (7 * rowCount.value < boxes.value) rowCount.value++
    
    return rowCount.value
})

</script>

<style scoped>
.month {
    @apply bg-white border p-2 rounded-md shadow-lg text-gray-200 
}
</style>








