<script setup lang="ts">
import { ref, computed } from 'vue'
import Drawer from '@/components/Drawer.vue'
import RDrawer from '@/components/RDrawer.vue'

const leftDrawer = ref(true)
const rightDrawer = ref(true)

// const toggleLeftDrawer = () => {
// 	leftDrawer.value = !leftDrawer.value
// }
const toggleRightDrawer = () => {
	rightDrawer.value = !rightDrawer.value
}
</script>

<template lang="pug">
q-layout(view="hHh lpR fFf")
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
	RDrawer(:show="rightDrawer")

	q-page-container
		router-view

</template>

<style scoped lang="scss">
.head {
	height: 72px;
	line-height: 72px;
	color: $secondary;
	padding-left: 2rem;
}
.ico {
	transform: translateY(10px);
	margin-right: 1rem;
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
