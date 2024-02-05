<template>
    <div class="col-span-8 md:col-span-6 md:col-start-2 col-start-0">
        <div class="pt-10 max-w-[80%] m-auto">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import {ref, watchEffect} from 'vue'
import {globalStore} from '../store/global.js'
import {storeToRefs} from 'pinia'
import {useRoute, useRouter} from 'vue-router'

const store = globalStore()
const {activeComponent} = storeToRefs(store)

const router = useRouter()
const route = useRoute()

watchEffect(() => {
    if (activeComponent.value === 'Getting Started' ) {
        router.push({name: 'main'})
    }

    if (activeComponent.value === 'Responsive Text') {
        router.push({name: 'modal'})
    }

    if (activeComponent.value === 'Count Down') {
        router.push({name: 'countdown'})
    }

    if (activeComponent.value === 'Drop Down') {
        router.push({name: 'dropdown'})
    }

    if (activeComponent.value === 'Pagination') {
        router.push({name: 'pagination'})
    }

    if (activeComponent.value === 'Detect Line Breaks') {
        router.push({name: 'linebreaks'})
    }

    if (activeComponent.value === 'Animated List') {
        router.push({name: 'animatedlist'})

    }

    if (activeComponent.value === 'Tooltip') {
        router.push({name: 'tooltip'})

    }

    if (activeComponent.value === 'Toast') {
        router.push({name: 'toast'})
    }

    if (activeComponent.value === 'Calendar') {
        router.push({name: 'calendar'})
    }

    if (activeComponent.value === 'Nav Bar') {
        router.push({name: 'navbar'})
    }

    if (activeComponent.value === 'Side Bar') {
        router.push({name: 'sidebar'})
    }
})
</script>