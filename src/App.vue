<script setup lang="ts">
import Version from '@/components/Version.vue'
import { onBeforeMount } from 'vue'
import { useItems } from '@/stores/items'

const myitems = useItems()

const host = window.location.protocol + '//' + window.location.hostname
const apiUrl = host + '/api/changelog/tree/1'
// const apiUrl = 'https://vzhik.digdes.com/api/changelog/tree/1'

onBeforeMount(() => {
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
				// item.changes.forEach((change) => {
				// 	if (change.type === 'functional') {
				// 		temp.children[0].children.push(change)
				// 	}
				// 	if (change.type === 'lib') {
				// 		temp.children[1].children.push(change)
				// 	}
				// 	if (change.type === 'optimization') {
				// 		temp.children[2].children.push(change)
				// 	}
				// 	if (change.type === 'bugfix') {
				// 		temp.children[3].children.push(change)
				// 	}
				// })

				data1.push(temp)
			})
			myitems.setVersions([...data1])
			// items.value = data1
		})
		.catch((error) => {
			console.error('Ошибка получения данных с сервера', error)
		})
})
</script>

<template lang="pug">
component(:is="Version")
</template>

<style scoped lang="scss"></style>
