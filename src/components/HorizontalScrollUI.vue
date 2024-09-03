<template>
    <div ref="scrollElement" class="h-1 bg-green-500"></div>
</template>

<script setup>
import {ref, watch} from 'vue'
import {horizontalScroll} from '../store/horizontalScroll'
import {storeToRefs} from 'pinia'

const scroll = horizontalScroll()
const {scrollPercent} = storeToRefs(scroll)
const scrollElement = ref(null)

watch(scrollPercent, newVal => {
    scrollElement.value.style.width = `${scrollPercent.value}%`
})
</script>