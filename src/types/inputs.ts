import { ID, Node, UserExtendedData } from '.'

export interface Connections {
  connections: ID[]
}

export type NodeWithConnections<T extends UserExtendedData = {}> = Node<T> &
  Connections
