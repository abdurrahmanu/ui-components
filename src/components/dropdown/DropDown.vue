<!-- 
   * ***********REUSABLE DROPDOWN COMPONENT***************
    This dropdown accepts two optional props (options, default) and emits selected (value)
    
    *PROP 1 =>  {options : Array[]} - This prop is optional. It is an array, nested HTML Element Children can be used instead of the options prop

    *AS AN  ARRAY ATTRIBUTE
    <Dropdown 
    :options="['option 1', 'option 2']" />

    *AS ELEMENTS
    <Dropdown>
      <div>first option</div>
      <div>second option</div>
    </Dropdown>

    *PROP 2. => {default: String} - This prop is optional. If no default option is included, the default option will be the first option.
    <Dropdown 
    options="['option 1', 'option 2']" /> // Default option here is 'option 1'

    *The default option can be the index of the an option in the options Array[] prop 
    <Dropdown 
    :default="option 2"
    :options="['option 1', 'option 2']" /> // Default option here is 'option 2'

  *The default option can be the exact value of an option in the options Array[] prop
    <Dropdown 
    :default="option 1" 
    options="['option 1', 'option 2']" /> // Default option here is 'option 1'

    *if the options are HTML Elements, the defaultion can only be indexes of the ChildNodes of the Dropdown component
      <Dropdown :default="1">
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
import { onMounted, ref, defineProps, watchEffect, watch, defineEmits, computed } from 'vue';

const emit = defineEmits(['value'])
const props = defineProps({
  options: Array,
  default: String,
})

const optionsRef = ref(null)
const selectionPreview = ref(null)
const dropdownContainer = ref(null)
const dropdownToggle = ref(true)
const selectedText = ref('')
const selectIndex = ref(0)

onMounted(() => {
  if (props.options || optionsRef.value.children.length) {
    const options = ref(Array.from(optionsRef.value.children))
    dropdownToggle.value = false
  
    // INITIAL OPTION AND OPTION INDEX
    if (props.options) {
      if (props.default) {
        if (typeof +props.default === 'number' && !isNaN(+props.default) && !(+props.default > options.value.length)) {
          selectIndex.value = +props.default
          options.value[+props.default].classList.add('bg-blue-500')
          selectedText.value = options.value[+props.default].innerText
        } else {
            for (let index = 0; index < props.options.length; index++) {        
              let option = props.options[index]      
              if (option === props.default) {
                selectIndex.value = index
                options.value[index].classList.add('bg-blue-500')
                selectedText.value = options.value[index].innerText
                break
              }
            }
        }
        if (!selectedText.value) {
          selectIndex.value = 0
          options.value[0].classList.add('bg-blue-500')
          selectedText.value = options.value[0].innerText
        }
      }  else {
        selectIndex.value = 0
        options.value[0].classList.add('bg-blue-500')
        selectedText.value = options.value[0].innerText
      }
    } else {
      options.value.forEach(option => {
        option.classList.add('option')
      })

      if (props.default)  {
        if (typeof +props.default === 'number' && !isNaN(+props.default) && !(+props.default > options.value.length)) {
          selectedText.value = options.value[+props.default].innerText
          options.value[+props.default].classList.add('bg-blue-500')
        } else {
          selectedText.value = options.value[0].innerText
          options.value[0].classList.add('bg-blue-500')
        }
      } else {
        selectedText.value = options.value[0].innerText
        options.value[0].classList.add('bg-blue-500')
      }
    }
  
    // RESIZE PREVIEW CONTAINER TO LONGEST OPTION WIDTH
    const { longestOptionWidth } = longestOptionIndexAndWidth(options.value)
    selectionPreview.value.style.width = longestOptionWidth.value

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

  //CREATE ELEMENT AND STYLE
  const longestOption = options[longestOptionIndex.value]
  const temporaryElement = document.createElement('div')
  temporaryElement.innerText = longestOption.innerText
  temporaryElement.style.width = 'fit-content'
  temporaryElement.style.paddingRight = '4px'
  temporaryElement.style.paddingLeft = '4px'

  // APPEND TO BODY
  document.body.appendChild(temporaryElement)

  // OBTAIN WIDTH
  const cssObject = getComputedStyle(temporaryElement)
  const longestOptionWidth = ref(cssObject.getPropertyValue('width'))

  //DESTROY
  document.body.removeChild(temporaryElement)

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

const selectedOption = computed(() => {
  return selectedText.value ? selectedText.value : props.default ? props.default : props.options && !props.default ? props.options[0] : '-' 
})

watchEffect(() => {
  emit('value', selectedText.value)
})
</script>

<template>
    <div ref="dropdownContainer" class="dropdown-container m-5">
      <div 
      ref="selectionPreview" 
      class="dropdown-preview" 
      @click="toggleDropdown">
        {{ selectedOption }}
      </div>
          <!-- OPTIONS AS ELEMENTS -->
          <div v-if="!options">
              <div 
              class="options"
              ref="optionsRef" 
              v-show="dropdownToggle" 
              @click="selectOptionByClick">
                <slot />
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
</template>

<style scoped>
.dropdown-container {
  @apply rounded-t-md w-fit shadow-sm shadow-sky-600 text-black text-xs relative
}

.dropdown-preview {
  @apply bg-blue-200 p-1 w-fit rounded-t-md text-center
}

.options {
  @apply absolute bg-white left-0 border border-t-0  w-full shadow-sm shadow-blue-800 z-[99999]
}

.option, :slotted(.option) {
  @apply  text-center hover:bg-sky-500 text-xs py-1
}

.selected-option {
  @apply bg-blue-500 text-white
}
</style>








