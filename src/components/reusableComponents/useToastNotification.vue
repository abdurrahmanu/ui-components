<script setup>
import { watchEffect, defineProps, ref} from 'vue';

const toast = ref(false)
const props = defineProps({
    toggle: Boolean
})
const emit = defineEmits(['false'])

watchEffect(() => {
    if (props.toggle) {
        toast.value = true
        setTimeout(() => {
            toast.value = false
            emit('false')
        }, 3000);
    }
})

</script>

<template>
    <Teleport to="#toast">
        <Transition name="toast">
            <div v-if="toast" class="absolute p-2 translate-x-[300px] grid place-content-center w-fit">
                <slot />
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>

.toast-enter-from {
    transform: translateX(0px);
}

.toast-enter-active {
    animation: move 3s ease;
}

@keyframes move {
    0% {
        transform: translateX(0px)
    };
    50% {
        transform: translateX(300px)
    };
    100% {
        transform: translateX(300px)
    }
}

</style>






