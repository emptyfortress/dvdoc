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
					q-btn(dense flat round color="accent" icon="mdi-unfold-more-horizontal" @click="myitems.expandBlock(version)")

			q-list
				q-expansion-item(v-for="(item) in version.children"
					:ref="(el: any) => it[item.id] = el"
					:key="item.id"
					:label="item.label"
					header-class="hd"
					:icon="item.icon"
					expand-separator
					:model-value="item.model"
					@click="myitems.toggleModel(item)"
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
import { ref, computed, onBeforeUpdate, watchEffect, reactive } from 'vue'
import { versions } from '@/stores/data'
import { scroll } from 'quasar'
import WordHighlighter from 'vue-word-highlighter'
import { useItems } from '@/stores/items'

const myitems = useItems()
myitems.setVersions(versions)

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

			return curr.label?.toLowerCase().includes(searchTerm.toLowerCase()) || children?.length > 0
				? [...prev, { ...curr, children }]
				: prev
		}, [])
	}
	return array
}

const filtered = computed(() => {
	return filterByLabel(myitems.versions, filter.value)
})

const it: any = reactive({})

onBeforeUpdate(() => Object.assign(it, {}))

watchEffect(() => {
	if (filter.value.length > 1) {
		myitems.expandAll()
	}
})
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
