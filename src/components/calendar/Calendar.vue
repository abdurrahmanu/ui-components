<template>
    <div class="relative grid gap-1 m-3 w-fit">
        <Preview 
        @validateDate="validatedDate($event)" 
        @toggle="toggleCalendar = !toggleCalendar"
        :fullDate="fullDate"
        :toggleCalendar="toggleCalendar"/>

        <Month 
        @dayIndex="dayIndex = $event"
        @switchMonth="switchMonth($event)" 
        :toggle="toggleCalendar" 
        :firstDayOfMonth="firstDayOfMonth" 
        :weekDayIndex="weekDayIndex" 
        :viewYear="viewYear" 
        :monthName="monthName"
        :currentMonthIndex="currentMonthIndex"
        :totalNumberOfRows="totalNumberOfRows"
        :numberOfDaysInMonth="numberOfDaysInMonth"
        :fullDate="fullDate" />
    </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue';
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
    const weekDayIndex = ref(new Date().getDay())
    const viewYear = ref(new Date().getFullYear())
    const currentMonthIndex = ref(new Date().getMonth())
    const fullDate = ref('')
    const currentMonth = (monthIndex) =>  months.value[monthIndex]
    const monthName = computed(() => currentMonth(currentMonthIndex.value) )
    const numberOfDaysInMonth = computed(() => viewYear.value % 4 === 0 && monthName.value === 'February' ? 29 : monthsObject.value[monthName.value] )
    const firstDayOfMonth = computed(() => new Date(viewYear.value, currentMonthIndex.value).getDay() )
    
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

    const validatedDate = (...event) => {
        const month = ref(currentMonthIndex.value + 1)
        const day = ref(dayIndex.value)
        if (month.value < 10) month.value = '0' + month.value
        if (day.value < 10) day.value = '0' + day.value
        return  day.value + '/' + month.value + '/' + viewYear.value
    }

    const validateDateInput = (event) => {
        if (event.inputType === 'insertText') {
            if (fullDate.value[1] === '/') {
                const dateArr = ref(fullDate.value.split(''))
                dateArr.value.unshift(0)
                fullDate.value = dateArr.value.join('')
            }

            if (fullDate.value[4] === '/' && fullDate.length === 5) {
                let thirdIndex = fullDate.value[3]
                const dateArr = ref(fullDate.value.split(''))
                dateArr.value[3] = 0
                dateArr.value[4] = thirdIndex
                fullDate.value = dateArr.value.join('')
            }

            if (fullDate.value.length === 2) fullDate.value += '/';
            if (fullDate.value.length === 5) fullDate.value += '/'
        }

        else if (event.type === 'blur') {
            const nonDigitDay = typeof +fullDate.value.slice(0,2) !== 'number' || isNaN(+fullDate.value.slice(0,2))
            const nonDigitMonth = typeof +fullDate.value.slice(3,5) !== 'number' || isNaN(+fullDate.value.slice(3,5))
            const nonDigitYear = typeof +fullDate.value.slice(6) !== 'number' || isNaN(+fullDate.value.slice(6))

            if (nonDigitDay || nonDigitMonth || nonDigitYear) fullDate.value = validatedDate.value
            if (fullDate.value.length < 10) fullDate.value = validatedDate.value
            if (!nonDigitDay && +fullDate.value.slice(0, 2) > numberOfDaysInMonth.value) fullDate.value = validatedDate.value
            if (!nonDigitMonth && +fullDate.value.slice(3,5) > 12) fullDate.value = validatedDate.value

            dayIndex.value = +fullDate.value.slice(0, 2)
            currentMonthIndex.value = +fullDate.value.slice(3, 5) - 1
            viewYear.value = +fullDate.value.slice(6)

            fullDate.value = validatedDate()
        }
    }

    const totalNumberOfRows = computed(() => {
        const numberOfRows = ref(0)
        const lengthOfSingleRow = 7
        const totalNumberOfCells = ref(numberOfDaysInMonth.value + firstDayOfMonth.value)
        numberOfRows.value = Math.ceil(totalNumberOfCells.value / lengthOfSingleRow)

        return numberOfRows.value
    })

    watchEffect(() => fullDate.value = validatedDate() )
</script>










