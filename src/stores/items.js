import { defineStore } from 'pinia'

export const useItems = defineStore({
	id: 'items',
	state: () => ({
		versions: [],
	}),
	getters: {},
	actions: {
		setVersions(payload) {
			this.versions = payload
		},
		expandBlock(version) {
			console.log(version)
			let opened = version.children.filter((item) => item.model)
			if (opened.length < version.children.length / 2) {
				version.children.map((item) => (item.model = true))
			} else version.children.map((item) => (item.model = false))
		},
		toggleModel(item) {
			item.model = !item.model
		},
		expandAll() {
			this.versions = this.versions.map((item) => {
				return {
					id: item.id,
					ver: item.ver,
					children: item.children?.map((el) => {
						return {
							id: el.id,
							label: el.label,
							icon: el.icon,
							model: true,
							children: el.children,
						}
					}),
				}
			})
		},
	},
})
