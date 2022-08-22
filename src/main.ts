import { createApp } from 'vue'
import { Quasar, Notify, LocalStorage } from 'quasar'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/mdi-v6/mdi-v6.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
// import '@/assets/styles/theme.scss'
import { router } from '@/router/router'
import 'virtual:svg-icons-register'
import VueClickAway from 'vue3-click-away'
import { createPinia } from 'pinia'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(Quasar, {
	plugins: {
		Notify,
		LocalStorage,
	}, // import Quasar plugins and add here
	config: {
		notify: {
			// type: 'warning',
			position: 'bottom-right',
			timeout: 3000,
			icon: 'mdi-alert',
			color: 'primary',
			classes: 'notific',
		},
	},
	supportTS: {
		tsCheckerConfig: {
			eslint: {
				enabled: true,
				files: './src/**/*.{ts,tsx,js,jsx,vue}',
			},
		},
	},
})
app.use(router)
app.use(VueClickAway)
app.use(pinia)
app.mount('#app')
