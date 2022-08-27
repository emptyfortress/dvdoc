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
				q-expansion-item(v-for="(item, ind) in version.data"
					ref="it"
					:key="item.id"
					:label="item.label"
					header-class="hd"
					:icon="item.icon"
					expand-separator
					)
					q-card-section
						.smallgrid(v-for="el in item.list")
							.label {{el.label}}
							.text(v-html="el.text")

	.side
		q-input(dense debounce="300" placeholder="Фильтр" autofocus color="primary" v-model="filter" clearable @clear="filter = ''")
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")
		br
		.sod Содержание
		.list
			div(v-for="item in versions" @click="handleScroll(item.ver)" :key="item.ver") {{item.ver}}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { versions } from '@/stores/data'
import { scroll } from 'quasar'

const { getScrollTarget, setVerticalScrollPosition } = scroll
const filter = ref('')

const handleScroll = (e: string) => {
	const ele = document.getElementById(e) // You need to get your element here
	const target = getScrollTarget(ele!)
	const offset = ele!.offsetTop - 75
	const duration = 300
	setVerticalScrollPosition(target, offset, duration)
}

const filtered = computed(() => {
	let filteredArray = versions.map((element) => {
		return { ...element, data: element.data.filter((item) => item.label.includes(filter.value)) }
	})
	return filteredArray.filter((item) => item.data.length > 0)
})

const it = ref()

const expandAll = (e: number) => {
	let begin = 0
	for (var i = 0; i < e; i++) {
		begin = begin + filtered.value[i].data.length
	}
	let end = begin + filtered.value[e].data.length
	for (i >= begin; i < end; i++) {
		it.value[i].toggle()
	}
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
