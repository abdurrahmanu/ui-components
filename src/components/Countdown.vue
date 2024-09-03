<template>
    <div class="text-[18px] font-medium max-w-fit m-auto">
        <Transition name="slide-left" mode="out-in">
            <div>{{ countdown }}</div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const countdown = ref(0)
const intervalID = ref(null)

const props = defineProps({
    start: Boolean,
    length: Number,
})

onMounted(() => {
    countdown.value = props.length
    
    if (props.start) {
        intervalID.value = setInterval(() => {        
            countdown.value--
            if (countdown.value === 0) {
                clearInterval(intervalID.value)
            }
        }, 1000)
    }
})
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
    transition: all .5s ease;
}

.slide-left-enter-from {
    opacity: 0;
}

.slide-left-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>

