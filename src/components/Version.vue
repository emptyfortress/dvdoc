<template lang="pug">
.grid
	.left
		.zg Release notes
		template(v-for="(version, index) in filtered" :key="version.id")
			.version(:id="version.ver")
				.row.items-center
					q-btn( dense unelevated icon="mdi-source-branch" color="accent").q-mr-md
					div {{version.ver}}
				.row.items-center.q-pr-sm
					.date(v-if="index !== 0").q-mr-lg 23.07.2022
					q-btn(dense flat round color="accent" icon="mdi-unfold-more-horizontal" @click="expandAll(index)")

			q-list
				q-expansion-item(v-for="(item, ind) in version.children"
					:ref="(el: any) => it.push({ [item.id]:  el })"
					:key="item.id"
					:label="item.label"
					header-class="hd"
					:icon="item.icon"
					expand-separator
					)

					q-card-section
						.smallgrid(v-for="el in item.children")
							.label
								component(:is="WordHighlighter" :query="filter") {{el.label}}
							div(v-html="el.text").text

	.side
		q-input(dense debounce="300" placeholder="Фильтр" autofocus color="primary" v-model="filter" clearable @clear="filter = ''")
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")
		br
		.sod Содержание
		.list
			div(v-for="item in filtered" @click="handleScroll(item.ver)" :key="item.ver") {{item.ver}}
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUpdate, watch } from 'vue'
import type { Ref } from 'vue'

import { versions } from '@/stores/data'
import { scroll } from 'quasar'
import WordHighlighter from 'vue-word-highlighter'

const { getScrollTarget, setVerticalScrollPosition } = scroll
const filter = ref('')

const handleScroll = (e: string) => {
	const ele = document.getElementById(e) // You need to get your element here
	const target = getScrollTarget(ele!)
	const offset = ele!.offsetTop - 75
	const duration = 300
	setVerticalScrollPosition(target, offset, duration)
}

const filterByLabel = (array: any, searchTerm: string) => {
	if (searchTerm !== '') {
		return array.reduce((prev: any, curr: any) => {
			const children = curr.children ? filterByLabel(curr.children, searchTerm) : undefined

			return curr.label?.includes(searchTerm) || children?.length > 0
				? [...prev, { ...curr, children }]
				: prev
		}, [])
	}
	return array
}

const filtered = computed(() => {
	return filterByLabel(versions, filter.value)
})

const it: Ref<any[]> = ref([])

onBeforeUpdate(() => (it.value = []))

// let arr = [
// 	{ name: 'string 1', value: 'this', other: 'that' },
// 	{ name: 'string 2', value: 'this', other: 'that' },
// ]

// let obj = arr.find((o, i) => {
// 	if (o.name === 'string 1') {
// 		arr[i] = { name: 'new string', value: 'this', other: 'that' }
// 		return true // stop searching
// 	}
// })

const expandAll = (e: number) => {
	it.value.forEach((item) => item.show())

	// let temp = filtered.value[e].children
	// console.log(temp)
	// console.log(it.value[0])
	// console.log(it.value)
	// let finding = it.value.find((item) => item[fuck] === fuck)
	// console.log(finding)
	// temp.forEach((item: any) => {
	// 	let id = item.id
	// 	let index = it.value.findIndex((el) => el[id] === id)
	// 	it.value[index][id].show()
	// })
	// it.value[0].fuck.show()

	// temp.forEach((item: any) => {
	// 	filtered.value.find((o, i) => {
	// 		if (o[item.id] === item.id) {
	// 			it.value[i].show()
	// 		}
	// 	})
	// })

	// let begin = 0
	// for (var i = 0; i < e; i++) {
	// 	begin = begin + filtered.value[i].children.length
	// }
	// let end = begin + filtered.value[e].children.length
	// for (i >= begin; i < end; i++) {
	// 	it.value[i].toggle()
	// }
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.smallgrid {
	margin-left: 4rem;
	display: grid;
	grid-template-columns: 260px 1fr;
	column-gap: 1rem;
	font-size: 1rem;
	line-height: 120%;
	margin-bottom: 2rem;
}
.smallgrid1 {
	margin-left: 4rem;
	display: grid;
	grid-template-columns: 130px 1fr;
	column-gap: 1rem;
	font-size: 1rem;
	line-height: 120%;
	margin-bottom: 1rem;
}
.label {
	font-weight: 500;
	font-style: italic;
}
</style>
