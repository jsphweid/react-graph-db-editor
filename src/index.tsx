import * as React from 'react'

import { observer } from 'mobx-react'
import GraphVisWrapper from './components/graph'
import { getStores } from './stores'
import { ActionHandlerTypes, NodeWithConnections, VisjsGraph } from './types'

import { deleteActiveElement, setActionHandlers } from './actions'
import Sidebar from './components/sidebar'
import { initKeyListeners } from './keys'
import * as visjsControl from './visjs-control'

export { ActionHandlerTypes, NodeWithConnections, VisjsGraph }

export interface ActionHandlers {
  addEdge: ActionHandlerTypes.AddEdgeHandler
  addNode: ActionHandlerTypes.AddNodeHandler
  updateNode: ActionHandlerTypes.UpdateNodeHandler
  updateEdge: ActionHandlerTypes.UpdateEdgeHandler
  deleteNode: ActionHandlerTypes.DeleteNodeHandler
  deleteEdge: ActionHandlerTypes.DeleteEdgeHandler
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

    public componentWillReceiveProps(nextProps: AppProps) {
      if (JSON.stringify(nextProps.initialState !== this.props.initialState)) {
        getStores().graph.initData(nextProps.initialState)
      }
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
