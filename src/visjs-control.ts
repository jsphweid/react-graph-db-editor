import { getStores } from './stores'

let network: any = {
  selectNodes: () => console.log('unassigned selectNodes called'),
  selectEdges: () => console.log('unassigned selectEdges called'),
  editEdgeMode: () => console.log('unassigned editEdgeMode called'),
  addEdgeMode: () => console.log('unassigned addEdgeMode called')
}

export const initVisjsControl = (_network: any): void => {
  network = _network
}

export const deselectAll = (): void => {
  network.selectNodes([])
  network.selectEdges([])
}

export const selectNode = (id?: string): void => {
  // deselectAll()
  network.selectNodes(id ? [id] : [])
  getStores().selection.setActiveNode(id || null)
}

export const selectEdge = (id?: string): void => {
  // deselectAll()
  network.selectEdges(id ? [id] : [])
  getStores().selection.setActiveEdge(id || null)
}

export const toggleEditConnection = (): void => {
  network.editEdgeMode()
}

export const toggleCreateEdge = (): void => {
  network.addEdgeMode()
}

export const disableEditMode = (): void => {
  network.disableEditMode()
}

export const cancelEverything = (): void => {
  disableEditMode()
  deselectAll()
  getStores().selection.clearActiveElement()
}
