<script setup>
import { ref } from 'vue';
import calendar from './components/calendar/Calendar.vue'

const value = ref('')
</script>

<template>
    <div class="flex justify-center">
        <calendar  />
    </div>

<!-- const cssObject = window.getComputedStyle(dropdownContainer)
    const top = cssObject.getPropertyValue('top')
    dropdownOptions.value.style.top = top + 'px' -->
</template>

<style>

</style>

























