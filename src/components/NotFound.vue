<template lang="pug">
q-dialog(v-model="props.show")
	q-card
		q-card-section(horizontal)
			q-card-section
				component(:is="SvgIcon" name="alert" color="darkred").alert
			q-card-section Архив с указанным релизом отсутствует. Обратитесь за помощью к администратору.
		q-card-actions(align="center").q-pt-none
			q-btn(flat color="accent" label="Закрыть" @click="close")

</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
	show: Boolean,
})
const emit = defineEmits(['close'])

const close = () => {
	emit('close')
}
</script>

<style scoped lang="scss">
.q-card {
	border-top: 5px solid darkred;
}
.alert {
	font-size: 1.9rem;
}
</style>
