<template>
    <div @mouseover="openTooltip" @mouseleave="closeTooltip" ref="tooltipContainer" class="tooltip-parent">
        <div v-show="toggle" ref="tooltip" class="tooltip">{{ value }}</div>
        <slot />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({ value: String })

const tooltipContainer = ref(null)
const toggle = ref(false)
const tooltip = ref(null)
const left = ref(0)
const right = ref(0)
const top = ref(0)
const bottom = ref(0)
const timeout = ref(null)
const timeout2 = ref(null)

const openTooltip = (event) => {
    let currentElement = event.currentTarget
    left.value = currentElement.getBoundingClientRect().left
    right.value = currentElement.getBoundingClientRect().right
    top.value = currentElement.getBoundingClientRect().top
    bottom.value = currentElement.getBoundingClientRect().bottom

    if (tooltip.value instanceof HTMLElement) {
        if (left.value === 0 && right.value === 0) {
            console.log('object');
            tooltip.value.style.top = bottom.value + 'px'
        } else {
            if (left.value === 0) {
                tooltip.value.style.left = right.value + 'px'
            }

            if (right.value === 0) {
                tooltip.value.style.right = left.value + 'px'
            }
        }
    }

    timeout.value = setTimeout(() => {
        toggle.value = true
    }, 2000);

    timeout2.value = setTimeout(() => {            
        toggle.value = false
    }, 4000);
}

const closeTooltip = () => {
    clearTimeout(timeout.value)
    clearTimeout(timeout2.value)
    toggle.value = false
}

</script>

<style scoped>
.tooltip-parent {
    @apply w-fit h-fit relative
}

.tooltip {
    @apply w-[130px] absolute bottom-[0%] translate-y-[10px] rounded-full px-3 bg-red-300 p-[2px] text-xs z-[99999] text-center
}

/* .tooltip::after {
    content: 'asdf';
    clip-path: polygon(0% 0%, 100% 50%, 100% 100%);
    background: #000;
    width: 15px;
    height: 15px;
    top: 0;
    z-index: 999;
    left: 50%;
    transform: translateX(-50%);
} */


</style>