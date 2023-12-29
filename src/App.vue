<script setup>
import { onBeforeMount, onMounted, ref, watchEffect } from 'vue';
import DropDown from './components/dropdown/DropDown.vue'

const value = ref('')
const value2 = ref('')

</script>

<template>
<div class="flex justify-between p-3 bg-yellow-200 relative">
  <div>one</div>
  <DropDown defaultOpt="7" @value="value2 = $event" :options="[1,2,'this','that',6,7,8,'longest option']"/>
  <div>one</div>
</div>

<DropDown>
  <div>asdf</div>
  <div>asdfasfasf</div>
  <div>
    asdfasfasdfas this is not it
  </div>
</DropDown>



    
// const cssObject = window.getComputedStyle(dropdownContainer)
    // const top = cssObject.getPropertyValue('top')
    // dropdownOptions.value.style.top = top + 'px'
</template>

<style>

</style>

























