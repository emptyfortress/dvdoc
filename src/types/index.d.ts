interface Node {
	id: string
	label: string
	typ: number
	icon: string
	header?: string
	children: Node[]
	code: string
	name: string
	descr: string
	doveritel: string
}

interface Metadata {
	isPublic: boolean
	downloadLink?: string
	publishDate: Date
}

interface Changes {
	type: string
	title: string
	description: string
	detailed: string
}

interface Version {
	id: number
	fileVersion: string
	metadata: Metadata
	changes: Changes
}
