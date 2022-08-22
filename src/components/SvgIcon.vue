<template>
	<svg aria-hidden="true" class="icon" :class="{ 'icon-spin': spin }">
		<use :href="symbolId" :fill="color" />
	</svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
	name: 'SvgIcon',
	props: {
		prefix: {
			type: String,
			default: 'icon',
		},
		name: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			default: '#333',
		},
		spin: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const symbolId = computed(() => `#${props.prefix}-${props.name}`)
		return { symbolId }
	},
})
</script>

<style lang="scss">
svg.icon {
	width: 1.5em;
	height: 1.5em;
	vertical-align: middle;
	margin-bottom: 0.125em;
	// margin-right: 0.5em;
	fill: #666;
}
body.body--dark svg.icon {
	fill: #ab9073;
}

svg.icon-spin {
	animation: icon-spin 2s infinite linear;
}

@keyframes icon-spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(359deg);
	}
}
</style>
