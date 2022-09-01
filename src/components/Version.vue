<template lang="pug">
.grid
	.left
		.zg Release notes
		template(v-if="filtered.length === 0")
			.notfound
				q-icon(name="mdi-emoticon-cry-outline" size="md").q-mr-md
				span Ничего нет. Попробуйте изменить запрос.
		template(v-else v-for="(version, index) in filtered" :key="version.id")
			.version(:id="version.ver")
				.row.items-center
					q-btn( dense unelevated icon="mdi-source-branch" color="accent" :disabled="index == 0").q-mr-md
						q-tooltip(anchor="top middle" self="bottom middle") Скачать
					div(:class="{link : index !== 0}") {{version.ver}}
				.row.items-center.q-pr-sm
					.date(v-if="index !== 0").q-mr-lg 23.07.2022
					q-btn(v-if="filter.length < 1" dense flat round
						color="accent"
						icon="mdi-unfold-more-horizontal"
						@click="handleClick($event, version)" )
						q-tooltip(anchor="top middle" self="bottom middle") Shif-Click - распахнуть все

			q-list(v-intersection="intersectionObject" :id="version.ver")
				q-expansion-item(v-for="(item) in version.children"
					:key="item.id"
					:label="item.head"
					header-class="hd"
					:icon="item.icon"
					expand-separator
					:model-value="item.model"
					@click="myitems.toggleModel(item)"
					)

					q-card-section(v-for="el in item.children" :key="el.label")
						.smallgrid
							.label
								component(:is="WordHighlighter" :query="filter") {{el.label}}
							.text
								component(:is="WordHighlighter" :query="filter") {{el.text}}
								br
								q-btn(v-if="el.more" unelevated color="accent" label="Еще" size="xs" @click="more(item.id, el.label)")
						.more.hid(:id="setId(item.id, el.label)" v-if="el.more")
							div(v-html="el.more")
							div Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed accumsan ligula, vitae feugiat nibh. Cras auctor iaculis feugiat. Mauris est tortor, dignissim eu ipsum at, dapibus condimentum neque. Fusce posuere bibendum maximus.
							q-img(src="https://picsum.photos/id/103/600/300")

	.side
		q-input(dense debounce="300" placeholder="Фильтр" autofocus color="primary" v-model="filter" clearable @clear="filter = ''")
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")
		br
		.sod Содержание
		.list
			.empt(v-for="item in filtered" @click="handleScroll(item.ver)" :key="item.ver" :class="calcClass(item.ver)") {{item.ver}}
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { versions } from '@/stores/data'
import { scroll } from 'quasar'
import WordHighlighter from 'vue-word-highlighter'
import { useItems } from '@/stores/items'
import type { Ref } from 'vue'

const inView: Ref<String[]> = ref([])

const add = (e: string) => {
	remove(e)
	inView.value.push(e)
}
const remove = (e: string) => {
	let index
	while ((index = inView.value.indexOf(e)) > -1) {
		inView.value.splice(index, 1)
	}
}
const intersection = (entry: any) => {
	if (entry.isIntersecting === true) {
		add(entry.target.id)
	} else {
		remove(entry.target.id)
	}
}
const intersectionObject = {
	handler: intersection,
	cfg: {
		rootMargin: '-120px',
	},
}
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
	return array.reduce((prev: any, curr: any) => {
		const children = curr.children ? filterByLabel(curr.children, searchTerm) : undefined

		return curr.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			curr.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			children?.length > 0
			? [...prev, { ...curr, children }]
			: prev
	}, [])
}

const filtered = computed(() => {
	if (filter.value !== '') {
		return filterByLabel(myitems.versions, filter.value)
	}
	return myitems.versions
})

watchEffect(() => {
	if (filter.value.length > 1) {
		myitems.expandAll()
	}
})
const handleClick = (e: any, version: any) => {
	if (e.shiftKey) {
		myitems.toggleAll()
	} else myitems.expandBlock(version)
}

const setId = (id: string, label: string) => {
	return id + label
}

const more = (id: string, label: string) => {
	let el = document.getElementById(id + label)
	el?.classList.toggle('hid')
}
const calcClass = (e: string) => {
	if (inView.value.some((el) => el === e)) {
		return 'visib'
	} else return ''
}
</script>

<style scoped lang="scss">
.smallgrid {
	margin-left: 4rem;
	display: grid;
	grid-template-columns: 260px 1fr;
	column-gap: 1rem;
	font-size: 1rem;
	line-height: 120%;
	margin-bottom: 1rem;
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
.notfound {
	padding: 1rem;
	border: 1px solid pink;
	background: $pink-1;
	font-size: 1rem;
}
.more {
	font-size: 1.1rem;
	margin-left: 4rem;
	&.hid {
		display: none;
	}
}
.empt {
	border-left: 3px solid transparent;
}
.visib {
	border-left: 3px solid $accent;
}
.link {
	cursor: pointer;
	color: $accent;
	&:hover {
		text-decoration: underline;
	}
}
</style>
