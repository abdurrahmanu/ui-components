<template>
    <!-- 
    ACCEPTS 3 PROPS

    *initialPage...eg 5.
    *showLength....eg 1,2,3,4,5
    *length....eg 100 

        <div>
            <Pagination
            initialPage=30
            showLength=5
            length=100
            />
        </div>
    -->

    <div class="container">
        <div @click="goPrev" class="arrow">&lt;</div>
        <div class="pagesList">
            <div :class="[pageNumber === page ? 'current-page': '']" class="page" v-for="(pageNumber, index) in paginationShowArray" :key="index">
                {{ pageNumber }} 
            </div>
        </div>
        <div @click="goNext" class="arrow">></div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, watchEffect, onBeforeMount } from 'vue';

const paginationArray = ref([])
const paginationShowArray = ref([])
const page = ref()
const initialPage = ref()
const showLength = ref()
const length = ref()
const emit = defineEmits(['pageNumber'])
const props = defineProps({
    initialPage: Number,
    showLength: Number,
    length: Number,
})

watchEffect(() => {
    initialPage.value = props.initialPage
    showLength.value = props.showLength
    length.value = props.length
})

onBeforeMount(() => {
    if (!props.showLength) showLength.value = 3
    if (!props.length) length.value = 15
    if (!props.initialPage) initialPage.value = 1

    let backwardLimit = Math.floor(showLength.value / 2)
    let forwardLimit = Math.floor(showLength.value / 2)
    const initialPageIsNotInAlignmentWithStart = ref(false)
    const initialPageIsNotInAlignmentWithEnd = ref(false)

    if (initialPage.value && length.value) {
        const countBackward = ref(0)
        const countForward = ref(0)
        page.value = initialPage.value

        for (let index = initialPage.value - 1; index > 0; index--) {
            if (countBackward.value < backwardLimit) {                
                countBackward.value++
            } else break
        }

        for (let index = initialPage.value + 1; index < length.value + 1; index++) {
            if (countForward.value < forwardLimit) {
                countForward.value++
            } else break
        }

        if (countBackward.value < backwardLimit) initialPageIsNotInAlignmentWithStart.value = true
        if (countForward.value < forwardLimit) initialPageIsNotInAlignmentWithEnd.value = true
    }
    
    if (length.value) {
        for (let index = 1; index < length.value + 1; index++) {
            paginationArray.value.push(index)
        }
    }

    if (showLength.value) {
        if (!initialPageIsNotInAlignmentWithStart.value && !initialPageIsNotInAlignmentWithEnd.value) {
            let start = initialPage.value - backwardLimit
            let limit =  initialPage.value + forwardLimit + 1
            for (let index = start; index < limit; index++) {
                paginationShowArray.value.push(index)
            }
        }

        if (initialPageIsNotInAlignmentWithStart.value) {
            const start = ref(initialPage.value - backwardLimit)
            const limit = ref(initialPage.value + 1)

            for (let index = start.value; index < limit.value; index++) {
                if (index > 0) {
                    paginationShowArray.value.push(index)
                } else {
                    paginationShowArray.value.push('')
                }
            }

            start.value = limit.value
            limit.value = start.value + forwardLimit
            for (let index = start.value; index < limit.value; index++) {
                paginationShowArray.value.push(index)
            }
        }

        if (initialPageIsNotInAlignmentWithEnd.value) {
            const start = ref(initialPage.value - backwardLimit)
            const limit = ref(initialPage.value + 1)

            for (let index = start.value; index < limit.value; index++) {
                paginationShowArray.value.push(index)
            }

            start.value = limit.value
            limit.value = start.value + forwardLimit
            for (let index = start.value; index < limit.value; index++) {
                if (index < length.value + 1) {
                    paginationShowArray.value.push(index)
                } else {
                    paginationShowArray.value.push('')
                }
            }
        }
    }
})

const goNext = () => {
    let lastIndex = paginationShowArray.value[paginationShowArray.value.length - 1]

    if (lastIndex < length.value && lastIndex !== '') {
        page.value++
        paginationShowArray.value.shift()
        paginationShowArray.value.push(lastIndex + 1)
        emit('pageNumber', page.value)
    }

    else {
        if (page.value !== length.value) {
            page.value++
            paginationShowArray.value.shift()
            paginationShowArray.value.push('')
            emit('pageNumber', page.value)
        }
    }
}

const goPrev = () => {
    if (paginationShowArray.value[0] > 1) {
        page.value--
        paginationShowArray.value.pop()
        paginationShowArray.value.unshift((paginationShowArray.value[0] - 1))
        emit('pageNumber', page.value)
    }
    
    else {
        if (page.value !== 1) {
            page.value--
            paginationShowArray.value.pop()
            paginationShowArray.value.unshift('')
            emit('pageNumber', page.value)
        }
    }
}

onMounted(() => emit('pageNumber', initialPage.value))
</script>

<style scoped>
.container {
    @apply flex items-center m-auto bg-green-500 rounded-md p-[2px] text-xs w-fit
}

.page {
    @apply p-1 border bg-zinc-100 font-mono rounded-md w-fit
}

.arrow {
    @apply font-mono text-white text-xl p-1
}

.pagesList {
    @apply flex gap-1 items-center w-fit m-auto overflow-hidden px-1 transition-all duration-200
}

.current-page {
    @apply w-5 h-8 flex p-1 items-center justify-center px-2 py-[2px]
}
</style>








