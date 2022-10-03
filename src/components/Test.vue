<template lang="pug">
.container
	h6 Hello!
	pre {{items}}
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import type { Ref } from 'vue'

const items: Ref<Version[]> = ref([])

onBeforeMount(() => {
	fetch('https://vzhik.digdes.com/api/changelog/tree/1')
		.then(async (response) => {
			const data = await response.json()

			if (!response.ok) {
				const error = (data && data.message) || response.statusText
				return Promise.reject(error)
			}

			let data1 = [] as Version[]

			data.forEach((item: Version) => {
				let temp = {} as Version
				temp.id = item.id
				temp.fileVersion = item.fileVersion
				temp.metadata = {} as Metadata
				Object.assign(temp.metadata, item.metadata)
				temp.changes = []
				item.changes.forEach((change) => {
					if (change.type === 'bugfix') {
					}
				})

				data1.push(temp)
			})
			items.value = data
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
