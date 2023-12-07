<template>
    <usePushNotification :toggle="toggle" @false="toggle = false">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora dolores mollitia et maiores sunt impedit dolorum, autem accusamus expedita veritatis.
    </usePushNotification>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import usePushNotification from './reusableComponents/usePushNotification.vue';

const props = defineProps({
    bg: String
})

const text = ref('button')
const toggle = ref(false)

</script>