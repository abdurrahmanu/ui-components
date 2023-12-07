<template>
    <useToast :toggle="toggle" @false="toggle = false">
        <div class="bg-red-400 rounded-full px-10 p-4 text-yellow-200">Lorem ipsum dolor sit.</div>
    </useToast>

</template>

<script setup>
import { ref } from 'vue';
import useToast from './reusableComponents/useToastNotification.vue';

const toggle = ref(false)
const second = ref(false)
</script>







