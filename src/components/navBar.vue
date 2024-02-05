<template>
    <header class="p-2 bg-zinc-900 flex px-5 h-[50px] justify-between top-0  fixed w-full m-auto max-w-[1000px] left-[50%] translate-x-[-50%]">
        <div class="flex items-center gap-3">
            <modal left @close="toggleModal = false" :toggle="toggleModal">
                <div v-if="toggleLogo"  class="py-3 bg-zinc-900">                        
                    <Logo />
                </div>
                <div class="relative flex flex-col w-full h-screen text-xs text-center text-white transition-all duration-100 bg-zinc-900">          
                    <div 
                    @click="activeComponent = component" 
                    v-for="(component, index) in componentsString" 
                    class="py-6 px-5 text-[10px] text-white hover:bg-green-400 hover:text-black">{{ component }}</div>
                </div>
            </modal>
            
            <img class="w-[30px] h-[30px] md:hidden" @click="toggleModal = !toggleModal" src="../assets/more (2).svg" />
            <Transition name="navLogo" v-if="!toggleLogo">                
                <Logo />
            </Transition>
        </div>

        <div class="relative flex items-center gap-6">
            <div class="relative">      
                <img @blur="activeInput = false" @click="activeInput = true" :class="{'' : activeInput, 'translate-x-[-50%] left-[50%] ': !activeInput}"  class="absolute top-[50%] translate-y-[-50%]  w-[20px] h-[10px]" src="../assets/search.svg" />          
                <input 
                :class="{'w-[200px] h-12 text-black pl-4' : activeInput, 'w-12 h-12' : !activeInput}"
                @click="activeInput = true" 
                @blur="activeInput = false"
                class="pl-10 transition duration-200 rounded-full outline-none tex-base bg-slate-200 placeholder:text-zinc-700" 
                :placeholder="activeInput ? 'search' : ''"
                type="input" 
                v-model="search" />
                
                <!--component-->
                <div v-if="search.length && activeInput" class=" bg-zinc-800 rounded-sm shadow-sm shadow-black w-[200px] h-fit p-1 absolute top-[100%] text-white">
                    <div class="p-1 border-b">one of those</div>
                </div>
            </div>

            <div class="relative w-10 bg-white h-7" @click="chooseBgMode = !chooseBgMode">
                <div class="absolute top-[100%] bg-zinc-800 p-3 right-0 flex flex-col gap-6 rounded-full" v-if="chooseBgMode">
                    <div @click="toggle('blueMode')" class="w-6 h-6 bg-blue-400 border border-white rounded-full"></div>
                    <div @click="toggle('darkMode')" class="w-6 h-6 bg-black border border-white rounded-full"></div>
                    <div @click="toggle('tealMode')" class="w-6 h-6 bg-teal-400 border border-white rounded-full"></div>
                    <div @click="toggle('skyMode')" class="w-6 h-6 border border-white rounded-full bg-sky-400"></div>
                    <div @click="toggle('slateMode')" class="w-6 h-6 border border-white rounded-full bg-slate-400"></div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import modal from './modal/modal.vue'
import Logo from './logo.vue'
import {ref, watchEffect} from 'vue'
import {globalStore} from '../store/global.js'
import {storeToRefs} from 'pinia'

const store = globalStore()
const {componentsString} = store
const {activeComponent, toggleModal} = storeToRefs(store)
const chooseBgMode = ref(false)
const activeInput = ref(false)
const search = ref('')
const toggleLogo = ref(false)

watchEffect(() => {
    if (toggleModal.value) {
        setTimeout(() => {
            toggleLogo.value = true
        }, 10);
    }

    if (!toggleModal.value) {
        setTimeout(() => {
            toggleLogo.value = false
        }, 0);
    }
})

const toggle = (mode) => {
    localStorage.setItem('bg-mode',  mode)
}

watchEffect(() => {
    if (!activeInput.value) {
        search.value = ''
    }
})
</script>







