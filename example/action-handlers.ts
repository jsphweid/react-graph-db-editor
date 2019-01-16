import { ActionHandlers } from '../src/index'
import { timeoutPromise } from '../src/utils'

// These fake handlers always give the minimal success in their return
export const actionHandlers: ActionHandlers = {
  addEdge: async edge => {
    await timeoutPromise(500)
    return edge
  },
  addNode: async () => {
    await timeoutPromise(500)
    return {}
  },
  updateNode: async () => {
    await timeoutPromise(500)
    return {}
  },
  deleteNode: async () => {
    await timeoutPromise(500)
    return true
  },
  deleteEdge: async () => {
    await timeoutPromise(500)
    return true
  },
  updateEdge: async (_, updates) => {
    await timeoutPromise(500)
    return updates
  }
}
