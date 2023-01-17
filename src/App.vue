<script setup lang="ts">
import { ref } from 'vue'
import Version from '@/components/Version.vue'
import { onBeforeMount } from 'vue'
import { useItems } from '@/stores/items'

const myitems = useItems()

// const host = 'https://doc-online-vdv.digdes.com'
// const apiUrl = 'https://doc-online-vdv.digdes.com/api/changelog/tree/webclient/5.5.17'

const host = window.location.protocol + '//' + window.location.hostname
const component = document
	.querySelector('meta[name="page-component"]')
	?.attributes.getNamedItem('content')?.textContent
const version = document
	.querySelector('meta[name="page-version"]')
	?.attributes.getNamedItem('content')?.textContent
const apiUrl = host + '/api/changelog/tree/' + component + '/' + version

onBeforeMount(() => {
	loading.value = true
	fetch(apiUrl)
		.then(async (response) => {
			const data = await response.json()

			if (!response.ok) {
				const error = (data && data.message) || response.statusText
				return Promise.reject(error)
			}

			let data1 = [] as Myversion[]

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
				})

				data1.push(temp)
				data1[0].children.forEach((item) => {
					item.model = true
				})
			})
			if (data1.length === 0) {
				empty.value = true
			}
			myitems.setVersions([...data1])
			loading.value = false
		})
		.catch((error) => {
			console.error('Ошибка получения данных с сервера', error)
			err.value = true
		})
})
const empty = ref(false)
const err = ref(false)
const loading = ref(true)
</script>

<template lang="pug">

template(v-if="err")
	.zag Список накопительных изменений
	.empty Не удалось получить данные
template(v-if="empty")
	.zag Список накопительных изменений
	.empty.green Изменений не было.
component(:is="Version" v-if="!loading && !empty")
</template>

<style scoped lang="scss">
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
</style>
