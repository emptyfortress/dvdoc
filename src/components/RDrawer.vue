<template lang="pug">
q-drawer(v-model="show" side="right" bordered)
	h2 Hello!
</template>

<script setup lang="ts">
const props = defineProps({
	show: Boolean,
})
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
