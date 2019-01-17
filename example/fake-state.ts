import { NodeWithConnections } from '../src/types/inputs'
import { MyCustomAttributes } from './custom'

export const stateAsNodesWithEdges: Array<
  NodeWithConnections<MyCustomAttributes>
> = [
  {
    id: 123,
    label: 'hi',
    connections: ['234'],
    aliases: ['other name', 'another']
  },
  {
    id: 234,
    connections: [],
    custom: 'some random attribute',
    aliases: []
  }
]
