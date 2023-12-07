<template>
    <div class="p-3">
        <div class="px-7 p-1 rounded-md bg-teal-800 text-center text-xs font-mono text-zinc-100">
            <div v-if="!content">
                <slot/>
            </div>
            <div v-else>
                {{ content }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    content: String
})

</script>

<style lang="scss" scoped>
</style>