<template>
    <!-- .............THIS COMPONENT ACCEPTS ONE PROP (toggle - to toggle modal) AND EMITS ONE DATA  (false - to close modal)-->
    <Teleport to="#modal-root">
        <Transition>           
            <div @click="toggleModal" v-if="toggle" class="modal-overlay"></div>
        </Transition>
        <Transition name="content">
            <div class="modal-container" v-if="toggle" >
                <div class="modal">
                    <div @click="toggleModal" class="modal-close">x</div>
                    <slot ></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, defineProps, defineEmits, onBeforeMount } from 'vue';

onBeforeMount(() => {
    if (!document.body.contains(document.getElementById('modal-root'))) {
        const modalRoot = ref(document.createElement('div'))
        modalRoot.value.id = 'modal-root'
        document.body.appendChild(modalRoot.value)
    }
})

const props = defineProps({
    toggle: Boolean
})

const emit = defineEmits(['false'])
const toggleModal = () => emit('false')
</script>

<style scoped>
.modal-overlay {
    @apply fixed h-screen w-full top-0 left-0 bg-black opacity-40
}

.modal-container {
    @apply fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
}

.modal {
    @apply bg-blue-300 text-white place-content-center p-4 pt-8 rounded-md
}

.modal-close {
    @apply absolute top-0 right-2
}
</style>

