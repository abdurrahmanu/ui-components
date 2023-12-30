<template>
    <div class="p-20">
        <div v-if="start" class="container">
            <Transition :name="animationName" mode="out-in">
                <div v-if="isNextCountDown" ref="countDownElement">{{ currentCountDown }}</div>
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, watchEffect, defineEmits, watch, onMounted } from 'vue';

const emit = defineEmits(['stop'])
const props = defineProps({
    arr: Array,
    interval: Number,
    start: Boolean,
    length: Number,
    animate: Boolean,
    animationType: cString
})

const animationName = ref(null)
const countDownElement = ref(null)
const currentCountDown = ref(null)
const isNextCountDown = ref(true)
const countDownIndex = ref(0)
const timerId = ref(null)
const start = ref(props.start)

watch(start, (newValue, oldValue) => {
    if (newValue) {
        timerId.value = setInterval(() => {
            currentCountDown.value = props.arr[countDownIndex.value]
            countDownIndex.value++        
        }, props.interval);
    }
})

watchEffect(() => {
    start.value = props.start;
    
    if (currentCountDown.value) {
        if (props.animate) {
            isNextCountDown.value = false
            setTimeout(() => {
                isNextCountDown.value = true
            }, 0);
        }
        
        if (countDownIndex.value === props.arr.length) {
            setTimeout(() => {
                clearInterval(timerId.value)
                countDownIndex.value = 0
                emit('stop')
            }, props.interval + 1);
        }
    }
})

//animations

onMounted(() => {
    
    watchEffect(() => {
        if (props.start) {
            if (props.animate) {
                if (countDownElement.value instanceof HTMLElement) {
                    animationName.value = props.animationType.split(' ').join('-')
                }
            }
        }
    })
})


</script>

<style scoped>
.container {
    @apply text-blue-500 text-center text-[60px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[39px] min-h-[60px] w-fit font-bold
}

.slide-up-enter-active,
.slide-up-leave-active, 
.slide-down-enter-active,
.slide-down-leave-active,
.scale-up-enter-active,
.scale-up-leave-active, 
.scale-down-enter-active,
.scale-down-leave-active,
.slide-left-enter-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-random-enter-active,
.slide-random-leave-active,
.slide-right-scale-up-enter-active,
.slide-right-scale-down-enter-active,
.slide-left-scale-up-enter-active,
.slide-left-scale-down-enter-active,
.slide-up-scale-up-enter-active,
.slide-up-scale-down-enter-active,
.slide-down-scale-up-enter-active,
.slide-down-scale-down-enter-active,
.slide-right-scale-up-leave-active,
.slide-right-scale-down-leave-active,
.slide-left-scale-up-leave-active,
.slide-left-scale-down-leave-active,
.slide-up-scale-up-leave-active,
.slide-up-scale-down-leave-active,
.slide-down-scale-up-leave-active,
.slide-down-scale-down-leave-active,
.slide-left-leave-active {
    transition: all .5s ease;
    scale: 1;
}

.slide-up-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-100%);
}

.slide-up-leave-to,
.slide-down-enter-from {
    transform: translateY(100%);
    opacity: 0;
}

.slide-left-enter-from,
.slide-right-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}

.slide-left-leave-to,
.slide-right-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.slide-random-enter-from {
    
}

.slide-random-leave-to {
    
}


.scale-up-enter-from,
.scale-down-leave-to {
    scale: 0.3;
    opacity: 0;
}

.scale-up-leave-to,
.scale-down-enter-from {
    scale: 1;
    opacity: 0;
}


.slide-down-scale-down-enter-from {
    scale: 0.4;
    opacity: 0;
    transform: translateY(-100%);
}

.slide-down-scale-down-leave-to {
    scale: 0.3;
    opacity: 0;
    transform: translateY(100%);
}

.slide-down-scale-up-enter-from {
    scale: 0.3;
    opacity: 0;
    transform: translateY(-100%);
}

.slide-down-scale-up-leave-to {
    scale: 0.4;
    opacity: 0;
    transform: translateY(100%);
}

.slide-up-scale-down-enter-from {
    scale: 0.4;
    opacity: 0;
    transform: translateY(100%);
}

.slide-up-scale-down-leave-to {
    scale: 0.3;
    opacity: 0;
    transform: translateY(-100%);
}

.slide-up-scale-up-enter-from {
    scale: 0.3;
    opacity: 0;
    transform: translateY(100%);
}

.slide-up-scale-up-leave-to {
    scale: 0.4;
    opacity: 0;
    transform: translateY(-100%);
}

.slide-left-scale-up-enter-from {
    scale: 0.3;
    opacity: 0;
    transform: translateX(100%);
}

.slide-left-scale-up-leave-to {
    scale: 0.4;
    opacity: 0;
    transform: translateX(-100%);
}

.slide-right-scale-up-enter-from {
    scale: 0.3;
    opacity: 0;
    transform: translateX(-100%);
}

.slide-right-scale-up-leave-to {
    scale: 0.4;
    opacity: 0;
    transform: translateX(100%);
}

.slide-left-scale-down-enter-from {
    scale: 0.4;
    opacity: 0;
    transform: translateX(100%);
}

.slide-left-scale-down-leave-to {
    scale: 0.4;
    opacity: 0;
    transform: translateX(-100%);
}

.slide-right-scale-down-enter-from {
    scale: 0.3;
    opacity: 0;
    transform: translateX(-100%);
}

.slide-right-scale-down-leave-to {
    scale: 0.5;
    opacity: 0;
    transform: translateX(100%);
}

</style>

