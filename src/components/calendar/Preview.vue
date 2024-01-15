<template>
    <div 
    class="flex items-center px-2 font-mono text-teal-700 border rounded-md w-fit"
    :class="[toggleCalendar ? 'border-black' : 'border-blue-500']" >
        <div class="w-fit">
            <input 
            @input="validateDateInput" 
            @blur="validateDateInput" 
            class="inline-block w-24 outline-none" 
            type="text" 
            maxlength="10" 
            v-model="date">
        </div>

        <div
        @click="$emit('toggle')" 
        class="w-4 h-4 rounded-[4px]"
        :class="[toggleCalendar ? 'bg-black' : 'bg-blue-500']"></div>
    </div>
</template>

<script setup>
import { defineEmits, watchEffect, ref } from 'vue';

const emit = defineEmits(['toggle', 'validateDate'])
const props = defineProps({
    toggleCalendar: Boolean,
    fullDate: String,
})

const date = ref(props.fullDate)
watchEffect(() =>date.value = props.fullDate )

    const validateDateInput = (event) => {
        if (event.inputType === 'insertText') {
            if (props.fullDate[1] === '/') {
                const dateArr = ref(props.fullDate.split(''))
                dateArr.value.unshift(0)
                props.fullDate = dateArr.value.join('')
            }

            if (props.fullDate[4] === '/' && props.fullDate.length === 5) {
                let thirdIndex = props.fullDate[3]
                const dateArr = ref(props.fullDate.split(''))
                dateArr.value[3] = 0
                dateArr.value[4] = thirdIndex
                props.fullDate = dateArr.value.join('')
            }

            if (props.fullDate.length === 2) props.fullDate += '/';
            if (props.fullDate.length === 5) props.fullDate += '/'
        }

        else if (event.type === 'blur') {
            const nonDigitDay = typeof +props.fullDate.slice(0,2) !== 'number' || isNaN(+props.fullDate.slice(0,2))
            const nonDigitMonth = typeof +props.fullDate.slice(3,5) !== 'number' || isNaN(+props.fullDate.slice(3,5))
            const nonDigitYear = typeof +props.fullDate.slice(6) !== 'number' || isNaN(+props.fullDate.slice(6))

            if (nonDigitDay || nonDigitMonth || nonDigitYear) props.fullDate = validatedDate.value
            if (props.fullDate.length < 10) props.fullDate = validatedDate.value
            if (!nonDigitDay && +props.fullDate.slice(0, 2) > props.numberOfDaysInMonth) props.fullDate = validatedDate.value
            if (!nonDigitMonth && +props.fullDate.slice(3,5) > 12) props.fullDate = validatedDate.value

            let dayIndex = +props.fullDate.slice(0, 2)
            let currentMonthIndex = +props.fullDate.slice(3, 5) - 1
            let viewYear = +props.fullDate.slice(6)
            
            emit('validateDate', [dayIndex, currentMonthIndex, viewYear])
        }
    }

</script>
