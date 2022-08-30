import { defineStore } from 'pinia'
import { versions } from '@/stores/data'

export const useItems = defineStore({
	id: 'items',
	state: () => ({
		versions: versions,
	}),
	getters: {},
	actions: {
		expandAll(version) {
			let opened = version.children.filter((item) => item.model)
			if (opened.length < version.children.length / 2) {
				version.children.map((item) => (item.model = true))
			} else version.children.map((item) => (item.model = false))
		},
		toggleModel(item) {
			item.model = !item.model
		},
	},
})
