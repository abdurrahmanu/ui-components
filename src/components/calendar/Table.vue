<template>
    <table class="table">
        <TableHead/>
        <TableBody />
    </table>
</template>

<script setup>
import TableBody from './TableBody.vue';
import TableHead from './TableHead.vue';
</script>

<style scoped>
.table {
    @apply m-auto transition-all duration-75 text-[11px]
}
</style>
