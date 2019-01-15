import { handleEdgeCreate, handleNodeCreate } from '../actions'
import { getStores } from '../stores'

const { visjsInterface } = getStores()

export const manipulationEvents = {
  addEdge: (data: any, callback: any) => {
    const { from, to } = data
    if (from === to) {
      return // ignore self-referential edges
    } else {
      handleEdgeCreate(from, to)
      callback()
    }
  }
}

export const userEvents = {
  selectNode: (event: any) => {
    const { nodes } = event
    if (nodes.length) {
      visjsInterface.selectNode(nodes[0])
    }
  },
  selectEdge: (event: any) => {
    const { edges } = event
    if (edges.length) {
      visjsInterface.selectEdge(edges[0])
    }
  },
  deselectEdge: () => visjsInterface.selectEdge(),
  deselectNode: () => visjsInterface.selectNode(),
  doubleClick: (event: any) => {
    const { canvas } = event.pointer
    handleNodeCreate({ label: 'temp', x: canvas.x, y: canvas.y })
  }
}
