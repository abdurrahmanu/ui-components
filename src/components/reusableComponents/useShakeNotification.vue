<template>
    <div>
            <div :class="[shake ? 'shakeDiv' : '']">
                    <slot />
            </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watchEffect } from 'vue';

const props = defineProps({
    shake: Boolean,
})
const emit = defineEmits(['false'])

watchEffect(() => {
    if (props.shake) {
        setTimeout(() => {
            emit('false')
        }, 600);
    }
})

</script>

<style scoped>
.shakeDiv {
    animation: shake 0.5s both;
}

</style>