import * as React from 'react'

import { observer } from 'mobx-react'
import GraphVisWrapper from './components/graph'
import { getStores } from './stores'
import { Edge, ID, Node, VisjsGraph } from './types'

import { deleteActiveElement, setActionHandlers } from './actions'
import Sidebar from './components/sidebar'
import { initKeyListeners } from './keys'
import { NodeWithConnections } from './types/inputs'
import * as visjsControl from './visjs-control'

export interface ActionHandlers {
  addEdge: (edge: Edge) => Promise<Edge | null>
  addNode: <T = {}>() => Promise<(T & Partial<Node>) | null>
  updateNode: (id: ID, updates: Partial<Node>) => Promise<Partial<Node> | null>
  updateEdge: (id: ID, updates: Partial<Edge>) => Promise<Partial<Edge> | null>
  deleteNode: (id: ID) => Promise<boolean | null>
  deleteEdge: (id: ID) => Promise<boolean | null>
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
      const { graph } = getStores()
      const { initialState, actionHandlers } = this.props

      graph.initData(initialState)
      setActionHandlers(actionHandlers)

      initKeyListeners({
        e: () => visjsControl.toggleEditConnection(),
        c: () => visjsControl.toggleCreateEdge(),
        Escape: () => visjsControl.cancelEverything(),
        Delete: deleteActiveElement,
        Backspace: deleteActiveElement
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
