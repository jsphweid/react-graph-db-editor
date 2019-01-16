import { ActionHandlers } from '../src/index'
import { timeoutPromise } from '../src/utils'

// These fake handlers always give the minimal success in their return
export const actionHandlers: ActionHandlers = {
  addEdge: async edge => {
    await timeoutPromise(500)
    // add to your databaes

    return edge
  },
  addNode: async () => {
    await timeoutPromise(500)

    return { aliases: [], id: 5 }
  },
  updateNode: async (id, updates) => {
    await timeoutPromise(500)
    return {}
  },
  updateEdge: async (id, updates) => {
    await timeoutPromise(500)
    return updates
  },
  deleteNode: async id => {
    await timeoutPromise(500)
    return true
  },
  deleteEdge: async id => {
    await timeoutPromise(500)
    return true
  }
}
