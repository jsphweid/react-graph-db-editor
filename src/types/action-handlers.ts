import { Edge, ID, Node, UserExtendedData } from '.'

// NODES

export type AddNodeHandler<
  T extends UserExtendedData = {}
> = () => Promise<Node<T> | null>

export type UpdateNodeHandler = (
  id: ID,
  updates: Partial<Node>
) => Promise<Partial<Node> | null>

export type DeleteNodeHandler = (id: ID) => Promise<boolean | null>

// EDGES

export type AddEdgeHandler = (edge: Edge) => Promise<Edge | null>

export type UpdateEdgeHandler = (
  id: ID,
  updates: Partial<Edge>
) => Promise<Partial<Edge> | null>

export type DeleteEdgeHandler = (id: ID) => Promise<boolean | null>
