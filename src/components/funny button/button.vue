<template>
    <button ref="buttonElement">SUBMIT</button>
</template>

<script setup>
import { ref, defineProps, watchEffect, watch, onMounted } from 'vue';
// event.srcElement.style.bottom = bottomOffset + 10 + 'px'
// event.srcElement.style.top = topOffset + 10 + 'px'
// let topOffset = event.srcElement.getBoundingClientRect().top
// let bottomOffset = event.srcElement.getBoundingClientRect().bottom

const shift = ref(0)
const leftOffset = ref(0)
const rightOffset = ref(0)
const width = ref(0)
const height = ref(0)
const validate = ref(false)
const initialLeftPosition = ref(0)
const buttonElement = ref(null)
const props = defineProps({
    validate: Boolean,
})

watchEffect(() => {
    validate.value = props.validate
})

watch(validate, (newVal, oldVal) => {
    submit(event)
})

onMounted(() => {
    initialLeftPosition.value = buttonElement.value.getBoundingClientRect().left
    console.log(initialLeftPosition.value);
}) 

const submit = (event) => {
    if (validate.value) {
        return
    } else {
        leftOffset.value = event.srcElement.getBoundingClientRect().left
        rightOffset.value = event.srcElement.getBoundingClientRect().right
        height.value = event.srcElement.getBoundingClientRect().height
        width.value = event.srcElement.getBoundingClientRect().width
        let spacing = 10

        //....RIGHT.....
        if (rightOffset.value - event.x > event.x - leftOffset.value) {   
            shift.value = event.x - leftOffset.value

            if (rightOffset.value + shift.value + spacing <= window.innerWidth) {
                if (event.srcElement.style.left) {
                    let value = +event.srcElement.style.left.slice(0, -2)
                    event.srcElement.style.left = spacing + value + shift.value + 'px';
                }
                else {
                    event.srcElement.style.left = spacing + shift.value + 'px';
                }
            }
        }

        //....LEFT....
        if (event.x - leftOffset.value > rightOffset.value - event.x) {
            shift.value = rightOffset.value - event.x 

            if (leftOffset.value - (shift.value + spacing) > 0) {   
                if (event.srcElement.style.left) {
                    let value = Number(event.srcElement.style.left.slice(0, -2))
                    event.srcElement.style.left = value -  (spacing + shift.value) + 'px';
                }
                else {
                    event.srcElement.style.left = -spacing - shift.value + 'px';
                }
            }
        }

        setTimeout(() => {
            event.srcElement.style.left = initialLeftPosition.value + 'px'
        }, 2000);
    }
}

</script>

<style scoped>
button {
    transition: all;
    transition-duration: 300ms;
}

button {
    @apply bg-teal-500 p-2 rounded-lg w-fit hover:bg-teal-800 relative
    text-center text-white font-bold px-6 absolute
}

</style>