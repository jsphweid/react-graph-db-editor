import { action, decorate, observable } from 'mobx'
import { getStores } from '.'

export default class NetworkStore {
  // observables
  public _network: any | null = null
  public editting: boolean = false
  public addingEdge: boolean = false

  // computed

  // actions
  public init = (network: any): void => {
    this._network = network
  }

  public deselectAll = (): void => {
    this._network.selectNodes([])
    this._network.selectEdges([])
  }

  public selectNode = (id?: string): void => {
    this.deselectAll()
    this._network.selectNodes(id ? [id] : [])
    getStores().selection.setActiveNode(id || null)
  }

  public selectEdge = (id?: string): void => {
    this.deselectAll()
    this._network.selectEdges(id ? [id] : [])
    getStores().selection.setActiveEdge(id || null)
  }

  public toggleEditConnection = (): void => {
    if (this.editting) {
      this.disableEditMode()
    } else {
      this.editting = true
      this._network.editEdgeMode()
    }
  }

  public toggleCreateConnection = (): void => {
    if (this.addingEdge) {
      this.disableEditMode()
    } else {
      this.addingEdge = true
      this._network.addEdgeMode()
    }
  }

  public disableEditMode = (): void => {
    this.addingEdge = false
    this.editting = false
    this._network.disableEditMode()
  }
}

decorate(NetworkStore, {
  _network: [observable],
  editting: [observable],
  addingEdge: [observable],
  init: [action],
  deselectAll: [action],
  toggleEditConnection: [action],
  toggleCreateConnection: [action],
  disableEditMode: [action]
})
