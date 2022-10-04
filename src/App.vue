<script setup lang="ts">
import Version from '@/components/Version.vue'
import { ref, onBeforeMount } from 'vue'
import { useItems } from '@/stores/items'

const myitems = useItems()

onBeforeMount(() => {
	fetch('https://vzhik.digdes.com/api/changelog/tree/1')
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
						icon: 'alert',
						model: false,
						type: 'functional',
						children: [],
					},
					{
						id: 1,
						head: 'Изменения в библиотеках элементов управления',
						icon: 'alert',
						model: false,
						type: 'lib',
						children: [],
					},
					{
						id: 2,
						head: 'Оптимизации',
						icon: 'alert',
						model: false,
						type: 'optimization',
						children: [],
					},
					{
						id: 3,
						head: 'Исправленные ошибки',
						icon: 'alert',
						model: false,
						type: 'bugfix',
						children: [] as Err[],
					},
				]
				item.changes.forEach((change) => {
					if (change.type === 'functional') {
						temp.children[0].children.push(change)
					}
					if (change.type === 'lib') {
						temp.children[1].children.push(change)
					}
					if (change.type === 'optimization') {
						temp.children[2].children.push(change)
					}
					if (change.type === 'bugfix') {
						temp.children[3].children.push(change)
					}
				})

				data1.push(temp)
			})
			myitems.setVersions([...data1])
			// items.value = data1
		})
		.catch((error) => {
			console.error('There was an error!', error)
		})
})
</script>

<template lang="pug">
component(:is="Version")
</template>

<style scoped lang="scss"></style>
