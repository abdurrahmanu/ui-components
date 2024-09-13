<template>
    <div class="fixed top-0 translate-x-[-50%] left-[50%] m-auto h-fit w-[90%] text-center perspective">
    <Transition appear mode="in-out" name="top">
            <span v-if="toggle" class="p-1 w-fit z-[4] shadow-sm min-w-[300px] shadow-black py-2 text-xs text-red-400 bg-slate-300 px-1 font-[500] max-w-full inline-block top-0">
                {{text}}
            </span>
        </Transition>
    </div>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        default: 'Toast example'
    },
    toggle: {
        type: Boolean,
        default: false,
    }
})
</script>

<style scoped>
.perspective {
    perspective: 80px;
}

.top-enter-from {
    transform: rotateX(90deg);
    transform-style: preserve-3d;
    opacity: 0;
}

.top-leave-to {
    transform: rotateX(90deg);
    transform-style: preserve-3d;
    opacity: 0;
}

.top-enter-active {
    transition: all 0.4s ease;
}

.top-leave-active {
    transition: all 0.3s ease;
}

</style>
