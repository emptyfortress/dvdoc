interface Children {
	id: number
	head: string
	icon: string
	model: boolean
	type: string
	children: Err[]
}

interface Err {
	id: string
	type: string
	title: string
	description: string
	detailed: string
}

interface Metadata {
	isPublic: boolean
	downloadLink?: string
	publishDate?: string
	bildId?: number
}

interface Version {
	id: number
	fileVersion: string
	metadata: Metadata
	changes: Err[]
}

interface Myversion {
	id: number
	fileVersion: string
	metadata: Metadata
	children: Children[]
}
