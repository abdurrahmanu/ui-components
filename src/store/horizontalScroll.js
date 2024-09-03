import { defineStore } from 'pinia';
import { ref } from 'vue';

export const horizontalScroll = defineStore('scroll', () => {   
    const scrollPercent = ref(0) 

    const horizontalScroll = () => scrollPercent.value = (scrollY / (document.body.scrollHeight - window.innerHeight) ) * 100
    window.addEventListener('scroll', horizontalScroll);

    return {
        scrollPercent,
    }
})