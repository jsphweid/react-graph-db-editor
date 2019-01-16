import { VisjsGraph } from '../src/types'
import { NodeWithConnections } from '../src/types/inputs'

export const stateAsGraph: VisjsGraph = {
  nodes: [{ id: 123, label: 'hi' }, { id: 234 }],
  edges: []
}

export const stateAsNodesWithEdges: NodeWithConnections[] = [
  { id: 123, label: 'hi', connections: ['234'] },
  { id: 234, connections: [] }
]
