import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
// import Home from '@/pages/Home.vue'

declare module 'vue-router' {
	interface RouteMeta {
		title: string
		bread: string[]
	}
}

export const router = createRouter({
	history: createWebHashHistory(),

	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: { title: 'Docsvision docs', bread: ['Web-client'] },
		},
		{
			path: '/tree',
			name: 'tree',
			component: () => import('@/components/Tree.vue'),
			meta: { title: 'Docsvision docs', bread: ['Web-client', 'Дерево'] },
		},
		{
			path: '/errors',
			name: 'error',
			component: () => import('@/components/Errors.vue'),
			meta: { title: 'Docsvision docs', bread: ['Web-client', 'Ошибки solo'] },
		},
		{
			path: '/version',
			name: 'version',
			component: () => import('@/components/Version.vue'),
			meta: { title: 'Docsvision docs', bread: ['Web-client', 'Список версий'] },
		},
	],
})

const DEFAULT_TITLE = 'DV Web-Client'
router.beforeEach((to) => {
	document.title = to.meta.title || DEFAULT_TITLE
})
