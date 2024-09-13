import {ref} from 'vue'
import {defineStore} from 'pinia'

export const mainStore = defineStore('mainStore', () => {
    const fileSystem = ref({
        'Reusable Components': {
            '.vscode': {
                'extensions.json': null
            },
            'node_modules': {
                'bin': {},
                'vite': {}
            },  
            'public': {
                'vite.svg': null
            },  
            'src': {
                'assets': {
                    'tailwind.css': null,
                    'home.svg': null,
                    'nav.svg': null
                },
                'components': {
                    'scroller.vue': null,    
                    'toast.vue': null,
                    'header.vue': null,
                    'nav.vue': null,
                    'bullet.vue': null,
                },
                'composables': {
                    'scroller.js': null,    
                    'toast.js': null,
                    'header.js': null,
                },
                'router': {
                    'index.js': null,    
                },
                'views': {
                    'HomeView.vue': null,    
                },
                'stores': {
                    'mainStore.js': null,    
                    'scrollStore.js': null,
                        'Reusable Components': {
            '.vscode': {
                'extensions.json': null
            },
            'node_modules': {
                'bin': {},
                'vite': {}
            },    
            'src': {
                'assets': {
                    'tailwind.css': null,
                    'home.svg': null,
                    'nav.svg': null
                },
                'components': {
                    'scroller.vue': null,    
                    'toast.vue': null,
                    'header.vue': null,
                    'nav.vue': null,
                    'bullet.vue': null,
                },
                'composables': {
                    'scroller.js': null,    
                    'toast.js': null,
                    'header.js': null,
                },
                'router': {
                    'index.js': null,    
                },
                'views': {
                    'HomeView.vue': null,    
                },
                'stores': {
                    'mainStore.js': null,    
                    'scrollStore.js': null,
                },
                'App.vue': null,
                'main.js': null
            },
            '.gitignore': null,    
            'index.html': null,
            'package-lock.json': null,
            'package.json': null,
            'postcss.config.js': null,
            'README.md': null,
            'tailwind.config.js': null,
            'vite.config.js': null,
        }
                },
                'App.vue': null,
                'main.js': null
            },
            '.gitignore': null,    
            'index.html': null,
            'package-lock.json': null,
            'package.json': null,
            'postcss.config.js': null,
            'README.md': null,
            'tailwind.config.js': null,
            'vite.config.js': null,
        }
    })

    return {
        fileSystem,
    }
})