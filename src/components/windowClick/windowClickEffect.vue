<template>
    <div ref="effectElement"  class="style bg-pink-400"></div>
</template>

<script setup>
import { onMounted, ref, defineProps, computed } from 'vue';

const color = ref('');
const effectElement = ref(null)
const colorShades = ['100', '200', '300', '400', '500', '600', '700', '800', '900']
const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'gray', 'zinc', 'neutral', 'brown', 'yellow', 'slate', 'stone', 'orange', 'amber', 'lime', 'emerald', 'cyan', 'sky', 'indigo', 'violet', 'purple', 'fuchsia', 'rose']

const props = defineProps({
    target: String,
    noException: Boolean,
});

onMounted(() => {
    const ID = ref('')
    const elementConnectedToEffect = ref(false)
    const intervalID = ref(null)
    document.body.style.height = '100vh';
    
    if (props.target) {
        ID.value = props.target.slice(8)
        elementConnectedToEffect.value = document.body.contains(document.getElementById(ID.value))
        document.getElementById(ID.value).dataset.effect = props.target
    }

    window.addEventListener('click', event => {
        clearInterval(intervalID.value);
        let newColor = `bg-${colors[Math.floor(Math.random() * colors.length)]}-${colorShades[Math.floor(Math.random() * colorShades.length)]}`

        if (props.target && event.srcElement.id) {
            if (`#effect-${event.srcElement.id}` === props.target) {
                document.getElementById(`${event.srcElement.id}`).appendChild(effectElement.value)
                effectElement.value.style.top = event.clientY + 'px'
                effectElement.value.style.left = event.clientX + 'px'
                effectElement.value.style.transform = 'translate(-50%, -50%)'

                //FALLBACK
                effectElement.value.style.WebkitTransform = 'translate(-50%, -50%)'
                effectElement.value.style.msTransform = 'translate(-50%, -50%)'
                //...

                effectElement.value.classList.remove('hidden')
                intervalID.value = setTimeout(() => {
                    effectElement.value.classList.add('hidden')
                }, 3000);
            }
        }

        if (!props.target) {
            if (event.srcElement === document.body || (document.body.contains(event.srcElement))) {
                if (!props.noException) {
                    if (event.srcElement.dataset.effect) return
                }

                document.body.appendChild(effectElement.value)
                effectElement.value.style.top = event.clientY + 'px'
                effectElement.value.style.left = event.clientX + 'px'
                effectElement.value.style.transform = 'translate(-50%, -50%)'

                //FALLBACK
                effectElement.value.style.WebkitTransform = 'translate(-50%, -50%)'
                effectElement.value.style.msTransform = 'translate(-50%, -50%)'
                //....

                effectElement.value.classList.remove('hidden')
                color.value = newColor
                intervalID.value = setTimeout(() => {
                    effectElement.value.classList.add('hidden')
                }, 3000);
            }
        }
    })
})

</script>

<style scoped>
.style {
    @apply w-[10px] rounded-full absolute hidden h-[10px]
}
</style>