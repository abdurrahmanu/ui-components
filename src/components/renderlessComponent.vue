<template>
    <div>
        <slot :data="data" />
        <button class="bg-red-200" @click="data.boolean = !data.boolean">click</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const data = ref({
    first: 'asfas',
    second: 'asdfa',
    boolean: false,
})

</script>

<style lang="scss" scoped>

</style>