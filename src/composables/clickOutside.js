import { ref, onMounted, watchEffect } from "vue";

export function clickOutside(target, el) {
    const isOutside = ref(false)
    
    if (el !== target) {
        isOutside.value = true
    }

    return { isOutside }
}