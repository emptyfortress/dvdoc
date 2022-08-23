<template lang="pug">
q-drawer(:model-value="show" show-if-above side="left" ).bg-grey-2
	q-list
		q-item(clickable v-ripple :to="page.url" v-for="page in pages" :key="page.id" )
			q-item-section(:class="page.classname") {{ page.title }}

</template>

<script setup lang="ts">
const props = defineProps({
	show: Boolean,
})

const pages = [
	{
		id: 0,
		title: 'Web-client',
		url: '/',
	},
	{
		id: 1,
		title: 'Список изменений в версиях',
		url: '/version',
		classname: 'tab',
	},
	{
		id: 1,
		title: 'Исправленные ошибки',
		url: '/errors',
		classname: 'tab',
	},
]
</script>

<style scoped lang="scss">
.q-item {
	font-size: 1rem;
}
.q-item--active,
.q-item.q-router-link--active {
	color: black;
}
.tab {
	padding-left: 2rem;
}
</style>
