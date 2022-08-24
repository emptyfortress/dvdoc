<template lang="pug">
.grid
	.left
		.zg Исправленные ошибки
		q-tree(:nodes="errors" node-key="id")

	.side
		q-input(dense debounce="300" placeholder="Фильтр" autofocus color="primary" v-model="filter" clearable @clear="filter = ''")
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { errors } from '@/stores/data1'

const filter = ref('')
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
