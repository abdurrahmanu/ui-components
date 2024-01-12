<script setup>
import { onBeforeMount, onMounted, ref, watchEffect } from 'vue';
import pagination from './components/pagination/pagination.vue';
import calendar from './components/calendar/Calendar.vue'

const page = ref(0)

</script>

<template>
    <calendar />

<!-- const cssObject = window.getComputedStyle(dropdownContainer)
    const top = cssObject.getPropertyValue('top')
    dropdownOptions.value.style.top = top + 'px' -->
</template>

<style>

</style>

























