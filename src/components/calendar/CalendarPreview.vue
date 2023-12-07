<template>
    <div 
    @click="editDate"
    class="calendar-preview"
    :class="[calendarIsOpen ? 'border-black' : 'border-blue-500']" >

    <div class="w-fit">
        <input 
        @input="validateDateInput" 
        @blur="validateDate" 
        class="w-24 outline-none inline-block" 
        type="text" 
        maxlength="10" 
        v-model="date">
    </div>

    <div
    @click="toggleCalendarFunction" 
    class="w-4 h-4 rounded-[4px]"
    :class="[calendarIsOpen ? 'bg-black' : 'bg-blue-500']"></div>

    </div>
</template>

<script setup>
import { ref, defineProps, watchEffect, onMounted, defineEmits } from 'vue';

const calendarIsOpen = ref(false)
const date = ref('')
const day = ref(null)
const month = ref(null)
const year = ref(null)


const emit = defineEmits(['toggleCalendar', 'dateString'])
const props = defineProps({
    toggleCalendar: Boolean,
    currentMonthIndex: Number,
    viewYear: Number,
    selectedDay: Number,
})

const validateDateInput = (event) => {
    if (event.inputType === 'insertText') {

        if (date.value[1] === '/') {
            const dateArr = ref(date.value.split(''))
            dateArr.value.unshift(0)
            date.value = dateArr.value.join('')
        }

        if (date.value[4] === '/') {
            let thirdIndex = date.value[3]
            const dateArr = ref(date.value.split(''))
            dateArr.value[3] = 0
            dateArr.value[4] = thirdIndex
            date.value = dateArr.value.join('')
        }

        if (date.value.length === 2) {
            date.value += '/';
        }

        if (date.value.length === 5) {
            date.value += '/'
        }
    }
}

onMounted(() => {
    if (props.currentMonthIndex < 10) {
        month.value = '0' + month.value
    }

    if (props.selectedDay < 10) {
        day.value = '0' + day.value
    }

    date.value = day.value + '/' + month.value + '/' + year.value
})

const validateDate = () => {
    date.value = day.value + '/' + month.value + '/' + year.value
    let _month = +date.value.slice(0,2)
    let _day = +date.value.slice(3, 5)
}

watchEffect(() => {
    calendarIsOpen.value = props.toggleCalendar
    day.value = props.selectedDay
    month.value = props.currentMonthIndex
    year.value = props.viewYear
})

const toggleCalendarFunction = () => {
    emit('toggleCalendar', !calendarIsOpen.value)
    emit('dateString', date.value)
}

</script>

<style scoped>
.calendar-preview {
    @apply flex font-mono text-teal-700 px-2 items-center border rounded-md w-fit
}
</style>