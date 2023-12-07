<template>
    <useShakeNotification :shake="shake" @false="shake = false">
        <div class="bg-blue-200 text-red-900 px-6 p-2 w-fit m-auto rounded-md">Lorem ipsum dolor sit amet consectetur.</div>
    </useShakeNotification>

    <BaseButton class="bg-red-400 shadow-none" @click="shake = true" text="shake" />
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from './baseButton.vue';
import useShakeNotification from './reusableComponents/useShakeNotification.vue';

const shake = ref(false)

</script>

<style lang="scss" scoped>

</style>