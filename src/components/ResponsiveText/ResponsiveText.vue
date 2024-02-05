<template>
    <div ref="textContainer" class="bg-blue-300 rounded-md w-fit">
        <slot />
    </div>
</template>

<script setup>
import {ref, onMounted, watch, watchEffect} from 'vue'

const textSize = ref('')
const initialFontSize = ref()
const textContainer = ref(null)
const addWidthSize = ref(false)
const addHeightSize = ref(false)
const reduceWidthSize = ref(false)
const reduceHeightSize = ref(false)
const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

const props = defineProps({
    maxWidth: {
        type: Number,
        default: 1400
    },
    maxHeight: {
        type: Number,
        default: 850
    },
    minWidth: {
        type: Number,
        default: 300
    },
    minFont: {
        type: Number,
        default: 10
    },
    maxFont: {
        type: Number,
        default: 26,
    },
    minHeight: {
        type: Number,
        default: 200
    },
    el: {
        type: String,
        default: 'div'
    }
})

onMounted(() => {
    const cssObject = window.getComputedStyle(textContainer.value)
    textSize.value = cssObject.getPropertyValue('font-size')
    
    const totalFontIncrement = props.maxFont - props.minFont
    const fontSizer = totalFontIncrement / windowWidth.value
    
    initialFontSize.value = textSize.value
})

function autoResizeFont () {
    if (windowWidth.value > props.minWidth) {        
        const { fontSizeIncrement } = fontSizeCalculator()
        const cssObject = window.getComputedStyle(textContainer.value)
        textSize.value = cssObject.getPropertyValue('font-size')
        
        if (addWidthSize.value || reduceWidthSize.value)  {
            textContainer.value.style.fontSize = (+initialFontSize.value.slice(0, -2) + fontSizeIncrement.value) + 'px'
        }
    }
    
    // if (addHeightSize.value || reduceHeightSize.value)  {
    //     textContainer.value.style.fontSize = (+initialFontSize.value.slice(0, -2) + additionalSize.value) + 'px'
    // }
}

function fontSizeCalculator () {
    const fontSizeIncrement = ref(0)
    
    // TOTAL INCREMENTS
    const difBetweenMinandMaxWidth = props.maxWidth - props.minWidth
    const difBetweenMinandMaxHeight = props.maxHeight - props.minHeight
    const totalFontIncrement = props.maxFont - props.minFont

    // FONT INCREMENT PER PIXEL INCREMENT - WIDTH
    const fontIncrementWithRespectToWidth = totalFontIncrement / difBetweenMinandMaxWidth
    
    // FONT INCREMENT PER PIXEL INCREMENT - HEIGHT
    const fontIncrementWithRespectToHeight = totalFontIncrement / difBetweenMinandMaxHeight
    
    const totalWidthIncrement = windowWidth.value - props.minWidth
    const totalHeightIncrement = windowHeight.value - props.minWidth

    if (addWidthSize.value || reduceWidthSize.value ) {
        fontSizeIncrement.value = fontIncrementWithRespectToWidth * totalWidthIncrement
    }
    
    if (addHeightSize.value || reduceHeightSize.value) {
        fontSizeIncrement.value = fontIncrementWithRespectToHeight * totalHeightIncrement
    }
    
    fontSizeIncrement.value = +fontSizeIncrement.value.toFixed(2)
    
    return {fontSizeIncrement} 
}

//WINDOW RESIZE
window.addEventListener('resize', () => {
    windowHeight.value = window.innerHeight
    windowWidth.value = window.innerWidth
})

// WATCH WIDTH RESIZE.....IF REDUCING OR INCREASING
watch(windowWidth, (newVal, oldVal) => {
    if (newVal > oldVal) {
        addWidthSize.value = true
        autoResizeFont()
        reduceWidthSize.value = false
    }

    if (oldVal > newVal) {
        reduceWidthSize.value = true
        autoResizeFont()
        addWidthSize.value = false
    }
})

// WATCH HEIGHT RESIZE.....IF REDUCING OR INCREASING
watch(windowHeight, (newVal, oldVal) => {
    if (newVal > oldVal) {
        addHeightSize.value = true
        reduceHeightSize.value = false
        autoResizeFont()
    }

    if (oldVal > newVal) {
        reduceHeightSize.value = true
        addHeightSize.value = false
        autoResizeFont()
    }
})

// watchEffect(() => {
//     if (windowWidth.value === 500) {
//         console.log(window.innerWidth, textSize.value);
//     }
// })
</script>




