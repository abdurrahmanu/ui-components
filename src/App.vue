<script setup>
import { ref } from 'vue';
import windowClick from './components/windowClick/windowClick.vue';
</script>

<template>
  <windowClick
  target="effect-body" />

  <windowClick
  multi
  target="effect-bbb"
  :number="4" />

  <div id="body" class="bg-red-300 h-[100px]"></div>
  <div id="bbb" class="h-[100px] bg-yellow-400"></div>

</template>

























