import { uid } from 'quasar'

const randomArray = (length: number, min: number, max: number) => {
	let result = []
	while (result.length < length) {
		let random = Math.floor(Math.random() * (max - min + 1) + min)
		result.push(random)
	}
	return result
}

const randomNumber = (min: number, max: number, fixed: number) => {
	return (Math.random() * (max - min + 1) + min).toFixed(fixed)
}

// const getMembers = (members: RowCategory[]): RowCategory[] => {
// 	let children = [] as RowCategory[]
// 	return members
// 		.map((mem) => {
// 			const m = { ...mem } // use spread operator
// 			if (m.children && m.children.length) {
// 				children = [...children, ...m.children]
// 			}
// 			delete m.children // this will not affect the original array object
// 			return m
// 		})
// 		.concat(children.length ? getMembers(children) : children)
// }

function getNodeFromTree(node: Node, nodeId: string): Node | null {
	if (node.id == nodeId) {
		return node
	} else if (node.children != null) {
		var result = null
		for (let i = 0; result == null && i < node.children.length; i++) {
			result = getNodeFromTree(node.children[i], nodeId)
		}
		return result
	}
	return null
}

function deleteNodeFromTree<T extends { id: string; children: T[] }>(node: T, nodeId: string) {
	if (node.children != null) {
		for (let i = 0; i < node.children.length; i++) {
			let filtered = node.children.filter((f) => f.id == nodeId)
			if (filtered && filtered.length > 0) {
				node.children = node.children.filter((f) => f.id != nodeId)
				return
			}
			deleteNodeFromTree(node.children[i], nodeId)
		}
	}
}

function insertNodeIntoTree<T extends { id: string; children: T[] }>(
	node: T,
	nodeId: string,
	newNode: T
) {
	if (node.id == nodeId) {
		node.children?.push(newNode)
	} else if (node.children != null) {
		for (let i = 0; i < node.children.length; i++) {
			insertNodeIntoTree(node.children[i], nodeId, newNode)
		}
	}
}

export {
	randomArray,
	randomNumber,
	// getMembers,
	getNodeFromTree,
	deleteNodeFromTree,
	insertNodeIntoTree,
}
