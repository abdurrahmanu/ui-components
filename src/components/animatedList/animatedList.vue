<template>
    <div ref="nodeListContainer" class="grid justify-center h-fit relative m-10 w-fit bg-red-300">
        <div ref="nodeList" class="w-[100px] text-center text-white top-0 transition-all duration-[3s] left-0 absolute font-mono p-1 bg-black px-4 border-b-[1px] border-gray-900" v-for="(item, index) in arr" :key="index">
            {{ item }}
        </div>
    </div>
    <button @click="openDrop = !openDrop" class="bg-green-400 rounded-full ml-40  px-4 p-1 text-xs text-teal-800 border border-blue-500">OPEN DROPDOWN</button>
</template>

<script setup>
import { onMounted, ref, watchEffect, defineProps } from 'vue';

const openDrop = ref(false)
const nodeListContainer = ref(null)
const nodeList = ref([])
const arr = ref([1,2,3,4,5,6,7,8,9])
const nodeListArray = ref([])
const props = defineProps({
    arr: Array,
    duration: Number,
})

onMounted(() => {
    nodeListArray.value = Array.from(nodeList.value)
    nodeListContainer.value.replaceChildren(...Array.from(nodeListContainer.value.children).reverse())
    const count = ref(0)
    const totalHeight = ref(0)

    watchEffect(() => {
        if (openDrop.value && !totalHeight.value) {
            for (let index = 1; index < nodeListArray.value.length; index++) {
                totalHeight.value += nodeListArray.value[index].getBoundingClientRect().height
                nodeListArray.value[index].style.top = totalHeight.value + 'px'
                count.value++
            }
        }
    })

    watchEffect(() => {
        if (!openDrop.value && totalHeight.value) {
            if (count.value === nodeListArray.value.length - 1) {
                count.value = 0
                for (let index = nodeListArray.value.length; index > 1; index--) {
                    nodeListArray.value[index - 1].style.top = 0
                }
                count.value = 0
                totalHeight.value = 0
            }
        }
    })
})

</script>