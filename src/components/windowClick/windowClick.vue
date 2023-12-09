<template>
    <div id="click_#_effect">
        <div v-show="multi" ref="effectElements">
            <windowClick 
            @targetClicked="targetClicked"
            v-for="index in number" 
            :key="index" 
            :index="index"
            :target="target" 
            :noException="noException"
            :direction="directions[index - 1]"
            :time="time"
            :rainbow="rainbow" />
        </div>

        <div v-show="!multi" ref="effectElement">
            <windowClick
            @targetClicked="targetClicked"
            :noException="noException"
            :time="time"
            :target="target" />
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import windowClick from './windowClickEffect.vue';

const multi = ref(false)
const effectElements = ref([])
const effectElement = ref(null)
const directions = ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 't-top-left', 't-top-right', 'b-bottom-left', 'b-bottom-right',]
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
</script>

