import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const useCalendarStore = defineStore('calendar', () => {
    const toggleCalendar = ref(false)
    const dayIndex = ref(new Date().getDate())
    const weekDayIndex = ref(new Date().getDay())
    const viewYear = ref(new Date().getFullYear())
    const currentMonthIndex = ref(new Date().getMonth())
    const weekDays = ref(['sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat',])

    const monthsObject = ref({
        'January': 31,
        'February': 28,
        'March': 31,
        'April': 30,
        'May': 31,
        'June': 30,
        'July': 31,
        'August': 31,
        'September': 30,
        'October': 31,
        'November': 30,
        'December': 31
    })

    const months = ref([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ])
    
    const formatDateString = (dateString) => {
        dayIndex.value = +dateString.slice(0, 2)
        viewYear.value = +dateString.slice(6)
        currentMonthIndex.value = +dateString.slice(3, 5) 
    }
    
    const switchMonth = (arg) => {
        if (arg === 'next' && currentMonthIndex.value === months.value.length - 1) {
            currentMonthIndex.value = 0
            viewYear.value++
            return
        }
    
        else if (arg === 'prev' && currentMonthIndex.value === 0) {
            currentMonthIndex.value = months.value.length - 1
            viewYear.value--
            return
        }
    
        if (arg === 'prev' && currentMonthIndex.value > 0) {
            currentMonthIndex.value--;
        }
    
        else if (arg === 'next' && currentMonthIndex.value < months.value.length - 1) {
            currentMonthIndex.value++;
        }
    }

    const daysNumber = (month) => {
        return viewYear.value % 4 === 0 && month === 'February' ? 29 : monthsObject.value[month]
    }

    const currentMonth = (monthIndex) => {
        return months.value[monthIndex]
    }
    
    const month = computed(() => {
        return currentMonth(currentMonthIndex.value)
    })

    const numberOfDays = computed(() => {
        return monthsObject.value[month.value]
    })
    
    const firstDay = computed(() => {
        return new Date(viewYear.value, currentMonthIndex.value).getDay()
    })

    const isLeapYear = computed(() => {
        return viewYear.value % 4 === 0
    })

    const toggleCalendarFunction = (date) => {
        toggleCalendar.value = !toggleCalendar.value
        formatDateString(date)
    }

    const tableRows = computed(() => {
        const rows = ref(0)
        const shift = ref(daysNumber(month.value) + firstDay.value)
        rows.value = Math.round(shift.value / 7)

        // Add final line to compensate for the free space in the beginning of the month....if there is any
        if (7 * rows.value < shift.value) rows.value++
    
        return rows.value
    })

    const validateDateInput = (event) => {
        if (event.inputType === 'insertText') {

            if (InputfullDate.value[1] === '/') {
                const dateArr = ref(InputfullDate.value.split(''))
                dateArr.value.unshift(0)
                InputfullDate.value = dateArr.value.join('')
            }

            if (InputFullDate.value[4] === '/') {
                let thirdIndex = InputFullDate.value[3]
                const dateArr = ref(InputFullDate.value.split(''))
                dateArr.value[3] = 0
                dateArr.value[4] = thirdIndex
                InputFullDate.value = dateArr.value.join('')
            }

            if (InputFullDate.value.length === 2) {
                InputFullDate.value += '/';
            }

            if (InputFullDate.value.length === 5) {
                InputFullDate.value += '/'
            }
        }
    }

    const validateDate = () => {
        return dayIndex.value + '/' + currentMonthIndex.value + '/' + viewYear.value
    }

    const validatedDate = computed(() => {
        const month = ref(currentMonthIndex.value + 1)
        const day = ref(dayIndex.value)
        if (month.value < 10) month.value = '0' + month.value
        if (day.value < 10) day.value = '0' + day.value
        return  day.value + '/' + month.value + '/' + viewYear.value
    })

    return {
        months,
        weekDayIndex,
        weekDays,
        monthsObject,
        toggleCalendar,
        tableRows,
        dayIndex,
        month,
        firstDay,
        viewYear,
        numberOfDays,
        currentMonthIndex,
        isLeapYear,
        validatedDate,
        validateDate,
        validateDateInput,
        currentMonth,
        formatDateString,
        switchMonth,
        daysNumber,
        toggleCalendarFunction,
    }
})















