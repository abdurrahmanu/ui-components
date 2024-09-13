export function code() {
    return `<template>
        <div ref="effectElement" :class="background" class="transition-all duration-100 w-[10px] rounded-full absolute h-[10px] bg-blue-300"></div>
    </template>
    
    <script setup>
    import { onMounted, ref } from 'vue';
    const effectElement = ref(null)
    
    const props = defineProps({
        background: String,
    });
    
    onMounted(() => {
        document.body.style.height = '100vh';
        effectElement.value.style.display = 'hidden'
    
        window.addEventListener('click', event => {
            if (effectElement.value instanceof HTMLElement) {
                effectElement.value.style.top = event.clientY + 'px'
                effectElement.value.style.left = event.clientX + 'px'
            }
        })
    })
    </script>`
}