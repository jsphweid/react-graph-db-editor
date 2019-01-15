import { ID } from '.'

export interface VisjsNode {
  id: ID
  label?: string
  color?: string
  x?: number
  y?: number
}

export interface VisjsEdge {
  id: string
  from: ID
  to: ID
  dashes?: boolean
}

export interface VisjsGraph {
  nodes: VisjsNode[]
  edges: VisjsEdge[]
}
