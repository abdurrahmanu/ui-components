<template>
    <div tabindex="0" @focus="isFocused = true" @blur="isFocused = false" ref="container" :style="style" class="overflow-y-auto scroll-smooth ring-[1px] ring-slate-300 outline-none relative selection:bg-none">
        {{ text }}
    </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue'

const style = ref({})
const isFocused = ref(false)
const container = ref(null)
const scrollX_ = ref(0)
const scrollY_ = ref(0)
const containerScroll = ref(0)
const emit = defineEmits(['clearDirection'])
const props = defineProps({
    text: {
        type: String,
        default: `This text describes how this container works, The container does not accept any HTML elements, it accepts only pure texts.
        You only choose the number of lines of text you want before scroll and it calculates it perfectly for you, 
        it also considers line height, font size and also supports resize event on any of the mentioned properties, You just style and
        the container helps you with the rest. This is the ideal container for texts in browsers. You can disable keyboard scroll,
        Screen touch scroll and also Mouse scrollers and rely solely on props and events to scroll. You can also specify the vertical distance you want to scroll with on scroll event.`
    },
    lines: {
        type: Number,
        default: 3
    },
    disableMouseScroll: {
        type: Boolean,
        default: false
    },
    disableKeyboardScroll: {
        type: Boolean,
        default: false
    },
    disableTouchScroll: {
        type: Boolean,
        default: false
    },
    disableScrollbar: {
        type: Boolean,
        default: false
    },
    scrollDirection: {
        type: String,
        default: 'down'
    },
    scrollDistance: {
        type: String,
        default: ''
    }
})

function preventKeyBoardScroll(e) {
    if ([38, 40].includes(e.keyCode)) {
        e.preventDefault();
        return false;
    }
}

function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function updateStyle() {
    const cssObject = getComputedStyle(container.value)
    style.value = {'height': +cssObject.getPropertyValue('line-height').slice(0, 2) * props.lines + 'px'}
}

onMounted(() => {
    updateStyle()

    window.addEventListener('keydown', event => {
        if (isFocused.value && props.disableKeyboardScroll) preventKeyBoardScroll(event)
    })
    
    window.addEventListener('touchmove', event => {
        if (event.target === container.value || container.value.contains(event.srcElement) && props.disableTouchScroll) preventScroll(event)
    }, {passive: false})
    
    window.addEventListener('wheel', event => {
        if (event.target === container.value || container.value.contains(event.srcElement) && props.disableMouseScroll) preventScroll(event)
    }, {passive: false})

    container.value.addEventListener('scroll', event => {
        container.value.style.overflow = 'hidden'
        event.preventDefault()
        if (scrollX_.value || scrollY_.value) container.value.scrollTo(scrollX_.value, scrollY_.value)
    })
})

function scrollY() {
    if (props.scrollDirection === 'up' && container.value.scrollTop !== 0) {
        containerScroll.value -= container.value.clientHeight
        container.value.scrollTo({
            top: containerScroll.value
        })
    }

    else if (props.scrollDirection === 'down' && !(container.value.clientHeight + container.value.scrollTop === container.value.scrollHeight)) {
        containerScroll.value += container.value.clientHeight
        container.value.scrollTo({
            top: containerScroll.value
        })    
    }

    scrollY_.value = container.value.scrollTop
    scrollX_.value = container.value.scrollLeft

    emit('clearDirection')
}

watch(() => props.scrollDirection, newVal => scrollY(newVal))
</script>