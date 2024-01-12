<template>
    <div class="head">
        <div @click="switchMonth('prev')"  class="prev">&lt;</div>
        <div class="text-container">
            <div class="text">
                {{ month }} {{ viewYear }}
            </div> 
        </div>
        <div @click="switchMonth('next')" class="next">></div>
    </div>
</template>

<script setup>
import { useCalendarStore } from './store/calendar-store';
import {storeToRefs} from 'pinia'

const store = useCalendarStore()
const { viewYear, month  } = storeToRefs(store)
const { switchMonth} = store
</script>

<style scoped>
.head {
@apply flex items-center justify-between text-black
}

.text-container {
@apply text-center uppercase py-2 font-semibold text-teal-800
}

.text {
@apply w-fit text-[10px]
}

.prev {
@apply text-xl font-bold font-mono text-center
}

.next {
@apply text-xl font-bold font-mono text-center
}
</style>
