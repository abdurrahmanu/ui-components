<template>
    <div ref="element" class="line-break">    
        {{ content }}
        <!-- <span v-for="(a, index) in content" :key="index">{{ a }}</span> -->
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'

const content = ref('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus illo odit omnis maxime inventore facilis cumque quam? Quos, ducimus? Molestiae modi ullam quos repellat odit a atque. Perferendis doloremque magni dolorum assumenda quasi! Sequi ut tempore obcaecati, placeat amet beatae')
const lines = ref([])
const element = ref(null)
const lineBreaks = ref(null)
const lineCharacters = ref([])
const range = ref(document.createRange())

onMounted(() => {
    callLineBreakFunction()
})

watchEffect(() => {
    if (element.value) {
        const lines = ref('')
        console.log(element.value.textContent);

        lines.value = element.value.textContent.split('\n')
        console.log(lines.value);
    }
})

function callLineBreakFunction() {
    lines.value = []
    lineBreaks.value = null
    lineCharacters.value = []

    if (element.value instanceof HTMLElement) {
        const currIndex = ref(0)
        for (let index = 0; index < element.value.innerText.length; index++) {
            
            range.value.setStart(element.value.firstChild, 0)
            range.value.setEnd(element.value.firstChild, (index + 1))
            let lineIndex = (range.value.getClientRects().length - 1)
            
            if (!lines.value[lineIndex]) lines.value.push(lineCharacters.value = [])
            if (currIndex.value !== lineIndex) currIndex.value = lineIndex;
            lineCharacters.value.push(element.value.firstChild.textContent.charAt(index))
        }
    }
    lineBreaks.value = element.value.innerText.split('\n')

    for (let index = 0; index < lines.value.length; index++) {
        lines.value[index].push('/n')
    }

    return lines.value.flat().join('')
}


window.addEventListener('resize', event => {
    console.log(callLineBreakFunction())
})

</script>

<style scoped>
.line-break {
    @apply w-[70%] m-auto bg-sky-200 rounded-md mt-4 p-2 font-mono text-xs leading-[24px]
}
</style>