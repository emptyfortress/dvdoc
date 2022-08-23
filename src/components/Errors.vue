<template lang="pug">
.grid
	.left
		.zg Исправленные ошибки
		template(v-for="error in filtered" :key="error.version")
			.version
				WordHighlighter(:query="filter") {{error.version}}
			.smallgrid(v-for="item in error.fixed" :key="item.id" )
				WordHighlighter(:query="filter") {{item.id}}
				WordHighlighter(:query="filter") {{item.text}}
	.side
		q-input(dense debounce="300" color="primary" v-model="filter" clearable @clear="filter = ''")
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { errors } from '@/stores/data'
import WordHighlighter from 'vue-word-highlighter'

const filter = ref('')

const filtered = computed(() => {
	if (filter.value !== '') {
		let temp = errors.filter((element) =>
			element.fixed.some(
				(subElement) =>
					subElement.id.includes(filter.value) || subElement.text.includes(filter.value)
			)
		)
		return temp.map((item) => {
			return {
				...item,
				fixed: item.fixed.filter(
					(el) => el.id.includes(filter.value) || el.text.includes(filter.value)
				),
			}
		})
	}
	return errors
})
</script>

<style scoped lang="scss">
.version {
	font-size: 1.5rem;
	border-bottom: 1px solid #ccc;
	margin-top: 3rem;
}
.q-item {
	font-size: 1.1rem;
}
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
