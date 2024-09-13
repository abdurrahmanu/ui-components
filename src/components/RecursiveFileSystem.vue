<template>
    <div class="pl-4 text-xs transition-all duration-150 py-[1px] w-fit selection:bg-transparent text-slate-500">
        <div @click="file ? toggle = !toggle : ''" class="flex gap-2 items-center hover:bg-neutral-800 py-[1px] px-2 rounded-sm">
            <div :class="[file && Object.entries(file).length ? ' ' : 'hidden', toggle ? 'rotate-[90deg]' : '']" class="font-mono text-slate-400 cursor-pointer text-[10px]">></div>
            <div :class="[file ? 'bg-neutral-700 ' : 'bg-slate-300']" class="w-3 h-3 rounded-sm"></div>
            <div>{{ node }} </div>
        </div>
        <RecursiveFileSystem 
        v-if="toggle"
        :file="file" 
        :key="node"
        :node="node" 
        v-for="(file, node, index) in file" />
    </div>
</template>

<script setup>
import {ref,} from 'vue'

const toggle = ref(false)
const props = defineProps({
    node: String,
    file: Object
})
</script>