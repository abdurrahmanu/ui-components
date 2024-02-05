<script setup>
import { ref, onBeforeMount } from 'vue';
import AdSection from '../components/AdSection.vue'
import sidebar from '../components/sidebar.vue'
import MainView from './MainView.vue'
import {useBgMode} from '../store/bgMode.js'
import {globalStore} from '../store/global.js'
import {storeToRefs} from 'pinia'

const bgMode = useBgMode()
const {bg} = storeToRefs(bgMode)
const {checkLocalStorageForSavedBackground} = bgMode

const store = globalStore()
const {componentsString} = store
const {activeComponent} = storeToRefs(store)

onBeforeMount(() => {
    checkLocalStorageForSavedBackground()
})
</script>

<template>
        <div :class="bg" class=" text-white bg-zinc-800 pt-[50px] min-h-screen max-w-[1000px] m-auto">
            <div class="grid grid-cols-8">
                <sidebar class="hidden min-h-[100%] md:block">
                    <div class="max-w-[170px] transition duration-100 w-fit">                            
                        <div 
                        class="p-3 px-5 text-[10px] text-white hover:bg-zinc-900 hover:text-zinc-100"
                        @click="activeComponent = component" 
                        v-for="(component, index) in componentsString">{{ component }}</div>
                    </div>
                </sidebar>
                <MainView />                
                <AdSection />
            </div>
        </div>
</template>