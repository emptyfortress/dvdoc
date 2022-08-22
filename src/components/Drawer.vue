<template lang="pug">
q-drawer(:model-value="show" side="left" :width="256" bordered).bg-grey-2
	q-list
		q-item(clickable v-ripple :to="page.url" v-for="page in pages" :key="page.id" )
			q-item-section(avatar)
				q-icon(:name="page.icon")
			q-item-section {{ page.title }}

</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue'

export default {
	props: ['show'],
	components: { SvgIcon },
	setup() {
		const pages = [
			{
				id: 0,
				title: 'Коды полномочий',
				icon: 'mdi-book-open-page-variant-outline',
				url: '/',
			},
		]

		return {
			pages,
		}
	},
}
</script>

<style scoped lang="scss">
.q-item--active,
.q-item.q-router-link--active {
	color: black;
}
</style>
