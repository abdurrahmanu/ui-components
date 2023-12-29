<!-- 
   * ***********REUSABLE DROPDOWN COMPONENT***************
    This dropdown accepts two optional props (options, defaultOpt) and emits selected (value)
    
    *PROP 1 =>  {options : Array[]} - This prop is optional. It is an array, nested HTML Element Children can be used instead of the options prop

    *AS AN  ARRAY ATTRIBUTE
    <Dropdown 
    :options="['option 1', 'option 2']" />

    *AS ELEMENTS
    <Dropdown>
      <div>first option</div>
      <div>second option</div>
    </Dropdown>

    *PROP 2. => {defaultOpt: String} - This prop is optional. If no default option is included, the default option will be the first option.
    <Dropdown 
    options="['option 1', 'option 2']" /> // Default option here is 'option 1'

    *The default option can be the index of the an option in the options Array[] prop 
    <Dropdown 
    :defaultOpt="option 2"
    :options="['option 1', 'option 2']" /> // Default option here is 'option 2'

  *The default option can be the exact value of an option in the options Array[] prop
    <Dropdown 
    :defaultOpt="option 1" 
    options="['option 1', 'option 2']" /> // Default option here is 'option 1'

    *if the options are HTML Elements, the defaultOption can only be indexes of the ChildNodes of the Dropdown component
      <Dropdown :defaultOpt="1">
      <div>first option</div>
      <div>second option</div>
    </Dropdown>

    *EMITTED STATE :  The component emits the selected option state for use outside the component
    <Dropdown value="selectedOption = $event" />

    ............................................................
    *EXTRAS
    The component utilizes up and down arrow keys for options navigating through the options, enter key to choose options.
-->

<script setup>
import { onMounted, ref, defineProps, watchEffect, watch, defineEmits } from 'vue';

const emit = defineEmits(['value'])
const props = defineProps({
  options: Array,
  defaultOpt: String,
})

const optionsRef = ref(null)
const selectionPreview = ref(null)
const dropdownContainer = ref(null)
const dropdownOptions = ref(null)
const dropdownToggle = ref(true)
const selectedText = ref('')
const selectIndex = ref(0)

onMounted(() => {
  if (props.options || optionsRef.value.children.length) {
    const options = ref(Array.from(optionsRef.value.children))

    dropdownToggle.value = false
  
    // INITIAL OPTION AND OPTION INDEX
    if (props.options) {
      if (props.defaultOpt && typeof +props.defaultOpt === 'number' && !(+props.defaultOpt > options.value.length)) {
          selectIndex.value = +props.defaultOpt
          options.value[+props.defaultOpt].classList.add('bg-blue-500')
          selectedText.value = options.value[+props.defaultOpt].innerText
      }  else {
        selectIndex.value = 0
        options.value[0].classList.add('bg-blue-500')
        selectedText.value = options.value[0].innerText
      }
    } else {
      selectedText.value = options.value[0].innerText
      options.value[0].classList.add('bg-blue-500')
    }
  
    // RESIZE PREVIEW CONTAINER TO LONGEST OPTION WIDTH
    const { longestOptionWidth } = longestOptionIndexAndWidth(options.value)
    dropdownOptions.value.style.width = longestOptionWidth.value + 'px'
    

    // SELECT OPTION WITH ARROW UP AND DOWN KEYS
    window.addEventListener('keydown', (event) => {
      selectOptionByArrowKey(event, options.value)
    })
  
    // SELECT OPTION WITH ENTER KEY
    window.addEventListener('keypress', (event) => {
      if (event.key === 'Enter')  selectOptionByEnterKey(event, options.value)
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
  

  let el = options[longestOptionIndex.value]
  el.display = 'hidden'
  document.body.appendChild(el)
  const cssObject = getComputedStyle(el)
  const longestOptionWidth = ref(cssObject.getPropertyValue('width'))
  document.body.removeChild(el)

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
    <div ref="dropdownContainer" class="dropdown-container">
      <div 
      ref="selectionPreview" 
      class="dropdown-preview" 
      @click="toggleDropdown">
        {{ selectedText ? selectedText : defaultOpt ? defaultOpt : options && !defaultOpt ? options[0] : '-' }}
      </div>

      <!-- OPTIONS -->
      <div class="relative" ref="dropdownOptions">
          <!-- OPTIONS AS ELEMENTS -->
          <div v-if="!options">
            <div class="options">
              <div 
              ref="optionsRef" 
              v-show="dropdownToggle" 
              @click="selectOptionByClick">
                <slot />
              </div>
            </div>
          </div>

          <!-- OPTIONS AS ARRAY -->
          <div v-else>
            <div 
            ref="optionsRef" 
            class="options" 
            v-show="dropdownToggle" 
            @click="selectOptionByClick">
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
.dropdown-container {
  @apply border-x border-black border-b-black border rounded-t-md font-mono relative w-fit
}

.dropdown-preview {
  @apply bg-red-600 p-1 w-full text-white text-xs box-content rounded-md rounded-b-none
}

.options {
  @apply transition-all duration-500 absolute left-0 border border-t-0  w-full
}

.option, :slotted(div) {
  @apply border-b  text-center p-1 hover:bg-blue-300 text-xs relative
}

.selected-option {
  @apply bg-blue-500 text-center text-white text-xs
}

.not-selected-option {
  @apply bg-transparent text-xs
}
</style>








