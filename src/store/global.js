import {ref} from 'vue'
import {defineStore} from 'pinia'
import ResponsiveText from '../components/ResponsiveText/ResponsiveText.vue';
import countdown from '../components/countdown/countdown.vue';
import dropdown from '../components/dropdown/DropDown.vue';
import pagination from '../components/pagination/pagination.vue';
import detectLineBreaks from '../components/detectLineBreaks/lineBreak.vue';
import animatedList from '../components/animatedList/animatedList.vue';
import tooltip from '../components/tooltip/tooltip.vue';
import toast from '../components/toast/toast.vue'
import calendar from '../components/calendar/Calendar.vue';
import navBar from '../components/navBar.vue'
import sidebar from '../components/sidebar/sidebar.vue'

export const globalStore = defineStore('globalStore', () => {
    const activeComponent = ref('Getting Started')
    const toggleModal = ref(false)

    const components = [
        ResponsiveText, 
        countdown,
        dropdown,
        pagination,
        detectLineBreaks,
        animatedList,
        tooltip,
        toast,
        calendar,
        navBar,
        sidebar
    ]

    const componentsString = [
        'Getting Started',
        'Responsive Text', 
        'Count Down',
        'Drop Down',
        'Pagination',
        'Detect Line Breaks',
        'Animated List',
        'Tooltip',
        'Toast',
        'Calendar',
        'Nav Bar',
        'Side Bar'
    ]

    return {
        components,
        componentsString,
        activeComponent,
        toggleModal,
    }
})