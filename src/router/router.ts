import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

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
			path: '/version',
			name: 'version',
			component: () => import('@/components/Version.vue'),
			meta: { title: 'Docsvision docs', bread: ['Web-client', 'Release notes'] },
		},
		{
			path: '/test',
			name: 'test',
			component: () => import('@/components/Test.vue'),
			meta: { title: 'Docsvision docs', bread: ['Web-client', 'Release notes'] },
		},
	],
})

const DEFAULT_TITLE = 'DV Web-Client'
router.beforeEach((to) => {
	document.title = to.meta.title || DEFAULT_TITLE
})
