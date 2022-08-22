import { defineStore } from 'pinia'
import { uid } from 'quasar'
import { deleteNodeFromTree, insertNodeIntoTree, getNodeFromTree } from '@/utils/utils'

export const useInfo = defineStore({
	id: 'info',
	state: () => ({
		selected: '4',
		confirmMode: false,
		editCode: false,
		morf: null,
		nodes: [
			{
				id: '0',
				label: 'Справочники кодов полномочий',
				header: 'root',
				typ: 0,
				children: [
					{
						id: '1',
						icon: 'node-folder',
						label: 'ФНС (федеральная налоговая служба)',
						typ: 1,
						children: [
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_11 отклонение представляет собой',
							},
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_12 вектор угловой скорости' },
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_13 явно видно по фазовой траектории',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_14 время набора максимальной скорости',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_15 согласно третьему закону Ньютона',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_16 преобразует периодический уход гироскопа',
							},
							{
								id: uid(),
								icon: 'keychain',
								typ: 2,
								label: 'CPDV_17 при малых значениях коэффициента податливости',
							},
							{ id: uid(), icon: 'keychain', label: 'CPDV_18 с постоянным ускорением' },
							{
								id: uid(),
								icon: 'keychain',
								typ: 2,
								label: 'CPDV_19 позволяет исключить из рассмотрения',
							},
						],
					},
					{
						id: '2',
						icon: 'node-folder',
						label: 'ФК (федеральное казначейство)',
						typ: 1,
						children: [
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_11 отклонение представляет собой',
							},
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_12 вектор угловой скорости' },
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_13 явно видно по фазовой траектории',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_14 время набора максимальной скорости',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_15 согласно третьему закону Ньютона',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_16 преобразует периодический уход гироскопа',
							},
							{
								id: uid(),
								icon: 'keychain',
								typ: 2,
								label: 'CPDV_17 при малых значениях коэффициента податливости',
							},
							{ id: uid(), icon: 'keychain', label: 'CPDV_18 с постоянным ускорением' },
							{
								id: uid(),
								icon: 'keychain',
								typ: 2,
								label: 'CPDV_19 позволяет исключить из рассмотрения',
							},
						],
					},
					{
						id: '3',
						icon: 'node-folder',
						label: 'МинЦифры (министерство цифрового развития)',
						typ: 1,
						children: [
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_11 отклонение представляет собой',
							},
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_12 вектор угловой скорости' },
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_13 явно видно по фазовой траектории',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_14 время набора максимальной скорости',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_15 согласно третьему закону Ньютона',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_16 преобразует периодический уход гироскопа',
							},
							{
								id: uid(),
								icon: 'keychain',
								typ: 2,
								label: 'CPDV_17 при малых значениях коэффициента податливости',
							},
							{ id: uid(), icon: 'keychain', label: 'CPDV_18 с постоянным ускорением' },
							{
								id: uid(),
								icon: 'keychain',
								typ: 2,
								label: 'CPDV_19 позволяет исключить из рассмотрения',
							},
						],
					},
					{
						id: '4',
						icon: 'node-folder',
						label: 'ООО "ДоксВижн"',
						typ: 1,
						children: [
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_1 договоры до 50 т. руб.',
								code: 'CPDV_1',
								name: 'Подписание договоров до 50 т. руб',
								descr: 'Подписание и отправка договоров до 50 т. руб',
								doveritel: 'ООО "ДоксВижн"',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_2 договоры до 100 т. руб.',
								code: 'CPDV_2',
								name: 'Подписание договоров до 100 т. руб',
								descr: 'Подписание и отправка договоров до 100 т. руб',
								doveritel: 'ООО "ДоксВижн"',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_3 договоры от 500 т. руб.',
								code: 'CPDV_3',
								name: 'Подписание и отправка договоров от 500 т. руб',
								descr: 'Подписание договоров от 500 т. руб',
								doveritel: 'ООО "ДоксВижн"',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_4 договоры от 1 млн. руб.',
								code: 'CPDV_4',
								name: 'Подписание договоров от 1 млн. руб',
								descr: 'Подписание и отправка договоров от 1 млн. руб',
								doveritel: 'ООО "ДоксВижн"',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_5 договоры с зарубежными партнерами',
								code: 'CPDV_5',
								name: 'Подписание договоров с зарубежными партнерами',
								descr: 'Подписание и отправка договоров с зарубежными партнерами',
								doveritel: 'ООО "ДоксВижн"',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_6 приказы по группе компаний',
								code: 'CPDV_6',
								name: 'Приказы по группе компаний',
								descr: 'Подписание и отправка приказов по группе компаний',
								doveritel: 'ООО "ДоксВижн"',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_7 приказы по филиалу',
								code: 'CPDV_7',
								name: 'Приказы по филиалу',
								descr: 'Подписание и отправка приказов по филиалу',
								doveritel: 'ООО "ДоксВижн"',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_8 больничные листы',
								code: 'CPDV_8',
								name: 'Подписание больничных',
								descr: 'Оформление и подписание больничных листов',
								doveritel: 'ООО "ДоксВижн"',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_9 служебные записки',
								code: 'CPDV_9',
								name: 'Служебные записки',
								descr: 'Подписание внутренних служебных записок',
								doveritel: 'ООО "ДоксВижн"',
							},
						],
					},
				],
			},
		],
	}),
	getters: {
		currentItem: (state) => {
			return getNodeFromTree(state.nodes[0], state.selected)
		},
		getMorf: (state) => {
			return state.morf
		},
	},
	actions: {
		addSprav(payload) {
			this.nodes[0].children.push(payload)
		},
		addCode(id, node) {
			insertNodeIntoTree(this.nodes[0], id, node)
		},
		killNode(id) {
			deleteNodeFromTree(this.nodes[0], id)
		},
		setSelected(payload) {
			this.selected = payload
		},
		nodeUpdate(payload) {
			this.currentItem.label = payload
		},
		toggleConfirm() {
			this.confirmMode = !this.confirmMode
		},
		toggleEditCode() {
			this.editCode = !this.editCode
		},
		setEditCode(payload) {
			this.editCode = payload
		},
		setMorf(payload) {
			this.morf = payload
		},
	},
})
