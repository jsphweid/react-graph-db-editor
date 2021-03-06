import { observable } from 'mobx'
import GraphStore from './graph'
import SelectionStore from './selection'

let stores = initialize()

function initialize() {
  const graph = new GraphStore()
  const selection = new SelectionStore()

  return observable({
    graph,
    selection
  })
}

export function getStores(): StoresType {
  return stores
}

export function reinitializeStores(): StoresType {
  stores = initialize()
  return stores
}

export const initializeReturnType = returnType(initialize)
export type StoresType = typeof initializeReturnType

function returnType<T>(fn: () => T) {
  if (typeof fn === 'string') {
    ;(fn as any)()
  }
  return {} as T
}
