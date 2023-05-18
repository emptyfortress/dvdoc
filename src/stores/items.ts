import { defineStore } from 'pinia'

export const useItems = defineStore({
	id: 'items',
	state: () => ({
		versions: [] as Myversion[],
		filterActive: false,
	}),
	getters: {},
	actions: {
		setVersions(payload: Myversion[]) {
			this.versions = payload
		},
		expandBlock(version: Myversion) {
			let opened = version.children.filter((item) => item.model)
			if (opened.length < version.children.length / 2) {
				version.children.map((item) => (item.model = true))
			} else version.children.map((item) => (item.model = false))
		},
		toggleModel(item: Children) {
			item.model = !item.model
		},
		toggleMore(item: any) {
			item.show = !item.show
		},
		expandAll() {
			this.versions = this.versions.map((item) => {
				return {
					id: item.id,
					fileVersion: item.fileVersion,
					metadata: item.metadata,
					children: item.children?.map((el) => {
						return {
							id: el.id,
							head: el.head,
							icon: el.icon,
							model: true,
							type: el.type,
							children: el.children,
						}
					}),
				}
			})
		},
		toggleAll() {
			this.versions = this.versions.map((item) => {
				return {
					id: item.id,
					fileVersion: item.fileVersion,
					metadata: item.metadata,
					children: item.children?.map((el) => {
						return {
							id: el.id,
							head: el.head,
							icon: el.icon,
							model: !el.model,
							type: el.type,
							children: el.children,
						}
					}),
				}
			})
		},
	},
})
