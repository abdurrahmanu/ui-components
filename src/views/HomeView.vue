<template>
    <div class="bg-[#232121] min-h-[100lvh] text-slate-300 px-5 py-2">
        <!-- <RecursiveFileSystem 
        :file="file" 
        :key="node"
        :node="node" 
        v-for="(file, node, index) in fileSystem" />

        <Pagination 
        :size="200"
        :buttons="true" 
        :displayLength="3"
        pagePosition="mid" 
        @clear-direction="direction = $event"  
        @has-next="hasNext = $event"
        @has-prev="hasPrev = $event"
        :go="direction" />

        <div class="flex gap-2 py-3 uppercase selection:bg-transparent">
            <p @click="direction = 'prev'" :class="[hasPrev ? '' : 'opacity-40 cursor-not-allowed']" class="px-5 py-1 text-black bg-blue-400 rounded-md">prev</p>
            <p @click="direction = 'next'" :class="[hasNext ? '' : 'opacity-40 cursor-not-allowed']" class="px-5 py-1 text-black bg-blue-400 rounded-md">next</p>
        </div>

        <Code /> -->
        <HTML_editor />
    </div>
</template>

<script setup>
import {ref, onMounted, watch, computed} from 'vue'
import Code from '../components/Code.vue';
import HTML_editor from '../components/HTML_editor.vue';
import Pagination from '../components/Pagination.vue';
import RecursiveFileSystem from '../components/RecursiveFileSystem.vue'
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';
import { elements } from '../composables/HTMLElements.js';

const {HTMLElements, HTMLElementsJSON} = elements()
const hasNext = ref(false)
const hasPrev = ref(false)
const direction = ref('')
const main = mainStore()
const {fileSystem} = storeToRefs(main)
const all = ref('')

HTMLElements.forEach((element, index) => {
    all.value += HTMLElements[index + 1] ? `${element}|` : element
})

// const htmlStr = `
// <div><div><div>
// <div id="container"><div class="home"><div id="curvy-head-thick-line-dark-yellow"></div>
//         <div id="curvy-head-thick-line-light-yellow"></div>
//         <div id="headborder">
//           <div id="head">
//             <div id="lashright"></div>
//             <div id="eyeright"></div>
//             <div id="lashleft"></div>
//             <div id="eyeleft"></div>
//             <div id="nose"></div>
//             <div id="mouth"></div>
//             <div id="toothone"></div>
//             <div id="toothtwo"></div>
//           </div>
//         </div>

//           <div id="hand-one">
//           <div id="palm">           
//             <div id="fingerone"></div>
//             <div id="fingertwo"></div>
//             <div id="fingerthree"></div>
//             <div id="fingerfour"></div>
//           </div>
//           </div>

//           <div id="hand-two">
//           <div id="palm">           
//             <div id="fingerone"></div>
//             <div id="fingertwo"></div>
//             <div id="fingerthree"></div>
//             <div id="fingerfour"></div>
//           </div>
//           </div>
// `

const htmlStr  = `
<div id="container" class="home"><div class="home"> 
`
// const openTag = /(<(div)( *?)( [a-z]+(="(.?)+")?(=`(.?)+`)?(='(.?)+')?)*( *?)>)/

const openTag = /(<(div)( *?)( [a-z]+(="(.*?)+")?)*( *?)>)/
const closeTag = /(<\/(div) *?>)/

// console.log(htmlStr.match(openTag));
// console.log(closeTag.test(close));

const see = /[^"]+/g
console.log(see.exec('asdfasdfasdfasfadfd"asdfasdfsdfa'));
</script>