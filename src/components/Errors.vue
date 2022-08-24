<template lang="pug">
.grid
	.left
		.zg Исправленные ошибки
		template(v-for="error in filtered" :key="error.version")
			.version(:id="error.version")
				component(:is="WordHighlighter" :query="filter") {{error.version}}
			.smallgrid(v-for="item in error.fixed" :key="item.id" )
				component(:is="WordHighlighter" :query="filter") {{item.id}}
				component(:is="WordHighlighter" :query="filter") {{item.text}}
	.side
		q-input(dense debounce="300" placeholder="Фильтр" autofocus color="primary" v-model="filter" clearable @clear="filter = ''")
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")
		br
		.sod Содержание
		.list
			div(v-for="item in errors" @click="handleScroll(item.version)" :key="item.version") {{item.version}}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { errors } from '@/stores/data'
import WordHighlighter from 'vue-word-highlighter'
import { scroll } from 'quasar'

const { getScrollTarget, setVerticalScrollPosition } = scroll

const filter = ref('')

const filtered = computed(() => {
	if (filter.value !== '') {
		let temp = errors.filter((element) =>
			element.fixed.some(
				(subElement) =>
					subElement.id.toLowerCase().includes(filter.value.toLowerCase()) ||
					subElement.text.toLowerCase().includes(filter.value.toLowerCase())
			)
		)
		return temp.map((item) => {
			return {
				...item,
				fixed: item.fixed.filter(
					(el) =>
						el.id.toLowerCase().includes(filter.value.toLowerCase()) ||
						el.text.toLowerCase().includes(filter.value.toLowerCase())
				),
			}
		})
	}
	return errors
})

const handleScroll = (e: string) => {
	const ele = document.getElementById(e) // You need to get your element here
	const target = getScrollTarget(ele!)
	const offset = ele!.offsetTop - 75
	const duration = 300
	setVerticalScrollPosition(target, offset, duration)
}
</script>

<style scoped lang="scss">
.smallgrid {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: 120px 1fr;
	column-gap: 1rem;
	row-gap: 1rem;
	font-size: 1.1rem;
	line-height: 120%;
}
</style>
