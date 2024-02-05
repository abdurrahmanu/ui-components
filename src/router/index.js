import { createRouter, createWebHistory } from 'vue-router'
import ModalView from '../views/components/ModalView.vue'
import DropDownView from '../views/components/DropDownView.vue'
import ToastView from '../views/components/ToastView.vue'
import PaginationView from '../views/components/PaginationView.vue'
import CalendarView from '../views/components/CalendarView.vue'
import AnimatedListView from '../views/components/AnimatedListView.vue'
import CountDownView from '../views/components/CountDownView.vue'
import SidebarView from '../views/components/SidebarView.vue'
import TooltipView from '../views/components/TooltipView.vue'
import GettingStartedView from '../views/components/GettingStartedView.vue'
import MainView from '../views/MainView.vue'

const routes = [
    {
        name: 'main',
        path: '/',
        component: MainView,
        children: [
            {
                name: 'getStarted',
                path: '',
                component: GettingStartedView
            },
            {
                name: 'modal',
                path: 'modal',
                component: ModalView
            },    
            {
                name: 'anlmatedList',
                path: '/animatedList',
                component: AnimatedListView
            },    
            {
                name: 'calendar',
                path: '/calendar',
                component: CalendarView
            },    
            {
                name: 'toast',
                path: '/toast',
                component: ToastView
            },    
            {
                name: 'tooltip',
                path: '/tooltip',
                component: TooltipView
            },    
            {
                name: 'sidebar',
                path: '/sidebar',
                component: SidebarView
            },    
            {
                name: 'dropdown',
                path: '/dropdown',
                component: DropDownView
            },
            {
                name: 'pagination',
                path: '/pagination',
                component: PaginationView
            },
            {
                name: 'countdown',
                path: '/countdown',
                component: CountDownView
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router