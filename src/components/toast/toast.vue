<script setup>
import { watchEffect, ref, onBeforeMount, onMounted} from 'vue';

const toast = ref(false)
const transitionType = ref('')
const toastEl = ref(null)
const props = defineProps({
    toggle: {
        type: Boolean,
        default: false,
    },
    left: {
        type: Boolean,
        default: false,
    },
    right: {
        type: Boolean,
        default: false,
    },
    top: {
        type: Boolean,
        default: false,
    },
    bottom: {
        type: Boolean,
        default: false,
    },
    full: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['false'])

onBeforeMount(() => {
    if (props.left)   transitionType.value = 'left'
    if (props.right)  transitionType.value = 'right'
    if (props.top) transitionType.value = 'top'
    if (props.bottom) transitionType.value = 'bottom'
    if (!props.left && !props.right && !props.top && !props.bottom) transitionType.value = 'left'
})

onMounted(() => {
    watchEffect(() => {
        if (props.toggle && toastEl.value instanceof HTMLElement) {
            if ((!props.left && !props.right && !props.top && !props.bottom) || props.left)  toastEl.value.className += ' top-0 left-0 w-fit'
            if (props.right)  toastEl.value.className += ' right-0 w-fit top-0'
            if (props.top)  toastEl.value.className += 'top-0 w-fit'
            if (props.bottom)  toastEl.value.className += ' bottom-0 left-0 w-fit'
        }
    })
})

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
    <Teleport to="body">
        <Transition :name="transitionType">
            <div ref="toastEl" v-if="toast" class="fixed p-1 w-fit">
                <slot />
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
/* ENTER */
.bottom-enter-from {
    transform: translateY(100%);
}

.left-enter-from {
    transform: translateX(-100%);
}

.right-enter-from {
    transform: translateX(100%);
}

.top-enter-from {
    transform: translateY(-100%);
}

/* LEAVE */

.bottom-leave-to {
    transform: translateY(100%);
}

.left-leave-to {
    transform: translateX(-100%);
}
.right-leave-to {
    transform: translateX(100%);
}

.top-leave-to {
    transform: translateY(-100%);
}

/* ENTER ACTIVE */

.left-enter-active, 
.top-enter-active,
.right-enter-active,
.auto-enter-active,
.bottom-enter-active {
        transition: all 0.3s ease;
}

/*  LEAVE ACTIVE */

.left-leave-active, 
.top-leave-active,
.right-leave-active,
.auto-leave-active,
.bottom-leave-active {
        transition: all 0.3s ease;
}

</style>





