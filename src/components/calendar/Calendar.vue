<template>
    <div class="relative gap-1 w-fit h-fit">
        <Preview 
        :day="dayIndex.toString()"
        :year="viewYear.toString()"
        :month="(currentMonthIndex + 1).toString()"
        :toggleCalendar="toggleCalendar"
        @toggle="toggleCalendar = !toggleCalendar"/>

        <Month 
        @dayIndex="dayIndex = $event"
        @switch="switchMonth($event)"
        :toggle="toggleCalendar" 
        :firstDayOfMonth="firstDayOfMonth" 
        :weekDayIndex="weekDayIndex" 
        :viewYear="viewYear" 
        :monthName="monthName"
        :currentMonthIndex="currentMonthIndex"
        :totalNumberOfRows="totalNumberOfRows"
        :numberOfDaysInMonth="numberOfDaysInMonth" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Month from './Month.vue';
import Preview from './Preview.vue';

const months = ref([ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
const monthsObject = ref({
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
})

const toggleCalendar = ref(false)
const dayIndex = ref(new Date().getDate())
const viewYear = ref(new Date().getFullYear())
const weekDayIndex = ref(new Date().getDay())
const currentMonthIndex = ref(new Date().getMonth())
const monthName = computed(() => months.value[currentMonthIndex.value])
const firstDayOfMonth = computed(() => new Date(viewYear.value, currentMonthIndex.value).getDay() )
const numberOfDaysInMonth = computed(() => viewYear.value % 4 === 0 && monthName.value === 'February' ? 29 : monthsObject.value[monthName.value] )

const switchMonth = (arg) => {
    if (arg === 'prev' && currentMonthIndex.value > 0) currentMonthIndex.value--;

    else if (arg === 'next' && currentMonthIndex.value < months.value.length - 1) currentMonthIndex.value++;

    else if (arg === 'next' && currentMonthIndex.value === months.value.length - 1) {
        currentMonthIndex.value = 0
        viewYear.value++
    }

    else if (arg === 'prev' && currentMonthIndex.value === 0) {
        currentMonthIndex.value = months.value.length - 1
        viewYear.value--
    }
}

const totalNumberOfRows = computed(() => {
    const numberOfRows = ref(0)
    const lengthOfSingleRow = 7
    const totalNumberOfCells = ref(numberOfDaysInMonth.value + firstDayOfMonth.value)
    numberOfRows.value = Math.ceil(totalNumberOfCells.value / lengthOfSingleRow)

    return numberOfRows.value
})
</script>










