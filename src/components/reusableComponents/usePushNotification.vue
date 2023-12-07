<template>
    <div v-if="toggle" class="bg-red-200 text-blue-900 w-fit m-auto relative">
        <div>
            <Transition name="width-increase">
                <div v-if="topLeft" class="bg-blue-900 h-[3px] absolute left-0 w-[50%]"></div>
            </Transition>
            <Transition name="width-increase">
                <div v-if="topRigth" class="bg-blue-900 h-[3px]  absolute right-0 w-[50%]"></div>
            </Transition>
        </div>
        <div class="p-5 w-fit max-w-[400px] m-auto">
            <slot />
        </div>
        <div>
            <Transition name="width-increase">
                <div v-if="bottomLeft" class="bg-blue-900 h-[3px] absolute left-0 w-[50%]"></div>
            </Transition>
            <Transition name="width-increase">
                <div v-if="bottomLeft" class="bg-blue-900 h-[3px] absolute right-0 w-[50%]"></div>
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, defineEmits, watchEffect } from 'vue';

const props = defineProps({
    toggle: Boolean
})
const emit = defineEmits(['false'])
const topLeft = ref(false)
const topRigth = ref(false)
const bottomLeft = ref(false)
const bottomRight = ref(false)

watchEffect(() => {
    if (props.toggle) {
        setTimeout(() => {            
            topLeft.value = true
            topRigth.value = true
            bottomLeft.value = true
            bottomRight.value = true
        }, 100);
        setTimeout(() => {
            topLeft.value = false
            topRigth.value = false
            bottomLeft.value = false
            bottomRight.value = false
            emit('false')
        }, 3000);
    }
})

</script>

<style scoped>
.width-increase-enter-from {
    width: 0px;
}

.width-increase-enter-active {
    animation: move 3s ease;
}

@keyframes move {
    0% {
        width: 0px;
    };
    100% {
        width: 50%;
    }
}
</style>