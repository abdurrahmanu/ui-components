<template>
    <div ref="disableElement"  class="fixed w-2 h-2 bg-transparent rounded-full z-[999999] translate-x-[-50%] translate-y-[-50%]"></div>
    <div @click="toggleMouse = !toggleMouse" class="px-4 py-1 text-white selection:bg-transparent cursor-default bg-green-300 rounded-full hover:bg-green-500 z-[9999999999999999999999999] w-fit fixed">{{ toggleMouse ? 'Disable mouse' : 'Enable mouse' }}</div>
    
    <div class="mt-10 space-y-3 text-white">        
        <div class="px-3 py-1 bg-red-500 rounded-md hover:bg-red-300 w-fit">asdfasdfasdfasdfasdf</div>
        <div class="px-3 py-1 bg-red-500 rounded-md hover:bg-red-300 w-fit">asdfasdfasdfasdfasdf</div>
        <div class="px-3 py-1 bg-red-500 rounded-md hover:bg-red-300 w-fit">asdfasdfasdfasdfasdf</div>
        <div class="px-3 py-1 bg-red-500 rounded-md hover:bg-red-300 w-fit">asdfasdfasdfasdfasdf</div>
        <div class="px-3 py-1 bg-red-500 rounded-md hover:bg-red-300 w-fit">asdfasdfasdfasdfasdf</div>
    </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue'

const disableElement = ref(null)
const toggleMouse = ref(true)

onMounted(() => {
    window.addEventListener('mousemove', event => {
        if (!toggleMouse.value) {
            if (disableElement.value instanceof HTMLElement) {
                disableElement.value.style.top = event.clientY + 'px'
                disableElement.value.style.left = event.clientX + 'px'
            }
        }
    })
})

watch(toggleMouse, newVal => {
    newVal ? disableElement.value.display = 'block' : disableElement.value.display = 'hidden'
})
</script>