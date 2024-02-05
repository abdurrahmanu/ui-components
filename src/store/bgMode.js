import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useBgMode = defineStore('bgMode', () => {
    const bgMode = ref('auto');
    const allBackgrounds = [
        'darkMode',
        'slateMode',
        'blueMode',
        'greenMode',
        'yellowMode'
    ]

    function checkLocalStorageForSavedBackground() {
        for (let index = 0; index < allBackgrounds.length; index++) {
            if (localStorage.getItem('bg-mode'))  {
                bgMode.value = localStorage.getItem('bg-mode')
                return
            }
            else localStorage.setItem('bg-mode', bgMode.value);
        }
    }

    return {
        bgMode,
        checkLocalStorageForSavedBackground,
    };
});












