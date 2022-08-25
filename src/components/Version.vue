<template lang="pug">
.grid
	.left
		.zg Release notes
		template(v-for="(ver, index) in errors" :key="ver.id")
			.version(:id="ver.version")
				.row.items-center
					q-btn( dense unelevated icon="mdi-source-branch" color="accent").q-mr-md
					div {{ver.version}}
					//- .bad {{ver.version}}
				.row.items-center.q-pr-sm
					.date(v-if="index !== 0").q-mr-lg 23.07.2022
					q-btn(dense flat round color="accent" icon="mdi-unfold-more-horizontal" @click="expand(ver)")
			q-expansion-item(label="Функциональные изменения" header-class="hd" icon="mdi-briefcase-outline" expand-separator v-if="index !== 0")
				q-card-section
					.smallgrid(v-for="item in feat")
						.feat {{item.zag}}
						div {{ item.text }}
			q-expansion-item(label="Изменения в библиотеках элементов управления" header-class="hd" icon="mdi-bookshelf" expand-separator v-if="index !== 0")
				q-card-section
					.smallgrid(v-for="item in lib")
						.feat {{item.zag}}
						div {{ item.text }}
			q-expansion-item(label="Оптимизации" header-class="hd" icon="mdi-rocket-launch" expand-separator v-if="index !== 0")
				q-card-section
					.smallgrid(v-for="item in optim")
						.feat {{item.zag}}
						div {{ item.text }}
			q-expansion-item(label="Исправленные ошибки" header-class="hd" icon="mdi-alert-circle-outline" expand-separator)
				q-card-section
					.smallgrid1(v-for="item in ver.fixed")
						.feat {{item.id}}
						div {{ item.text }}
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
import { ref } from 'vue'
import { feat, lib, optim, versions } from '@/stores/changedata'
import { errors } from '@/stores/data'
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
const expand = (e) => {
	console.log(e)
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
.feat {
	font-weight: 500;
	font-style: italic;
}
.version {
	// margin-left: 12px;
}
</style>
