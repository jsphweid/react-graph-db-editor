import { ActionHandlers } from '../src/index'
import { AddNodeHandler, UpdateNodeHandler } from '../src/types/action-handlers'
import { timeoutPromise } from '../src/utils'
import { MyCustomAttributes } from './custom'

// These fake handlers always give the minimal success in their return

/*
 * Add/Update Node methods are special because they allow you to specify
 * custom properties that you want on your node as long as the values are
 * nothing more than strings, numbers, string[], or number[]. These
 * values will magically appear in the UI editor and updates will
 * appear in updateNode when something is saved.
 */
const addNode: AddNodeHandler<MyCustomAttributes> = async () => {
  console.log(
    'This is where you would add a node in your database and a valid node to confirm its place on the graph'
  )
  await timeoutPromise(500)
  return { aliases: ['alias 1'], id: Date.now() }
}

const updateNode: UpdateNodeHandler<MyCustomAttributes> = async (
  id,
  updates
) => {
  console.log(
    `This is where you would update node: ${id} with updates: ${JSON.stringify(
      updates,
      null,
      2
    )}`
  )
  await timeoutPromise(500)
  return updates
}

export const actionHandlers: ActionHandlers = {
  addNode,
  updateNode,
  addEdge: async edge => {
    console.log(
      `This is where you would add an edge from node id ${
        edge.from
      } to node id ${edge.to}`
    )
    await timeoutPromise(500)
    return edge
  },
  updateEdge: async (id, updates) => {
    console.log(
      `This is where you would update edge id ${id} with updates: ${JSON.stringify(
        updates,
        null,
        2
      )}`
    )
    await timeoutPromise(500)
    return updates
  },
  deleteNode: async id => {
    console.log(`This is where you would delete node with id ${id}`)
    await timeoutPromise(500)
    return true
  },
  deleteEdge: async id => {
    console.log(`This is where you would delete edge with id ${id}`)
    await timeoutPromise(500)
    return true
  }
}
