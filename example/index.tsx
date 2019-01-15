import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { actionHandlers } from './action-handlers'
import { stateAsNodesWithEdges } from './fake-state'

import GraphEditor from '../src'

class Example extends React.Component {
  public render() {
    return (
      <GraphEditor
        actionHandlers={actionHandlers}
        initialState={stateAsNodesWithEdges}
      />
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('root'))
