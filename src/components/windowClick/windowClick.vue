<template>
    <div id="click_#_effect">
        <div v-if="multi" ref="effectElements">
            <windowClick 
            @targetClicked="targetClicked"
            v-for="index in number" 
            :key="index" 
            :target="target" 
            :noException="noException"
            :direction="direction"
            :time="time"
            :rainbow="rainbow" />
        </div>

        <div v-else ref="effectElement">
            <windowClick
            @targetClicked="targetClicked"
            :noException="noException"
            :time="time"
            :target="target" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import windowClick from './windowClickEffect.vue';

const multi = ref(false)
const effectElements = ref([])
const effectElement = ref(null)
const props = defineProps({
    number: Number,
    rainbow: Boolean,
    target: String,
    noException: Boolean,
    time: Number,
    direction: String,
    multi: Boolean,
})

watchEffect(() => {
    multi.value = props.multi
})

const targetClicked = () => {
    console.log(multi.value, effectElements.value.children);
    if (multi.value && effectElements.value.children[0] instanceof HTMLElement) {
        
    } 
}

onMounted(() => {
})

</script>

<style scoped>
</style>