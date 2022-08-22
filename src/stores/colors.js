import { defineStore } from 'pinia'

export const useColor = defineStore({
	id: 'color',
	state: () => ({
		toolbar: false,
		panel: false,
		reveal: false,
		mini: false,
	}),
	getters: {},
	actions: {},
})
