<template>
    <div class="flex items-center m-auto rounded-md p-[2px] text-xs w-fit">
        <div @click="prev" class="p-1 font-mono text-xl text-black">&lt;</div>
        <div class="flex items-center gap-1 px-1 m-auto overflow-hidden transition-all duration-200 w-fit">
            <div :class="[currentPage === page ? 'w-5 h-8 flex bg-blue-600 text-white items-center justify-center px-2 py-[2px]': 'text-black border border-zinc-300']" class="p-1 font-mono rounded-md bg-zinc-100 w-fit" v-for="(page, index) in showArray" :key="index">
                {{ page }} 
            </div>
        </div>
        <div @click="next" class="p-1 font-mono text-xl text-black">></div>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, onBeforeMount, computed, unref } from 'vue';

const currentPage = ref(1)
const showLength = ref()
const emit = defineEmits(['pageNumber'])

const props = defineProps({
    currentPage: Number,
    showLength: Number,
    length: Number,
    prevButtonText: String,
    nextButtonText: String,
    middle: Boolean,
})

watchEffect(() => {
    currentPage.value = props.currentPage
    showLength.value = props.showLength
})

onBeforeMount(() => {
    let array = ref([])
    if (props.showLength) {
        if (!props.middle) {
        for (let index = 0; index < props.showLength; index++) {
            array.value.push(props.currentPage + index)
        }
    } else {
        for (let index = 0; index < props.showLength; index++) {
            
        }
    }
    }
})

const showArray = computed(() => {
    let array = ref([])
    if (!props.middle) {
            for (let index = 0; index < props.showLength; index++) {
                array.value.push(props.currentPage + index)
            }
    } else {
        for (let index = 0; index < props.showLength; index++) {
            
        }
    }

    return unref(array)
})

const next = () => {
    if (currentPage.value < props.length) {
        currentPage.value++ 
        emit('pageNumber', currentPage.value)
    }
}

const prev = () => {
    if (currentPage.value > 1) {
        currentPage.value--
        emit('pageNumber', currentPage.value)
    }
}

onMounted(() => emit('pageNumber', currentPage.value))
</script>









