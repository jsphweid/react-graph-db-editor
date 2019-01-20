import { Edge, ID, Node, UserExtendedData } from '.'

// NODES

export type AddNodeHandler<
  T extends UserExtendedData = {}
> = () => Promise<Node<T> | null>

export type UpdateNodeHandler<T extends UserExtendedData = {}> = (
  id: ID,
  updates: Partial<Node<T>>
) => Promise<Partial<Node<T>> | null>

export type DeleteNodeHandler = (id: ID) => Promise<boolean | null>

// EDGES

export type AddEdgeHandler = (
  edge: Edge,
  existingConnections: Edge[]
) => Promise<Edge | null>

export type UpdateEdgeHandler = (
  id: ID,
  newEdge: Edge,
  oldEdge: Edge,
  existingConnections: Edge[]
) => Promise<Edge | null>

export type DeleteEdgeHandler = (
  edge: Edge,
  existingConnections: Edge[]
) => Promise<boolean | null>
