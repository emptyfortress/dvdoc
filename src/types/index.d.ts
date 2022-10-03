interface Node {
	id: string
	head: string
	icon: string
	model: boolean
	children: Err[]
}

interface Err {
	id: string
	label: string
	text: string
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
	changes: Changes[]
}
