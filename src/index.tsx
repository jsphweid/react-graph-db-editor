import * as React from 'react'

import { observer } from 'mobx-react'
import GraphVisWrapper from './components/graph'
import { getStores } from './stores'
import { Edge, ID, Node, VisjsGraph } from './types'

import { setActionHandlers } from './actions'
import Sidebar from './components/sidebar'
import { initKeyListeners } from './keys'
import { NodeWithConnections } from './types/inputs'

export interface ActionHandlers {
  addEdge: () => Promise<Partial<Edge> | null>
  addNode: () => Promise<Partial<Node> | null>
  updateNode: (id: ID, updates: Partial<Node>) => Promise<Partial<Node> | null>
  deleteNode: (id: ID) => Promise<boolean | null>
}

export interface AppProps {
  actionHandlers: ActionHandlers
  initialState: VisjsGraph | NodeWithConnections[]
}

const App = observer(
  class App extends React.Component<AppProps, any> {
    constructor(props: AppProps) {
      super(props)
    }

    public componentDidMount() {
      const { visjsInterface, graph, selection } = getStores()
      const { initialState, actionHandlers } = this.props

      graph.initData(initialState)
      setActionHandlers(actionHandlers)

      initKeyListeners({
        e: () => visjsInterface.toggleEditConnection(),
        c: () => visjsInterface.toggleCreateConnection(),
        Escape: () => {
          visjsInterface.selectNode()
          visjsInterface.disableEditMode()
        },
        Delete: () => selection.clearActiveElement(),
        Backspace: () => selection.clearActiveElement()
      })
    }

    public render() {
      return (
        <div>
          <Sidebar />
          <GraphVisWrapper />
        </div>
      )
    }
  }
)

export default App
