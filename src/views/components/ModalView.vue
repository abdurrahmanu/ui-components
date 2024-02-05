<template>
    <modal :toggle="toggleModal" @close="toggleModal = false" ></modal>
    <button class="p-1 px-6 text-black rounded-full bg-slate-200" @click="toggleModal = !toggleModal">open modal</button>
</template>

<script setup>
import modal from '../../components/modal/modal.vue'
import {ref} from 'vue'

const toggleModal = ref()
</script>

<style scoped>

</style>