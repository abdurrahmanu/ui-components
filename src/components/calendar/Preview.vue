<template>
    <div class="flex items-center px-2 font-mono text-teal-700 border rounded-md w-fit bg-slate-100" >
        <input @input="validateDateInput"  @blur="validateDateInput"  class="inline-block w-24 max-w-[100px] outline-none bg-inherit placeholder:text-xs"  type="text" maxlength="10" placeholder="dd/mm/yyyy" v-model="date">
        <div @click="$emit('toggle')" class="w-4 h-4 rounded-[4px]" :class="[toggleCalendar ? 'bg-black' : 'bg-blue-500']"></div>
    </div>
</template>

<script setup>
import { defineEmits, watchEffect, ref, computed} from 'vue';

const day = ref(null)
const month = ref(null)
const year = ref(null)
const date = ref(null)
const emit = defineEmits(['toggle', 'date'])
const props = defineProps({
    toggleCalendar: Boolean,
    day: String,
    month: String,
    year: String,
})

const computedDate = computed(() => {
        day.value.length < 2 ? day.value = '0' + day.value : ''
        month.value.length < 2 ? month.value = '0' + month.value : ''
        return day.value + '/' + month.value + '/' + year.value
})

const validate = (event) => {
    if (event.inputType === 'insertText') {
    }
    
    if (event.type === 'blur') {
        emit('date', [day.value, month.value, year.value])
    }
}

watchEffect(() =>{
    day.value = props.day
    month.value = props.month
    year.value = props.year
    date.value = computedDate.value
})
</script>