<!-- 
    ***********REUSABLE DROPDOWN COMPONENT***************

    This dropdown accepts two optional props (options, defaultOpt) and emits (value)
    ..........................................
    PROP 1.
    {options : Array} - This prop is optional.

    <Dropdown options="['option 1', 'option 2']"
    ......................................
    ......................................
    PROP 2.
    {defaultOpt: String} - This prop is optional. If no defaultOpt is included, the defaultOpt will be the first option.

    <Dropdown optionsDefault="option 1" />
    .......................................
    .......................................
    options can be <div>option</div> elements, instead of array

    <Dropdown>
      <div>first option</div>
      <div>second option</div>
    </Dropdown>
    ..........................................
    ..........................................
    EMITTED STATE
    The component emits the selected option state as value as standard for HTML elements

    <Dropdown value="selectedOption = $event" />
    ............................................
    ............................................

    The component utilizes up and down arrow keys for options navigation, enter key to choose options and other features.
-->

<script setup>
import { onMounted, ref, defineProps, watchEffect, watch, defineEmits } from 'vue';

const props = defineProps({
  options: Array,
  defaultOpt: String,
})

const emit = defineEmits(['value'])

const dropdownToggle = ref(true)
const selectedText = ref('')
const optionsRef = ref(null)
const selectionPreview = ref(null)
const selectIndex = ref(0)

onMounted(() => {
  if (props.options || optionsRef.value.children.length) {
    const options = ref(Array.from(optionsRef.value.children))
    dropdownToggle.value = false
  
    // INITIAL OPTION AND OPTION INDEX
    if (props.options) {
      if (props.defaultOpt) {
        selectIndex.value = props.options.indexOf(props.defaultOpt)
      }
    } else {
      selectedText.value = options.value[0].innerText
      options.value[0].classList.add('bg-blue-500')
    }
  
    // RESIZE PREVIEW CONTAINER TO LONGEST OPTION WIDTH
    const { longestOptionWidth } = longestOptionIndexAndWidth(options.value)
    selectionPreview.value.style.width = longestOptionWidth.value + 'px'
  
  
    // SELECT OPTION WITH ARROW UP AND DOWN KEYS
    window.addEventListener('keydown', (event) => {
      selectOptionByArrowKey(event, options.value)
    })
  
    // SELECT OPTION WITH ENTER KEY
    window.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        selectOptionByEnterKey(event, options.value)
      }
    })
  
    //CLOSE DROPDOWN
    window.addEventListener('click', e => {
    if (dropdownToggle.value && e.target !== selectionPreview.value) {
      setTimeout(() => {      
        dropdownToggle.value = false;
      }, 100);
    }
  })
  
    // WATCH OPTION CHANGE
    watch(selectIndex, (newVal, oldVal) => {    
      if (!props.options) {
        options.value.forEach(option => {
          if (option.classList.contains('bg-blue-500')) {
              option.classList.remove('bg-blue-500')
            }
        })
        options.value[newVal].classList.add('bg-blue-500')
      }
    })
  }

})

const longestOptionIndexAndWidth = (options) => {
  const longestOptionLength = ref(0)
  const longestOptionIndex = ref(null)

  options.filter((option, index) => {
    if (option.innerText.length > longestOptionLength.value) {
      longestOptionLength.value = option.innerText.length
      longestOptionIndex.value = index
    }
  })
  
  const longestOptionWidth = ref(options[longestOptionIndex.value].getBoundingClientRect().width)

  return {
    longestOptionWidth,
  }
}

const selectOptionByArrowKey = (event, options) => {
    if (dropdownToggle.value) {
      let length = options.length
      if (event.key == 'ArrowDown') {
        if (selectIndex.value !== length - 1) {
          if (selectIndex.value < length) {
            selectIndex.value++
          }
        } else {
          selectIndex.value = 0
        }
        selectedText.value = options[selectIndex.value].innerText
      }

      if (event.key == 'ArrowUp') {
        if (!(selectIndex.value < 1)) {
          selectIndex.value--
        } else {
          selectIndex.value = options.length - 1
        }
        selectedText.value = options[selectIndex.value].innerText
      }
    }
}

const selectOptionByEnterKey = (event, options) => {
  if (dropdownToggle.value) {
    setTimeout(() => {      
      dropdownToggle.value = false
    }, 100);
  }
}

const selectOptionByClick = (e) => {
  const options = ref(Array.from(optionsRef.value.children))
  selectedText.value = e.target.innerText
  options.value.map((element, index) => {
    if (element.innerText === selectedText.value) selectIndex.value = index
  });
}

const toggleDropdown = () => {
  dropdownToggle.value = !dropdownToggle.value;
};

watchEffect(() => {
  emit('value', selectedText.value)
})
</script>

<template>
    <div class="dropdown">
      <div ref="selectionPreview" class="dropdown-container" @click="toggleDropdown">
        {{ selectedText ? selectedText : defaultOpt ? defaultOpt : options && !defaultOpt ? options[0] : '-' }}
      </div>

      <!-- OPTIONS -->
      <div class="">
          <!-- OPTIONS AS DIVS -->
          <div class="options" v-if="!options">
            <div v-show="dropdownToggle" ref="optionsRef" @click="selectOptionByClick">
              <slot />
            </div>
          </div>

          <!-- OPTIONS IN ARRAY -->
          <div v-else>
            <div class="options" v-show="dropdownToggle" ref="optionsRef"  @click="selectOptionByClick">
              <div 
              class="option" 
              :class="[index === selectIndex ? 'selected-option' : 'not-selected-option']"
              v-for="(option, index) in options">
                {{ option }}
              </div>
            </div>
          </div>

      </div>
    </div>
</template>

<style scoped>
.dropdown {
  @apply w-fit border-x border-gray-200 font-mono relative mt-20 ml-20
}
.dropdown-container {
  @apply bg-gray-600 p-1 w-full text-white text-xs border-2 border-blue-400 box-content
}

.options {
  @apply transition-all duration-500
}

.option {
  @apply border-b border-gray-300 w-full text-sm text-center p-1 hover:bg-blue-300
}

.selected-option {
  @apply bg-blue-500 text-center text-white text-xs
}

.not-selected-option {
  @apply bg-transparent text-xs
}

:slotted(div) {
  @apply hover:bg-blue-200 text-xs p-1 border-b border-gray-200 text-center
}

</style>








