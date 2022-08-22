interface BoundingBox {
	left: number
	right: number
	top: number
	bottom: number
}

function setCoord(e: BoundingBox) {
	const width = e.right - e.left
	const centerX = e.left + width / 2
	const centerY = e.top
	return { width, centerX, centerY }
}

const drawOr = (ctx: any, bb: BoundingBox, color: string) => {
	const { centerX, centerY } = setCoord(bb)
	ctx.translate(centerX, centerY)
	ctx.rotate((Math.PI / 180) * 45) // rotate
	ctx.translate(-centerX, -centerY) // translate back
	ctx.fillStyle = 'white'
	ctx.fillRect(centerX - 7, bb.top - 7, 14, 14)
	ctx.strokeStyle = color
	ctx.strokeRect(centerX - 7, bb.top - 7, 14, 14)
	ctx.translate(centerX, centerY)
	ctx.rotate((Math.PI / 180) * -45) // rotate
	ctx.translate(-centerX, -centerY) // translate back
	ctx.beginPath()
	ctx.arc(centerX, centerY, 4, 0, Math.PI * 2, true)
	ctx.strokeStyle = color
	ctx.stroke()
}

const drawAnd = (ctx: any, bb: BoundingBox, color: string) => {
	const { centerX, centerY } = setCoord(bb)
	ctx.translate(centerX, centerY)
	ctx.rotate((Math.PI / 180) * 45) // rotate
	ctx.translate(-centerX, -centerY) // translate back
	ctx.fillStyle = 'white'
	ctx.fillRect(centerX - 7, bb.top - 7, 14, 14)
	ctx.strokeStyle = 'blue'
	ctx.strokeRect(centerX - 7, bb.top - 7, 14, 14)
	ctx.translate(centerX, centerY)
	ctx.rotate((Math.PI / 180) * -45) // rotate
	ctx.translate(-centerX, -centerY) // translate back

	ctx.beginPath()
	ctx.moveTo(centerX - 4, centerY)
	ctx.lineTo(centerX + 4, centerY)
	ctx.strokeStyle = 'blue'
	ctx.stroke()

	ctx.beginPath()
	ctx.moveTo(centerX, centerY - 4)
	ctx.lineTo(centerX, centerY + 4)
	ctx.strokeStyle = 'blue'
	ctx.stroke()
}

const drawDisable = (ctx: any, bb: BoundingBox, color: string = 'green') => {
	const { centerX, centerY, width } = setCoord(bb)
	// main bg
	ctx.fillStyle = 'rgba(0,255,0,.5)'
	ctx.fillRect(bb.left, bb.top, width, 36)
	// draw crest
	ctx.beginPath()
	ctx.moveTo(bb.left, bb.top)
	ctx.lineTo(bb.right, bb.bottom)
	ctx.strokeStyle = color
	ctx.lineWidth = 2
	ctx.stroke()
	// ctx.beginPath()
	// ctx.moveTo(bb.right, bb.top)
	// ctx.lineTo(bb.left, bb.bottom)
	// ctx.strokeStyle = color
	// ctx.lineWidth = 2
	// ctx.stroke()

	ctx.fillStyle = 'green'
	ctx.font = '11px Arial'
	ctx.fillText('Исключен', bb.left, bb.bottom + 7)
	// // draw arrow
	// ctx.beginPath()
	// ctx.moveTo(centerX, bb.top - 5)
	// ctx.lineTo(centerX, bb.bottom)
	// ctx.strokeStyle = color
	// ctx.lineWidth = 4
	// ctx.stroke()

	// // draw triangle
	// ctx.beginPath()
	// ctx.moveTo(centerX, bb.bottom + 7)
	// ctx.lineTo(centerX + 7, bb.bottom - 8)
	// ctx.lineTo(centerX - 7, bb.bottom - 8)
	// ctx.closePath()
	// ctx.fillStyle = color
	// ctx.fill()
}

const drawComplex = (ctx: any, bb: BoundingBox, color?: string) => {
	const { centerX, centerY } = setCoord(bb)
	ctx.translate(centerX, centerY)
	ctx.rotate((Math.PI / 180) * 45) // rotate
	ctx.translate(-centerX, -centerY) // translate back
	ctx.fillStyle = 'white'
	ctx.fillRect(centerX - 7, bb.top - 7, 14, 14)
	ctx.strokeStyle = 'blue'
	ctx.strokeRect(centerX - 7, bb.top - 7, 14, 14)
	ctx.translate(centerX, centerY)
	ctx.rotate((Math.PI / 180) * -45) // rotate
	ctx.translate(-centerX, -centerY) // translate back

	ctx.beginPath()
	ctx.moveTo(centerX - 4, centerY)
	ctx.lineTo(centerX + 4, centerY)
	ctx.stroke()

	ctx.beginPath()
	ctx.moveTo(centerX, centerY - 4)
	ctx.lineTo(centerX, centerY + 4)
	ctx.stroke()

	ctx.beginPath()
	ctx.moveTo(centerX - 3, centerY - 3)
	ctx.lineTo(centerX + 3, centerY + 3)
	ctx.stroke()

	ctx.beginPath()
	ctx.moveTo(centerX + 3, centerY - 3)
	ctx.lineTo(centerX - 3, centerY + 3)
	ctx.stroke()
}

const drawCycle = (ctx: any, bb: BoundingBox) => {
	let shift = 3
	ctx.beginPath()
	ctx.arc(bb.right - shift, bb.top + shift, 9, 0, Math.PI * 2, true)
	ctx.closePath()
	ctx.fillStyle = '#279FF7'
	ctx.fill()

	ctx.font = '13px Arial'
	ctx.fillStyle = 'white'
	ctx.fillText('2', bb.right - 7, bb.top + 7)
}

export { drawDisable, drawOr, drawAnd, drawComplex, drawCycle }
