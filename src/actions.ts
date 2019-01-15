import { ActionHandlers } from './index'
import { getStores } from './stores/index'
import { ID, Node } from './types'
import { makeEdge } from './utils'

const mockActionHandlers: ActionHandlers = {
  addEdge: () => Promise.resolve(null),
  addNode: () => Promise.resolve(null),
  updateNode: () => Promise.resolve(null),
  deleteNode: () => Promise.resolve(null)
}

let realActionHandlers = mockActionHandlers

export function setActionHandlers(actionHandlers: ActionHandlers): void {
  realActionHandlers = actionHandlers
}

export async function handleNodeCreate(node: Partial<Node>): Promise<void> {
  const { addNode, updateNode, deleteNode } = getStores().graph
  const tempId = addNode({ ...node, isPending: true })

  try {
    const partialNodeFromResponse = await realActionHandlers.addNode()
    if (partialNodeFromResponse) {
      updateNode(tempId, { ...partialNodeFromResponse, isPending: false })
    } else {
      deleteNode(tempId)
    }
  } catch (e) {
    console.log('Error:', e)
  }
}

export async function handleNodeUpdate(
  id: ID,
  updates: Partial<Node>
): Promise<void> {
  const { updateNode, getNode } = getStores().graph
  const previousNodeState = { ...getNode(id) }

  try {
    updateNode(id, { ...updates, isPending: true })
    const response = await realActionHandlers.updateNode(id, updates)
    if (response) {
      updateNode(id, { ...updates, isPending: false })
    } else {
      updateNode(id, { ...previousNodeState, isPending: false })
    }
  } catch (e) {
    console.log('Error:', e)
  }
}

export async function handleNodeDelete(id: ID): Promise<void> {
  const { deleteNode, getNode, updateNode } = getStores().graph
  const previousNodeState = { ...getNode(id) }
  try {
    updateNode(id, { ...previousNodeState, isPending: true })
    const response = await realActionHandlers.deleteNode(id)
    if (response) {
      deleteNode(id)
    } else {
      updateNode(id, { ...previousNodeState, isPending: false })
    }
  } catch (e) {
    console.log('Error:', e)
  }
}

export async function handleEdgeCreate(from: ID, to: ID): Promise<void> {
  const { addEdge, updateEdge, deleteEdge } = getStores().graph
  const edge = makeEdge(from, to)

  try {
    addEdge({ ...edge, isPending: true })
    const createEdgeResponse = await realActionHandlers.addEdge()
    if (createEdgeResponse) {
      updateEdge(edge.id, edge)
    } else {
      deleteEdge(edge.id)
    }
  } catch (e) {
    console.log('Error:', e)
  }
}
