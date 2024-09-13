<template>
    <code class="text-red-400"></code>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { code } from '../composables/code';


let tabs = code().search(/\n/)
</script>
