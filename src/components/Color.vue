<template lang="pug">
q-item-label(header) Выберите основной (primary) цвет:
q-item
	.q-mx-md
		q-btn(round unelevated :color="swatch.color" v-for="swatch in swatches" :key="swatch.id" :id="swatch.id" @click="setColor(swatch.id, swatch.color)").swatch
			q-icon(name="mdi-check" v-if="swatch.icon")
.patch
	input(type="color" id="colorPatch" :value="patch" @input="changeColor")
	.q-ml-md Настроить основной цвет
br
q-separator
.patch
	input(type="color" id="linkPatch" :value="patch1" @input="changeLinkColor")
	.q-ml-md Настроить цвет линков
br
q-separator
</template>

<script>
import { ref } from 'vue'

export default {
	props: {
		swatches: Array,
		title: String,
	},

	setup(props) {
		let patch = ref('#2196f3')
		let patch1 = ref('#2196f3')

		function RGBToHex(rgb) {
			let sep = rgb.indexOf(',') > -1 ? ',' : ' '
			rgb = rgb.substr(4).split(')')[0].split(sep)
			let r = (+rgb[0]).toString(16),
				g = (+rgb[1]).toString(16),
				b = (+rgb[2]).toString(16)
			if (r.length == 1) r = '0' + r
			if (g.length == 1) g = '0' + g
			if (b.length == 1) b = '0' + b
			return '#' + r + g + b
		}

		function hexToRGB(h) {
			let r = 0,
				g = 0,
				b = 0
			// 3 digits
			if (h.length == 4) {
				r = '0x' + h[1] + h[1]
				g = '0x' + h[2] + h[2]
				b = '0x' + h[3] + h[3]
				// 6 digits
			} else if (h.length == 7) {
				r = '0x' + h[1] + h[2]
				g = '0x' + h[3] + h[4]
				b = '0x' + h[5] + h[6]
			}
			rgbToHSL(r, g, b)
			return 'rgb(' + +r + ',' + +g + ',' + +b + ')'
		}

		function rgbToHSL(r, g, b) {
			// Then to HSL
			r /= 255
			g /= 255
			b /= 255
			let cmin = Math.min(r, g, b),
				cmax = Math.max(r, g, b),
				delta = cmax - cmin,
				h = 0,
				s = 0,
				l = 0

			if (delta == 0) h = 0
			else if (cmax == r) h = ((g - b) / delta) % 6
			else if (cmax == g) h = (b - r) / delta + 2
			else h = (r - g) / delta + 4

			h = Math.round(h * 60)

			if (h < 0) h += 360

			l = (cmax + cmin) / 2
			s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
			s = +(s * 100).toFixed(1)
			l = +(l * 100).toFixed(1)


			// set lighten variables
			let lighten1 = 'hsl(' + h + ',' + s + '%,' + (l + 10) + '%)'
			let lighten2 = 'hsl(' + h + ',' + s + '%,' + (l + 20) + '%)'
			let lighten3 = 'hsl(' + h + ',' + s + '%,' + (l + 30) + '%)'
			let selection = 'hsl(' + h + ',' + s + '%,' + '91%)'
			document.body.style.setProperty('--q-primary-lighten-1', lighten1)
			document.body.style.setProperty('--q-primary-lighten-2', lighten2)
			document.body.style.setProperty('--q-primary-lighten-3', lighten3)
			document.body.style.setProperty('--q-primary-selection', selection)
			// set darken variables
			let darken1 = 'hsl(' + h + ',' + s + '%,' + (l - 9) + '%)'
			let darken2 = 'hsl(' + h + ',' + s + '%,'  + (l - 15) + '%)'
			let darken3 = 'hsl(' + h + ',' + s + '%,'   + (l - 23) + '%)'
			document.body.style.setProperty('--q-primary-darken-1', darken1)
			document.body.style.setProperty('--q-primary-darken-2', darken2)
			document.body.style.setProperty('--q-primary-darken-3', darken3)
		}

		const setColor = (id, e) => {
			document.querySelector('#col').className = ''
			document.querySelector('#col').classList.add(e)
			props.swatches.map((item) => (item.icon = false))
			let active = props.swatches.find((item) => item.color === e)
			active.icon = true
			let myBt = document.getElementById(id)
			let currentColor = window.getComputedStyle(myBt).backgroundColor
			patch.value = RGBToHex(currentColor)
			hexToRGB(patch.value)
		}

		const changeColor = () => {
			let currentColorName = props.swatches.find((item) => item.icon).color
			let newColor = document.getElementById('colorPatch').value
			console.log(newColor)
			let colorRgb = hexToRGB(newColor)
			let combineName = '--' + currentColorName
			document.body.style.setProperty(combineName, colorRgb)
		}
		const changeLinkColor = () => {
			let newColor = document.getElementById('linkPatch').value
			document.body.style.setProperty('--q-link', newColor)
		}

		return {
			patch,
			patch1,
			setColor,
			changeColor,
			changeLinkColor,
		}
	},
}
</script>

<style scoped lang="scss">
.swatch {
	margin-right: 0.5rem;
	font-size: 1rem;
}
.patch {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-left: 1rem;
	margin-top: 1rem;
	color: var(--text-color);
	input {
		width: 50px;
		height: 50px;
		margin-left: 1rem;
		background: var(--bg-drawer);
	}
}
body.body--dark .q-item__label {
	color: var(--text-color);
}
</style>
