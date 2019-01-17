import { Edge, ID } from './types'

export function makeEdge(fromId: ID, toId: ID, isPending = false): Edge {
  return {
    id: `${fromId}___${toId}`,
    from: fromId,
    to: toId,
    isPending
  }
}

// export function parseEdgeId(edgeId: string): { fromId: ID; toId: ID } {
//   const ids = edgeId.split('___')
//   return { fromId: ids[0], toId: ids[1] }
// }

// export function makeEdgesFromNodesWithConnections(nodes: Node[]): VisjsEdge[] {
//   const edges = nodes.map(node => node.edges.map(e => makeEdge(node.id, e)))
//   return ([] as VisjsEdge[]).concat(...edges)
// }

function hexToRGB(hexColor: string) {
  try {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)
    if (!result) throw new Error(`Could not convert ${hexColor} to RGB.`)
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
  } catch (e) {
    console.log(e)
    return { r: 50, g: 50, b: 50 }
  }
}

export function makeRGBAText(hex: string, alpha: number = 1): string {
  const { r, g, b } = hexToRGB(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function timeoutPromise(millis: number): Promise<void> {
  return new Promise(resolve => setTimeout(() => resolve(), millis))
}

export const isStringOrNumber = (item: any): item is string | number =>
  typeof item === 'string' || typeof item === 'number'
