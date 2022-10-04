<template lang="pug">
.container
	h6 Hello!
	p(v-for="item in items") {{ item.fileVersion }}
	pre {{items}}
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import type { Ref } from 'vue'

const items: Ref<Myversion[]> = ref([])

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
						icon: 'mdi-close',
						model: false,
						type: 'functional',
						children: [],
					},
					{
						id: 1,
						head: 'Изменения в библиотеках элементов управления',
						icon: 'mdi-close',
						model: false,
						type: 'lib',
						children: [],
					},
					{
						id: 2,
						head: 'Оптимизации',
						icon: 'mdi-close',
						model: false,
						type: 'optimization',
						children: [],
					},
					{
						id: 3,
						head: 'Исправленные ошибки',
						icon: 'mdi-alert',
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
			items.value = data1
		})
		.catch((error) => {
			console.error('There was an error!', error)
		})
})
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.container {
	max-width: 1400px;
	margin: 0 auto;
	background: #eee;
}
</style>
