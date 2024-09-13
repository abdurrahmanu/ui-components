<template>
    <div class="flex items-center selection:bg-transparent text-xs gap-1">
        <div v-if="buttons" @click="prev" class="font-mono font-bold px-4 py-1 rounded-md border">&lt;</div>
        <div 
        :class="[true ? 'px-3 py-1 border-transparent border-[1px] hover:border-gray-700 rounded-md' : '', display.includes(index + 1) ? '' : 'hidden' ,currentPage === page && currentIndex === index ? 'bg-neutral-800 rounded-md mx-2 shadow-sm shadow-black' : '']"
        :key="index" 
        v-for="(page, index) in (size || pagesList || null)"
        @click="index < currentIndex ? prev(index) : next(index)">
            {{ page  }}
        </div>
        <div v-if="buttons" @click="next" class="font-mono font-bold px-4 py-1 rounded-md border">&gt;</div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
    pagesList: {
        type: Array,
        default: []
    },
    size: {
        type: Number,
        default: 0
    },
    displayLength: {
        type: Number,
        default: 3
    },
    pagePosition: {
        type: String,
        default: 'left'
    },
    go: {
        type: String,
        default: ''
    },
    buttons: {
        type: Boolean,
        default: true
    }
})

const currentIndex = ref(0)
const currentPage = ref(null)
const emit = defineEmits(['clear-direction', 'current', 'has-next', 'has-prev'])

const hasPrev = computed(() => currentIndex.value > 0)
const hasNext = computed(() => (currentIndex.value < props.size - 1) || (currentIndex.value < props.pagesList.length - 1) || false)

const prev = (index) => {
    if (!hasPrev.value) return
    if (typeof index === 'number') {
        currentIndex.value ? currentIndex.value -= (currentIndex.value - index) : null
        currentPage.value = props.pagesList[index] || currentIndex.value + 1
    } else {
        currentIndex.value ? currentIndex.value-- : null
        currentPage.value = props.pagesList[currentIndex.value] || currentIndex.value + 1;
    }
    emit('has-prev', hasPrev.value)
    emit('has-next', hasNext.value)
    emit('current', currentPage.value)    
    emit('clear-direction', '')
}

const next = (index) => {
    if (index === 0 || !hasNext.value) return
    if (typeof index === 'number') {
        currentIndex.value = index 
        currentPage.value = props.pagesList[index + 1] || index + 1
    } else {
        currentIndex.value++
        currentPage.value = props.pagesList[currentIndex.value] || currentIndex.value + 1
    }
    emit('has-next', hasNext.value)
    emit('has-prev', hasPrev.value)
    emit('current', currentPage.value)
    emit('clear-direction', '')
}

const display = computed(() => {
    if (props.pagePosition === 'mid') {
        let middle = Math.round(props.displayLength / 2) - 1
        return new Array(props.displayLength).fill(0).map( (element, index) => ((index + 1) - middle) + currentIndex.value);
    }
    if (props.pagePosition === 'left') return new Array(props.displayLength).fill(0).map( (element, index) => (index + 1) + currentIndex.value)
    if (props.pagePosition === 'right') return new Array(props.displayLength).fill(0).map( (element, index) => (index + 2) - props.displayLength + currentIndex.value);
})

onMounted(() => {
    currentPage.value = (props.size ? 1 : null) || props.pagesList[0] || null
    emit('current', currentPage.value)
    emit('has-next', hasNext.value)
    emit('has-prev', hasPrev.value)
})

watch(() => props.go, newVal =>newVal === 'next' ? next() : newVal == 'prev' ? prev() : '' )
</script>