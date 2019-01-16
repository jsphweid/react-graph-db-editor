import { action, computed, decorate, observable } from 'mobx'
import { getStores } from '.'
import { Edge, ID, Node } from '../types'

export default class SelectionStore {
  // observables
  public _activeElementId: ID | null = null
  private lastTimeActiveElementSet = 0

  // computed
  public get activeElement(): Node | Edge | null {
    if (!this._activeElementId) return null
    const { getNode, getEdge } = getStores().graph
    return getNode(this._activeElementId) || getEdge(this._activeElementId)
  }

  // actions
  public setActiveElement = (id: string | null): void => {
    const now = Date.now()
    if (now - this.lastTimeActiveElementSet < 100) {
      return
    }
    if (id) {
      this.lastTimeActiveElementSet = now
    }
    this._activeElementId = id
  }
}

decorate(SelectionStore, {
  _activeElementId: [observable],
  activeElement: [computed],
  setActiveElement: [action]
})
