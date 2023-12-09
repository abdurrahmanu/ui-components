<template>
    <div ref="effectElement" class="style transition-all duration-100"></div>
</template>

<script setup>
import { onMounted, defineEmits, ref, effect } from 'vue';
import { colorShades } from '../../composables/safelistColors'

const emit = defineEmits(['targetClicked'])
const effectElement = ref(null)
const props = defineProps({
    target: String,
    noException: Boolean,
    time: Number,
    direction: String,
    index: Number,
});

onMounted(() => {
    const intervalID = ref(null)
    document.body.style.height = '100vh';
    effectElement.value.style.display = 'hidden'

    window.addEventListener('click', event => {
        clearInterval(intervalID.value);

        if (props.target && event.srcElement.id) {
            if (`effect-${event.srcElement.id}` === props.target && effectElement.value instanceof HTMLElement) {

                emit('targetClicked')
                document.getElementById(`${event.srcElement.id}`).appendChild(effectElement.value.parentElement)
                effectElement.value.style.background = colorShades[Math.floor(Math.random() * colorShades.length)]
                effectElement.value.style.top = event.clientY + 'px'
                effectElement.value.style.left = event.clientX + 'px'
                effectElement.value.style.right = event.clientX + 'px'
                effectElement.value.style.bottom = event.clientY + 'px'
                effectElement.value.style.transform = 'translate(-50%, -50%)'

                //FALLBACK
                effectElement.value.style.WebkitTransform = 'translate(-50%, -50%)'
                effectElement.value.style.msTransform = 'translate(-50%, -50%)'
                //...

                moveEffect(effectElement.value)
                effectElement.value.classList.remove('hidden')
                intervalID.value = setTimeout(() => {
                    effectElement.value.classList.add('hidden')
                }, 500);
            }
        }

        if (!props.target) {
            if (event.srcElement === document.body || (document.body.contains(event.srcElement)) && effectElement.value instanceof HTMLElement) {

                //If there are exceptions
                if (!props.noException) {
                    if (event.srcElement.dataset.noeffect) return
                }

                document.body.appendChild(effectElement.value.parentElement)
                effectElement.value.style.background = 'blue'
                effectElement.value.style.top = event.clientY + 'px'
                effectElement.value.style.left = event.clientX + 'px'
                effectElement.value.style.right = event.clientX + 'px'
                effectElement.value.style.bottom = event.clientY + 'px'
                effectElement.value.style.transform = 'translate(-50%, -50%)'

                //FALLBACK
                effectElement.value.style.WebkitTransform = 'translate(-50%, -50%)'
                effectElement.value.style.msTransform = 'translate(-50%, -50%)'
                //....

                effectElement.value.classList.remove('hidden')
                intervalID.value = setTimeout(() => {
                    effectElement.value.classList.add('hidden')
                }, 2000);
            }
        }
    })
})

const moveEffect = (effectElement) => {
    if (props.direction === 'top') {
        let top = effectElement.style.top.slice(0, effectElement.style.top.length - 2)
        effectElement.style.top = +top - 35 + 'px'
    }


    else if (props.direction === 'left') {
        let left = effectElement.style.left.slice(0, effectElement.style.left.length - 2)
        effectElement.style.left = +left + 35 + 'px'
    }


    else if (props.direction === 'right') {
        let right = effectElement.style.right.slice(0, effectElement.style.right.length - 2)
        effectElement.style.right = +right + 35 + 'px'
    }


    else if (props.direction === 'bottom') {
        let bottom = effectElement.style.bottom.slice(0, effectElement.style.bottom.length - 2)
        effectElement.style.bottom = +bottom + 35 + 'px'
    }

    // if (props.direction === 'top-left') {
    // }

    // if (props.direction === 'top-right') {
    // }

    // if (props.direction === 'bottom-right') {
    // }

    // if (props.direction === 'bottom-left') {
    // }

    // if (props.direction === 't-top-left') {
    // }

    // if (props.direction === 't-top-right') {
    // }

    // if (props.direction === 'b-bottom-right') {
    // }

    // if (props.direction === 'b-bottom-left') {
    // }
}

</script>

<style scoped>
.style {
    @apply w-[10px] rounded-full absolute h-[10px]
}

</style>