import { VisjsEdge, VisjsNode } from './visjs'

interface CanLoad {
  isPending?: boolean
}

export interface Edge extends VisjsEdge, CanLoad {}
export interface Node extends VisjsNode, CanLoad {}

export interface NodeMap {
  [key: string]: Node
}
export interface EdgeMap {
  [key: string]: Edge
}
