import { ActionHandlers } from '../src/index'
function shortPause(): Promise<void> {
  return new Promise(resolve => setTimeout(() => resolve(), 500))
}

// These fake handlers always give the minimal success in their return
export const actionHandlers: ActionHandlers = {
  addEdge: async () => {
    await shortPause()
    return { id: `newId-${Date.now()}` }
  },
  addNode: async () => {
    await shortPause()
    return {}
  },
  updateNode: async () => {
    await shortPause()
    return {}
  },
  deleteNode: async () => {
    await shortPause()
    return true
  }
}
