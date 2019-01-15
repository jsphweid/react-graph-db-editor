import { action, computed, decorate, observable } from 'mobx'
import { getStores } from '.'
import { Edge, ID, Node } from '../types'

export default class SelectionStore {
  // observables
  public _activeNodeId: ID | null = null
  public _activeEdgeId: ID | null = null

  // computed
  public get activeNode(): Node | null {
    return this._activeNodeId
      ? getStores().graph.getNode(this._activeNodeId)
      : null
  }

  public get activeEdge(): Edge | null {
    return this._activeEdgeId
      ? getStores().graph.getEdge(this._activeEdgeId)
      : null
  }

  // actions
  public setActiveNode = (id: string | null): void => {
    this._activeNodeId = id
  }

  public setActiveEdge = (id: string | null): void => {
    this._activeEdgeId = id
  }

  public clearActiveNode = (): void => {
    this._activeNodeId = null
  }

  public clearActiveElement = (): void => {
    this._activeNodeId = null
    this._activeEdgeId = null
  }
}

decorate(SelectionStore, {
  _activeNodeId: [observable],
  _activeEdgeId: [observable],
  activeNode: [computed],
  activeEdge: [computed],
  setActiveNode: [action],
  clearActiveNode: [action],
  clearActiveElement: [action]
})
