<template lang="pug">
.row.items-center.q-pr-sm
	.date.q-mr-lg
		span(v-if="props.version.metadata.publishDate") {{props.version.metadata.publishDate.split('T')[0]}}
		span(v-else) -- | --
	q-btn(v-if="filter.length < 1" dense flat round
		color="accent"
		@click="handleClick($event, props.version)" )
		q-tooltip(anchor="top middle" self="bottom middle") Shif-Click - распахнуть все
		component(:is="SvgIcon" name="unfold-more-horizontal")
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { useItems } from '@/stores/items'

const props = defineProps<{
	filter: String
	version: Myversion
}>()

const myitems = useItems()

const handleClick = (e: any, version: any) => {
	if (e.shiftKey) {
		myitems.toggleAll()
	} else myitems.expandBlock(version)
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
