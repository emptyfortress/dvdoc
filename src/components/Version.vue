<template lang="pug">
.grid
	.left
		.zg Release notes
		template(v-if="filtered.length === 0")
			.notfound
				span Ничего нет. Попробуйте изменить запрос.
		template(v-else v-for="version in filtered" :key="version.id")
			.version(:id="version.id")
				.row.items-center
					q-btn( dense unelevated color="accent" v-if="version.metadata.isPublic === true").q-mr-md
						SvgIcon(name="source-branch" color="white")
					div(:class="{link : version.metadata.isPublic}")
						span(v-if="version.metadata.isPublic") {{version.fileVersion}}
						span(v-else) Войдет в следующую версию

				.row.items-center.q-pr-sm
					.date.q-mr-lg
						span(v-if="version.metadata.publishDate") {{version.metadata.publishDate.split('T')[0]}}
						span(v-else) -- | --
					q-btn(v-if="filter.length < 1" dense flat round
						color="accent"
						@click="handleClick($event, version)" )
						q-tooltip(anchor="top middle" self="bottom middle") Shif-Click - распахнуть все
						SvgIcon(name="unfold-more-horizontal")

			q-list(v-intersection="intersectionObject" :id="version.id")

				q-expansion-item(v-for="(item) in version.changes"
					:key="item.id"
					:label="item.head"
					header-class="hd"
					:icon="showIcon(item.icon)"
					expand-separator
					expand-icon="img:/img/chevron-down.svg"
					:model-value="item.model"
					@click="myitems.toggleModel(item)")

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

	.side
		q-input(dense debounce="300" placeholder="Фильтр" autofocus color="primary" v-model="filter" clearable clear-icon="img:/img/close-circle-outline.svg" @clear="filter = ''")
			template(v-slot:prepend)
				SvgIcon(name="magnify").magnify
		br
		.sod Содержание
		.list
			.empt(v-for="item in filtered" @click="handleScroll(item.fileVersion)" :key="item.fileVersion" :class="calcClass(item.fileVersion)") {{item.fileVersion}}
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, watchEffect } from 'vue'
import { scroll } from 'quasar'
import WordHighlighter from 'vue-word-highlighter'
import { useItems } from '@/stores/items'
import { versions } from '@/stores/data'
import type { Ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

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
const showIcon = (icon: string) => {
	return 'img:/img/' + icon + '.svg'
}

onBeforeMount(() => {
	// GET request using fetch with error handling
	fetch('https://vzhik.digdes.com/api/changelog/tree/1')
		.then(async (response) => {
			const data = await response.json()

			// check for error response
			if (!response.ok) {
				// get error message from body or default to response statusText
				const error = (data && data.message) || response.statusText
				return Promise.reject(error)
			}

			let data1 = [] as Version[]

			data.forEach((item: Version) => {
				let temp = {} as Version
				temp.id = item.id
				temp.fileVersion = item.fileVersion
				data1.push(temp)
			})
			myitems.setVersions(data)
			console.log('data1: ', data1)
		})
		.catch((error) => {
			console.error('There was an error!', error)
		})
})
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
