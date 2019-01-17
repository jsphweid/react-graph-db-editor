import { ActionHandlers } from '../src/index'
import { AddNodeHandler } from '../src/types/action-handlers'
import { timeoutPromise } from '../src/utils'
import { MyCustomAttributes } from './custom'

// These fake handlers always give the minimal success in their return

/*
 * Add Node is special as it allows you to specify custom properties
 * that you want on your node as long as the values are nothing more
 * complicated than strings, numbers, string[], or number[]. These
 * values will magically appear in the UI editor and updates will
 * appear in updateNode when something is saved.
 */
const addNode: AddNodeHandler<MyCustomAttributes> = async () => {
  await timeoutPromise(500)

  return { aliases: ['alias 1'], id: Date.now() }
}

export const actionHandlers: ActionHandlers = {
  addNode,
  addEdge: async edge => {
    await timeoutPromise(500)
    // add to your databaes

    return edge
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
