<template>
    <Teleport to="#sideBar">
        <div>            
            <Transition>           
                <div @click="closeSidebar" v-if="toggle" class="fixed min-h-screen w-full top-0 left-0 bg-black opacity-40"></div>
            </Transition>
            <Transition name="side">
                <div v-if="toggle" :class="class" class="fixed top-0 min-h-screen left-0">
                    <div class="p-3 pt-2 relative grid text-right">
                        <span v-if="showContent" @click="closeSidebar" class="text-2xl">x</span>
                    </div>
                    <div v-if="showContent">
                        <slot/>
                    </div>                       
                </div>
            </Transition>
        </div>
    </Teleport>
</template>

<script setup>
import { defineProps, watchEffect, ref } from 'vue';

const props = defineProps({
    toggle: Boolean,
    class: String,
})

const emit = defineEmits(['false'])
const showContent = ref(false)

const closeSidebar = () => {
    showContent.value = false
    setTimeout(() => {        
        emit('false')
    }, 200);
}

watchEffect(() => {
    if (props.toggle) {
        setTimeout(() => {            
            showContent.value = true
        }, 1000);
    }
})

</script>

<style scoped>
.side-enter-from, 
.side-leave-to {
    width: 0px;
}

.side-enter-active {
    animation: open 1s ease;
}

.side-leave-active {
    animation: close 0.5s ease;
}

@keyframes open {
    0% {
        width: 0px;
    };
    100% {
        width: 100%;
    }
}

@keyframes close {
    0% {
        width: 208px
    };
    100% {
        width: 0px,
    }
}
</style>