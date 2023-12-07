<template>
    <useSideBarComponent class="bg-red-200 w-52" :toggle="toggle" @false="toggle = false">
        <div>
            <div class="text-center text-xl text-white border-b-4 border-teal-900">
                <div class="w-full py-2 hover:bg-teal-400">HOME</div>
                <div class="w-full py-2 hover:bg-teal-400">ABOUT</div>
                <div class="w-full py-2 hover:bg-teal-400">CONTACT</div>
                <div class="w-full py-2 hover:bg-teal-400">MORE</div>
            </div>
        </div>
    </useSideBarComponent>
    
</template>

<script setup>
import { ref } from 'vue';
import useSideBarComponent from './reusableComponents/useSideBarComponent.vue';

const toggle = ref(false)
</script>