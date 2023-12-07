<template>
    <div class="w-fit grid m-3 gap-1 relative">
        <CalendarPreview
        @toggleCalendar="toggleCalendar = $event"
        @dateString="formatDateString"
        :selectedDay="today"
        :viewYear="viewYear"
        :toggleCalendar="toggleCalendar"
        :currentMonthIndex="currentMonthIndex"
        />
    
        <div v-show="toggleCalendar" class="month-container">
            <CalendarView
            v-for="(numberOfDays, month, index) in monthsObject" 
            @day="today = $event"
            @switchMonth="switchMonth($event)"
            :key="index"
            :id="index"
            :month="month" 
            :viewYear="viewYear" 
            :numberOfDays="numberOfDays"
            :isLeapYear="viewYear % 4 === 0" 
            :currentMonth="months[currentMonthIndex]"
            :isCurrentMonth="months[currentMonthIndex] === month" 
            :daysNumber="viewYear % 4 === 0 && month === 'February' ? 29 : monthsObject[month]" />
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import CalendarView from './CalendarView.vue';
import CalendarPreview from './CalendarPreview.vue';

const toggleCalendar = ref(false)
const today = ref(new Date().getDate())
const viewYear = ref(new Date().getFullYear())
const currentMonthIndex = ref(new Date().getMonth())

const formatDateString = (dateString) => {
    today.value = +dateString.slice(0, 2)
    viewYear.value = +dateString.slice(6)
    currentMonthIndex.value = +dateString.slice(3, 5)
}

const switchMonth = (arg) => {
    if (arg === 'next' && currentMonthIndex.value === months.length - 1) {
        currentMonthIndex.value = 0
        viewYear.value++
        return
    }

    else if (arg === 'prev' && currentMonthIndex.value === 0) {
        currentMonthIndex.value = months.length - 1
        viewYear.value--
        return
    }

    if (arg === 'prev' && currentMonthIndex.value > 0) {
        currentMonthIndex.value--;
    }

    else if (arg === 'next' && currentMonthIndex.value < months.length - 1) {
        currentMonthIndex.value++;
    }
}

const monthsObject = {
    'January': 31,
    'February': 28,
    'March': 31,
    'April': 30,
    'May': 31,
    'June': 30,
    'July': 31,
    'August': 31,
    'September': 30,
    'October': 31,
    'November': 30,
    'December': 31
};

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

</script>

<style scoped>
.month-container {
    @apply w-[250px] text-xs h-fit flex left-0 absolute top-[30px] items-center justify-center gap-10
}
</style>