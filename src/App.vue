<script setup lang="ts">
import { ref, computed } from 'vue'
import Drawer from '@/components/Drawer.vue'
import RDrawer from '@/components/RDrawer.vue'
import { date } from 'quasar'

const leftDrawer = ref(true)
const rightDrawer = ref(false)

const toggleLeftDrawer = () => {
	leftDrawer.value = !leftDrawer.value
}
const toggleRightDrawer = () => {
	rightDrawer.value = !rightDrawer.value
}

const timeStamp = Date.now()
const formattedString = date.formatDate(timeStamp, 'dddd, D MMMM')
</script>

<template lang="pug">
q-layout(view="hHh lpR fFf")
	q-header.head
		q-toolbar
			q-btn(dense flat round icon="mdi-menu" @click="toggleLeftDrawer")

			q-toolbar-title.gt-sm
				span {{ formattedString }}
			q-space
			q-btn(dense flat round icon="mdi-magnify")
			q-btn(dense round unelevated color="light-blue-2").q-ml-sm
				q-avatar
					img(src="@/assets/img/users/user0.svg")
					.mybadge
			q-btn(dense flat round icon="mdi-help-circle-outline").q-ml-sm
			q-btn(dense flat round icon="mdi-brightness-4" @click="toggleRightDrawer").q-mx-sm

	Drawer(:show="leftDrawer" @toggle="toggleLeftDrawer")
	RDrawer(:show="rightDrawer")

	q-page-container
		router-view
		//- //- router-view(v-slot="{ Component, route }")
			transition(name="fade")
				component(:is="Component")

</template>

<style scoped lang="scss">
.head {
	height: 72px;
	line-height: 72px;
}
</style>
