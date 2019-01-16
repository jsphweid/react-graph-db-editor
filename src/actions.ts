import { ActionHandlers } from './index'
import { getStores } from './stores/index'
import { Edge, ID, Node } from './types'
import { makeEdge, timeoutPromise } from './utils'

const mockActionHandlers: ActionHandlers = {
  addEdge: () => Promise.resolve(null),
  addNode: () => Promise.resolve(null),
  updateNode: () => Promise.resolve(null),
  updateEdge: () => Promise.resolve(null),
  deleteNode: () => Promise.resolve(null),
  deleteEdge: () => Promise.resolve(null)
}

let realActionHandlers = mockActionHandlers

export function setActionHandlers(actionHandlers: ActionHandlers): void {
  realActionHandlers = actionHandlers
}

export function deleteActiveElement() {
  const { activeElement } = getStores().selection
  const { getEdge } = getStores().graph
  if (!activeElement) return
  if (getEdge(activeElement.id)) {
    handleEdgeDelete(activeElement.id)
  } else {
    handleNodeDelete(activeElement.id)
  }
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

async function delayedConfirm(message: string): Promise<boolean> {
  return new Promise(resolve => {
    return timeoutPromise(200).then(() => resolve(window.confirm(message)))
  })
}

export async function handleNodeDelete(id: ID): Promise<void> {
  // Delayed because alert / confirm executes before keyup
  // which messes the key system up for delete / backspace
  const shouldDelete = await delayedConfirm(
    'Are you sure you want to delete this node and all of its connections?'
  )
  if (!shouldDelete) return
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
    const createEdgeResponse = await realActionHandlers.addEdge(edge)
    if (createEdgeResponse) {
      updateEdge(edge.id, edge)
    } else {
      deleteEdge(edge.id)
    }
  } catch (e) {
    console.log('Error:', e)
  }
}

export async function handleEdgeDelete(id: ID): Promise<void> {
  const { updateEdge, deleteEdge, getEdge } = getStores().graph
  const existingEdge = getEdge(id)
  try {
    updateEdge(id, { ...existingEdge, isPending: true })
    const response = await realActionHandlers.deleteEdge(id)
    if (response) {
      deleteEdge(id)
    } else {
      updateEdge(id, { ...existingEdge, isPending: false })
    }
  } catch (e) {
    console.log('Error:', e)
  }
}

export async function handleEdgeUpdate(
  id: ID,
  updates: Partial<Edge>
): Promise<void> {
  const { updateEdge, getEdge } = getStores().graph
  const existingEdge = getEdge(id)
  try {
    updateEdge(id, { ...updates, isPending: true })
    const response = await realActionHandlers.updateEdge(id, updates)
    if (response) {
      updateEdge(id, { ...updates, isPending: false })
    } else {
      updateEdge(id, { ...existingEdge, isPending: false })
    }
  } catch (e) {
    console.log('Error:', e)
  }
}
