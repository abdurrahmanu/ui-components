<template>
    <div class="calendar">
        <Preview />
        <Month />
    </div>
</template>

<script setup>
import Month from './Month.vue';
import Preview from './Preview.vue';
</script>

<style scoped>
.calendar {
    @apply w-fit grid m-3 gap-1 relative
}
</style>