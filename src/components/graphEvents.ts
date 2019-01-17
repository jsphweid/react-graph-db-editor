import { handleEdgeCreate, handleNodeCreate } from '../actions'
import { getStores } from '../stores'

const { selection } = getStores()

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
      selection.setActiveElement(nodes[0])
    }
  },
  selectEdge: (event: any) => {
    const { edges } = event
    if (edges.length) {
      selection.setActiveElement(edges[0])
    }
  },
  deselectEdge: () => {
    selection.setActiveElement(null)
  },
  deselectNode: (event: any) => {
    const { edges, nodes } = event
    if (nodes.length) {
      selection.setActiveElement(nodes[0])
    } else if (edges.length) {
      selection.setActiveElement(edges[0])
    } else {
      selection.setActiveElement(null)
    }
  },
  doubleClick: (event: any) => {
    const { canvas } = event.pointer
    handleNodeCreate({ label: 'temp', x: canvas.x, y: canvas.y })
  }
}
