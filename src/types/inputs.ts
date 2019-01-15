import { ID, VisjsNode } from '.'

export interface NodeWithConnections extends VisjsNode {
  connections: ID[]
}
