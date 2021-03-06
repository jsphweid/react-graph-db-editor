import { action, computed, decorate, observable } from 'mobx'
import { defaultNodeColor } from '../constants'
import { Edge, EdgeMap, ID, Node, NodeMap, VisjsGraph } from '../types'
import { NodeWithConnections } from '../types/inputs'
import { makeEdge, makeRGBAText } from '../utils'

/*
 * Unfortunately, it seems that without using '@' decorators (I gave up trying to
 * get that to work for now), I don't think it is possible to decorate private
 * methods as the decorator method outside the class. So I reverted to _varName.
 */
export default class GraphStore {
  // observables
  public _nodeMap: NodeMap = {}
  public _edgeMap: EdgeMap = {}

  // computed

  public get graphState(): VisjsGraph {
    return {
      nodes: Object.values(this._nodeMap).map(node => ({
        ...node,
        color: makeRGBAText(defaultNodeColor, node.isPending ? 0.1 : 1)
      })),
      edges: Object.values(this._edgeMap).map(edge => ({
        ...edge,
        dashes: edge.isPending
      }))
    }
  }

  public initData = (graph: VisjsGraph | NodeWithConnections[]): void => {
    const nodeMap: NodeMap = {}
    const edgeMap: EdgeMap = {}
    if (Array.isArray(graph)) {
      graph.forEach(node => {
        nodeMap[node.id] = node
        node.connections
          .map(c => makeEdge(node.id, c))
          .forEach(e => (edgeMap[e.id] = e))
      })
    } else {
      const { nodes, edges } = graph
      nodes.forEach(node => (nodeMap[node.id] = { ...node }))
      edges
        .map(edge => makeEdge(edge.from, edge.to))
        .forEach(edge => (edgeMap[edge.id] = edge))
    }
    this._nodeMap = nodeMap
    this._edgeMap = edgeMap
  }

  public getEdge = (id: ID): Edge => {
    return this._edgeMap[id]
  }
  public getRelatedEdges = (id: ID): Edge[] => {
    return Object.values(this._edgeMap).filter(edge => edge.from === id)
  }
  public addEdge = (edge: Edge): void => {
    this._edgeMap[edge.id] = edge
  }
  public updateEdge = (id: ID, updates: Partial<Edge>): void => {
    this._edgeMap[id] = { ...this._edgeMap[id], ...updates }
  }
  public deleteEdge = (id: ID): void => {
    delete this._edgeMap[id]
  }

  public getNode = (id: ID): Node => {
    return this._nodeMap[id]
  }
  public deleteNode = (id: ID): void => {
    delete this._nodeMap[id]
  }
  public addNode = (partialNode: Partial<Node>): ID => {
    const tempId = Date.now() // temp, use better random system
    const node = { ...partialNode, id: tempId }
    this._nodeMap[tempId] = node
    return tempId
  }
  public updateNode = (id: ID, updates: Partial<Node>): void => {
    this._nodeMap[id] = { ...this._nodeMap[id], ...updates }
    if (updates.id && id !== updates.id) {
      this._nodeMap[updates.id] = { ...this._nodeMap[id] }
      this.deleteNode(id)
    }
  }
}

// do this in a singular transaction? (combine graph and api-interface)
// i dont like how multiple updates can be called from anywhere

decorate(GraphStore, {
  _nodeMap: [observable],
  _edgeMap: [observable],
  addEdge: [action],
  getNode: [action],
  graphState: [computed]
})
