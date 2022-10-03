interface ErrGroup {
	id: string
	head: string
	icon: string
	model: boolean
	changes: Err[]
}

interface Err {
	id: string
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
