import { VisjsEdge, VisjsNode } from './visjs'

interface CanLoad {
  isPending?: boolean
}

export interface Edge extends VisjsEdge, CanLoad {}
export interface BaseNode extends VisjsNode, CanLoad {}

export interface UserExtendedData {
  [key: string]: string | number | string[] | number[] | undefined
}

export type Node<T extends UserExtendedData = {}> = BaseNode & T

export const baseNodeKeys = [
  'id',
  'label',
  'color',
  'x',
  'y',
  'isPending',
  'connections'
]

export interface NodeMap {
  [key: string]: Node
}
export interface EdgeMap {
  [key: string]: Edge
}
