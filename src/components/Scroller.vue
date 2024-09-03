<template>
    <div ref="containerElement" class="relative p-1 m-auto bg-blue-200 w-fit selection:bg-transparent">        
        <div class="max-w-[400px] min-w-[200px]">
            <div :class="[scrollDistance !== 0 ? 'opacity-100' : 'opacity-70']" @click="scroll('left')" class="absolute top-0 bottom-0 right-[100%] flex items-center justify-center p-1 px-3 font-mono bg-white w-fit">            
                <div :class="[scrollDistance !== 0 ? 'opacity-100' : 'opacity-0']" class="text-xl">&lt;</div>
            </div>
            <div ref="scrollElement" class="flex py-1 overflow-scroll transition-all duration-500 scroll-smooth">
                <div class="flex gap-4">         
                    <slot />
                </div>
            </div>
            <div :class="[scrollDistance !== -1 ? 'opacity-100' : 'opacity-70']" @click="scroll('right')" class="absolute top-0 bottom-0 left-[100%] flex items-center justify-center px-3 font-mono bg-white w-fit">            
                <div :class="[scrollDistance !== -1 ? 'opacity-100' : 'opacity-0']" class="text-xl">&gt;</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue'

const containerElement = ref(null)
const scrollElement = ref(null)
const scrollElementWidth = ref(0)
const scrollDistance = ref(0)

const scroll = (dir) => {
    const cssObject = getComputedStyle(scrollElement.value)
    const width = +cssObject.getPropertyValue('width').slice(0, -2) * 0.8
    
    if (dir === 'left')  scrollElement.value.scrollLeft -= width
    if (dir === 'right') scrollElement.value.scrollLeft += width
}

onMounted(() => {
    if (scrollElement.value instanceof HTMLElement) {        
        scrollDistance.value = scrollElement.value.scrollLeft
        
        scrollElement.value.addEventListener('scroll', event => {
            if (scrollElement.value.clientWidth + scrollElement.value.scrollLeft === scrollElement.value.scrollWidth) scrollDistance.value = -1
            else scrollDistance.value = scrollElement.value.scrollLeft                
            
        })
    }
})
</script>

<style scoped>
::-webkit-scrollbar {
    display: none;
}
</style>