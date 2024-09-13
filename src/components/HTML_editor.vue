<template>
    <div @input="updateHTML" contenteditable class="min-w-[300px] w-[90%] ring-[1px] ring-blue-400 rounded-sm p-2 min-h-[300px] max-w-[500px]  relative mt-10 border-none outline-none whitespace-pre-wrap" ref="textElement"></div>

    <div id="container <div></div>">
        <div id="head">
            <div id="right"></div>
            <div id="right"></div>
            <div class="><><><><><>'<>">let us say> like this happens' why will it happen ?</div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { elements } from '../composables/HTMLElements.js';
// const {HTMLElements, HTMLElementsJSON} = elements()

//Make an object with indexes as keys and the tags as values, use this to create the tree

//closest closing tag is your closing tag

const debounceInterval = ref(null)
const debounceTime = ref(0)
const textElement = ref(null)
const HTML = ref('')
const HTMLObject = ref({})
const HTMLTemporaryObject = ref({})
const ElementTags = ref({})

const updateHTML = (event) => {
    debounceTime.value = false
    clearTimeout(debounceInterval.value)
    HTML.value = event.srcElement.innerText
}

watch(HTML, newVal => {
    debounceInterval.value = setTimeout(() => {
        clearTimeout(debounceInterval.value)
        debounceTime.value = true
        for (let index = 0; index < HTML.value.length; index++) {
            if (HTML.value[index] === '>' || HTML.value[index] === '<' || HTML.value[index] === '/' || HTML.value[index] === '"' || HTML.value[index] === "'" || HTML.value[index] === '`') {
                if (!HTMLTemporaryObject.value[HTML.value[index]]) {
                    HTMLTemporaryObject.value[HTML.value[index]] = [index]
                } else {
                    if (!HTMLTemporaryObject.value[HTML.value[index]].includes(index)) HTMLTemporaryObject.value[HTML.value[index]].push(index)
                }
            }
        }
        HTMLObject.value = HTMLTemporaryObject.value
        HTMLTemporaryObject.value = {}
    }, 2000);
})

watch(HTMLObject, newVal => {
    const openTag =  /(<(div)( *?)( [a-z]+(="(.?)+")?(=`(.?)+`)?(='(.?)+')?)*( *?)>)/
     const closeTag = /(<\/(div) *?>)/

    const open = /<div( *)( +[a-zA-Z]+(="()*")?(='()*')?)?>/
    
    // let LT = newVal['<']
    // let GT = newVal['>']
    // let slash = newVal['/']
    // let doubleQuotes = newVal['"']
    // let singleQuote = newVal["'"]
    // let tildeQuote = newVal['`']

    // let doubleQuotesPair = doubleQuotes.filter(quote => {

    // })

    // let usableLT = LT.filter((lt, index) => {

    // })

    // if (!LT || !GT || !slash) {
    //     console.log('Normal text no need to worry about nothing');
    // }

    // else if (LT || GT || slash) {
    //     let suitablePairingCondition = LT.map((lt, index) => {
    //         let LTCurrentAndNextIndex = [lt, LT[index + 1]]
    //         if (LT[index + 1])  return !GT.filter(gt => LTCurrentAndNextIndex[0] < gt && LTCurrentAndNextIndex[1] > gt).length ? false : true
    //         else return !GT.filter(gt => LTCurrentAndNextIndex[0] < gt).length ? false : true
    //     })
        
    //     if (!suitablePairingCondition.filter(condition => condition == false).length) {
    //         let pairs = LT.map((lt, index) => {
    //             let LTCurrentAndNextIndex = [lt, LT[index + 1]]
    //             return [lt, GT.filter(gt => LTCurrentAndNextIndex[0] < gt && ( index === LT.length ? LTCurrentAndNextIndex[1] > gt : true))[0]]
    //         })
    
    //         let evenNumberOfPairs = pairs.length % 2 === 0 ? true : false
    
    //         if (evenNumberOfPairs) {
    //             let openingTagsIndex = pairs.filter(pair => {
    //                 return !slash.includes(pair[0] + 1)
    //             })
    
    //             let openingTags = openingTagsIndex.map(index => {
    //                 return HTML.value.slice(index[0], index[1] + 1)
    //             })
                
    //             let closingTagsIndex = pairs.filter(pair => {
    //                 return slash.includes(pair[0] + 1)
    //             })
    
    //             let closingTags = closingTagsIndex.map(index => {
    //                 return HTML.value.slice(index[0], index[1] + 1)
    //             })
    
    //             let equalNumberOfTags = closingTags.length === openingTags.length
    
    //             if (equalNumberOfTags) {
    //                 let openingTagsClosingIndex = openingTagsIndex.map(arr => arr[1])
    //                 let closingTagsOpeningIndex = closingTagsIndex.map(arr => arr[0])
    //                 const openTag =  /(<(div)( *?)( [a-z]+(="(.?)+")?(=`(.?)+`)?(='(.?)+')?)*( *?)>)/
    //                 const closeTag = /(<\/(div) *?>)/
    
    //                 let validOpenTags = openingTags.map(tag => {
    //                     return openTag.test(tag)
    //                 })
    
    //                 let validClosingTags = closingTags.map(tag => {
    //                     return closeTag.test(tag)
    //                 })
    
    //             }
    //         }
    
    //     }
    // }    

}, {deep: true})

onMounted(() => HTML.value = textElement.value.innerText)
</script>
