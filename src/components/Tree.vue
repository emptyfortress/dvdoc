<template lang="pug">
.grid
	.left
		.zg
			|Список изменений
			span (вариант с деревом)
		q-tree(:nodes="errors" node-key="id" v-model:expanded="start" :filter="filter")
			template(v-slot:header-root="prop")
				.row.items-center
					img(src="/img/wc.svg" class="q-mr-sm" )
					div {{ prop.node.label }}

			template(v-slot:default-header="prop")
				.row.items-center
					q-icon(v-if="prop.node.icon" :name="prop.node.icon " size="28px" class="q-mr-sm")
					div
						|{{ prop.node.label }}
						.story {{ prop.node.story }}

	.side
		q-input(dense debounce="300" placeholder="Фильтр" autofocus color="primary" v-model="filter" clearable @clear="filter = ''")
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { errors } from '@/stores/data1'

const filter = ref('')
const start = ref(['0'])
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.zg span {
	font-size: 1rem;
	margin-left: 2rem;
}
.q-tree {
	font-size: 1.2rem;
}
.story {
	font-size: 0.95rem;
	color: #666;
}
.q-tree__node-body {
	margin: 0;
	padding: 0;
}
</style>
