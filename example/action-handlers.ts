import { ActionHandlers } from '../src/index'
import { AddNodeHandler, UpdateNodeHandler } from '../src/types/action-handlers'
import { makeEdge, timeoutPromise } from '../src/utils'
import { MyCustomAttributes } from './custom'

// These fake handlers always give the minimal success in their return

/*
 * Add/Update Node methods are special because they allow you to specify
 * custom properties that you want on your node as long as the values are
 * nothing more than strings, numbers, string[], or number[]. These
 * values will magically appear in the UI editor and updates will
 * appear in updateNode when something is saved.
 */

function print(title: string, args: any[]): void {
  console.log(`--- Calling ${title} ---`)
  args.forEach((arg, i) => {
    console.log(`Arg ${i + 1}:`, JSON.stringify(arg))
  })
}

const addNode: AddNodeHandler<MyCustomAttributes> = async () => {
  print('addNode', [])
  await timeoutPromise(500)
  return { aliases: ['alias 1'], id: Date.now() }
}

const updateNode: UpdateNodeHandler<MyCustomAttributes> = async (
  id,
  updates
) => {
  print('updateNode', [id, updates])
  await timeoutPromise(500)
  return updates
}

export const actionHandlers: ActionHandlers = {
  addNode,
  updateNode,
  addEdge: async (edge, existingConnections) => {
    print('addEdge', [edge, existingConnections])
    await timeoutPromise(500)
    return edge
  },
  updateEdge: async (id, newEdge, oldEdge, existingConnections) => {
    print('updateEdge', [id, newEdge, oldEdge, existingConnections])
    await timeoutPromise(500)
    return newEdge
  },
  deleteNode: async id => {
    print('deleteNode', [id])
    await timeoutPromise(500)
    return true
  },
  deleteEdge: async (edge, existingConnections) => {
    print('deleteEdge', [edge, existingConnections])
    await timeoutPromise(500)
    return true
  }
}
