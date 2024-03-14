<script setup lang="ts">
import { ref, computed } from 'vue'
import Version from '@/components/Version.vue'
import { onBeforeMount } from 'vue'
import { useItems } from '@/stores/items'
// import { dumb } from '@/stores/dumb'

const myitems = useItems()
const mylimit = ref(10)
const myoffset = ref(0)
const showButton = ref(false)

const empty = ref(false)
const err = ref(false)
const loading = ref(true)

// this block for local testing *************************

// const host = 'https://help.docsvision.com'
// const apiUrl = computed(() => {
// 	return (
// 		// 'https://help.docsvision.com/api/changelog/tree/webclient/5.5.17?offset=' +
// 		'https://help.docsvision.com/api/changelog/tree/documentmgmt/5.5.4?offset=' +
// 		myoffset.value +
// 		'&limit=' +
// 		mylimit.value
// 	)
// })

// end local testing *************************************

const host = window.location.protocol + '//' + window.location.hostname
const apiUrl = computed(() => {
	return (
		host +
		'/api/changelog/tree/' +
		component +
		'/' +
		version?.attributes.getNamedItem('content')?.textContent +
		'?offset=' +
		myoffset.value +
		'&limit=' +
		mylimit.value
	)
})

const component = document
	.querySelector('meta[name="page-component"]')
	?.attributes.getNamedItem('content')?.textContent

const version = document.querySelector('meta[name="page-version"]')

let data1 = [] as Myversion[]

const getData = () => {
	loading.value = true
	fetch(apiUrl.value)
		.then(async (response) => {
			const data = await response.json()

			if (!response.ok) {
				const error = (data && data.message) || response.statusText
				return Promise.reject(error)
			}

			data.forEach((item: Version) => {
				let temp = {} as Myversion
				temp.id = item.id
				temp.fileVersion = item.fileVersion
				temp.metadata = {} as Metadata
				Object.assign(temp.metadata, item.metadata)
				temp.children = [
					{
						id: 0,
						head: 'Функциональные изменения',
						icon: 'briefcase-outline',
						model: false,
						type: 3,
						children: [],
					},
					{
						id: 1,
						head: 'Изменения в библиотеках элементов управления',
						icon: 'code-json',
						model: false,
						type: 4,
						children: [],
					},
					{
						id: 2,
						head: 'Оптимизации',
						icon: 'rocket-launch',
						model: false,
						type: 2,
						children: [],
					},
					{
						id: 3,
						head: 'Исправленные ошибки',
						icon: 'alert',
						model: false,
						type: 1,
						children: [] as Err[],
					},
					{
						id: 4,
						head: 'Изменения в API',
						icon: 'api',
						model: false,
						type: 5,
						children: [],
					},
				]
				item.changes.forEach((change) => {
					if (change.type == 3) {
						temp.children[0].children.push(change)
					}
					if (change.type == 4) {
						temp.children[1].children.push(change)
					}
					if (change.type == 2) {
						temp.children[2].children.push(change)
					}
					if (change.type == 1) {
						temp.children[3].children.push(change)
					}
					if (change.type == 5) {
						temp.children[4].children.push(change)
					}
				})

				data1.push(temp)
				data1[0].children.forEach((item) => {
					item.model = true
				})
			})
			if (data1.length === 0) {
				empty.value = true
			}
			// console.log(data1)
			myitems.setVersions([...data1])
			loading.value = false
			showButton.value = true

			if (data.length < mylimit.value) {
				showButton.value = false
			}
		})
		.catch((error) => {
			console.error('Ошибка получения данных с сервера', error)
			err.value = true
		})
}

onBeforeMount(() => getData())
// onBeforeMount(() => {
// 	myitems.setVersions([...dumb])
// 	loading.value = false
// 	showButton.value = true
// 	console.log(dumb)
// })

const more = () => {
	myoffset.value += 10
	getData()
}
</script>

<template lang="pug">

template(v-if="err")
	.zag Список накопительных изменений
	.empty Не удалось получить данные
template(v-if="empty")
	.zag Список накопительных изменений
	.empty.green Изменений не было.
template(v-if="!empty && !err")
	component(:is="Version" :loading="loading")
	q-btn(v-if="showButton && !myitems.filterActive" label="Загрузить ещё" color="accent" @click="more").more
</template>

<style scoped lang="scss">
.loading {
	position: fixed;
	height: 100vh;
	width: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
.empty {
	margin-left: 2rem;
	margin-right: 2rem;
	margin-top: 3rem;
	border: 1px solid pink;
	background: $pink-1;
	font-size: 1rem;
	padding: 1rem;
	&.green {
		border-color: darkgreen;
		background: #e4e9ba;
	}
}
.zag {
	padding: 2rem 0 0;
	font-size: 2.25rem;
	margin-left: 2rem;
}
.more {
	margin-left: 2rem;
	margin-bottom: 1rem;
}
</style>
