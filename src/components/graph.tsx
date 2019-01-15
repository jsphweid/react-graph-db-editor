import * as React from 'react'

import { observer } from 'mobx-react'
import { getStores } from '../stores'
const GraphVis = require('react-graph-vis').default
import { initVisjsControl } from '../visjs-control'
import * as GraphEvents from './graphEvents'

const options = {
  edges: {
    color: '#000000'
  },
  manipulation: {
    ...GraphEvents.manipulationEvents
  }
}

const GraphVisWrapper: React.SFC = observer(() => {
  const { graph } = getStores()

  return (
    <div className="tagEditor-graph">
      <GraphVis
        graph={graph.graphState}
        options={options}
        events={GraphEvents.userEvents}
        getNetwork={(network: any) => initVisjsControl(network)}
      />
    </div>
  )
})

export default GraphVisWrapper
