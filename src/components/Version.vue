<template lang="pug">
.grid
	.left
		template(v-if="filtered.length === 0")
			.notfound Ничего нет. Попробуйте изменить запрос.
		template(v-for="version in filtered" :key="version.id")
			.version(:id="version.fileVersion")
				.row.items-center
					q-btn( dense unelevated color="accent" v-if="version.metadata.isPublic === true").q-mr-md
						component(:is="SvgIcon" name="source-branch" color="white")
					div(:class="{link : version.metadata.isPublic}"  @click.prevent="downloadItem(version)")
						span(v-if="version.metadata.isPublic === true") {{version.fileVersion}}
						span(v-else) Войдет в следующую версию

				component(:is="Dateblock" :filter="filter" :version="version")

			q-list(v-intersection="intersectionObject" :id="version.id")
				template(v-for="(item) in version.children")
					q-expansion-item(v-if="item.children.length > 0"
						:key="item.id"
						:label="item.head"
						header-class="hd"
						:icon="showIcon(item.icon)"
						expand-separator
						expand-icon="img:/img/chevron-down.svg"
						:model-value="item.model"
						@click="myitems.toggleModel(item)")

						q-card-section(v-for="el in item.children" :key="el.title")
							.smallgrid
								.label
									component(:is="WordHighlighter" :query="filter") {{el.title}}
								.text
									component(:is="WordHighlighter" :query="filter") {{el.description}}
									br
									q-btn(v-if="el.detailed" unelevated color="accent" label="Еще" size="xs" @click="more(item.id, el.title)")
							.more.hid(:id="setId(item.id, el.title)" v-if="el.detailed")
								div(v-html="el.detailed")

	.side
		q-input(dense debounce="300" placeholder="Фильтр" autofocus color="primary" v-model="filter" clearable clear-icon="img:/img/close-circle-outline.svg" @clear="clear")
			template(v-slot:prepend)
				SvgIcon(name="magnify").magnify
		br
		.sod Содержание
		.list
			.empt(v-for="item in myitems.versions" @click="handleScroll(item.fileVersion)" :key="item.fileVersion" :class="calcClass(item.id)")
				span(v-if="item.metadata.isPublic === true") {{item.fileVersion}}
				span(v-else) Войдет в следующую версию
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { scroll } from 'quasar'
import WordHighlighter from 'vue-word-highlighter'
import { useItems } from '@/stores/items'
import type { Ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import Dateblock from '@/components/Dateblock.vue'

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

const { getScrollTarget, setVerticalScrollPosition } = scroll
const filter = ref('')
const clear = () => {
	filter.value = ''
}

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

		return curr.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			curr.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			children?.length > 0
			? [...prev, { ...curr, children }]
			: prev
	}, [])
}

const filtered = computed(() => {
	if (filter.value.length > 1) {
		return filterByLabel(myitems.versions, filter.value)
	}
	return myitems.versions
})

watchEffect(() => {
	if (filter.value.length > 1) {
		myitems.expandAll()
	}
})

const setId = (id: number, label: string) => {
	return id + label
}

const more = (id: number, label: string) => {
	let el = document.getElementById(id + label)
	el?.classList.toggle('hid')
}
const calcClass = (e: number) => {
	if (inView.value.some((el) => el == e.toString())) {
		return 'visib'
	} else return ''
}
const showIcon = (icon: string) => {
	return 'img:/img/' + icon + '.svg'
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
	// margin-bottom: 1rem;
}
.label {
	font-weight: 500;
	font-style: italic;
}
.notfound {
	margin-top: 3rem;
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
.myrow {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background: #eee;
}
.magnify {
	width: 22px;
}
</style>
