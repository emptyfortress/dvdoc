<script setup lang="ts">
import { ref, computed } from 'vue'
import Drawer from '@/components/Drawer.vue'
import RDrawer from '@/components/RDrawer.vue'
import { useRoute } from 'vue-router'

const leftDrawer = ref(true)
const rightDrawer = ref(true)
const route = useRoute()
</script>

<template lang="pug">
q-layout(view="hHh LpR fFf")
	q-header.head
		q-toolbar

			q-toolbar-title.gt-sm
				img(src="@/assets/img/book.svg").ico
				span Документация Docsvision
			q-space
			input(placeholder="Поиск").inp
			.site Сайт Docsvision
			.site Дополнительно

	Drawer(:show="leftDrawer")
	//- RDrawer(:show="rightDrawer")

	.subbar
		q-btn(flat round dense icon="mdi-home-outline").q-mr-sm
		q-breadcrumbs(active-color="black").bread
			q-breadcrumbs-el(v-for="item in route.meta.bread" :key="item" :label="item")
	q-page-container.rel
		q-page.q-pt-xl
			router-view(v-slot="{ Component }")
				transition(name="fade" mode="out-in")
					component(:is="Component")

</template>

<style scoped lang="scss">
.q-page-container {
	position: relative;
}
.subbar {
	position: fixed;
	top: 72px;
	width: 100%;
	height: 50px;
	background: $grey-2;
	border-bottom: 1px solid $grey-4;
	line-height: 50px;
	padding-left: 320px;
	display: flex;
	align-items: center;
	font-size: 1rem;
	z-index: 30;
}
.bread {
	color: black;
}
.q-breadcrumbs__el:hover {
	text-decoration: underline;
}
.head {
	height: 72px;
	line-height: 72px;
	color: $secondary;
	padding-left: 2rem;
}
.ico {
	transform: translateY(7px);
	margin-right: 1rem;
	width: 24px;
}
.inp {
	height: 30px;
	margin-right: 2rem;
}
.site {
	padding: 0 1rem;
	font-size: 1.2rem;
	cursor: pointer;
	&:hover {
		background: darken($primary, 7%);
	}
}
.q-toolbar {
	padding-right: 0;
}
</style>
