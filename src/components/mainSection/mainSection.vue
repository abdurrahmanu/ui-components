<template>
    <div class="pt-10 m-auto ">
        <h1 class="w-full p-3 text-2xl text-center uppercase">{{ activeComponent }}</h1>
        <!-- <component :is="ResponsiveText"></component>     -->
    </div>
</template>

<script setup>
import {ref, watchEffect} from 'vue'
import {globalStore} from '../../store/global.js'
import {storeToRefs} from 'pinia'
import {useRoute, useRouter} from 'vue-router'

const store = globalStore()
const {activeComponent} = storeToRefs(store)

const router = useRouter()
const route = useRoute()
const props = defineProps({
    
})

watchEffect(() => {
    if (activeComponent === 'Responsive Text') {
        router.push({name: ''})
    }

    if (activeComponent === 'Count Down') {
        
    }

    if (activeComponent === 'Drop Down') {
        
    }

    if (activeComponent === 'Pagination') {
        router.push({name: 'pagination'})
    }

    if (activeComponent === 'Detect Line Breaks') {
        
    }

    if (activeComponent === 'Animated List') {
        
    }

    if (activeComponent === 'Tooltip') {
        
    }

    if (activeComponent === 'Toast') {
        
    }

    if (activeComponent === 'Calendar') {
        
    }

    if (activeComponent === 'Nav Bar') {
        
    }

    if (activeComponent === 'Sice Bar') {
        
    }
})
</script>