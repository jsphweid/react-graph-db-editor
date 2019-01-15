import * as React from 'react'

import { observer } from 'mobx-react'
import { getStores } from '../stores'
const GraphVis = require('react-graph-vis').default
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
  const { visjsInterface, graph } = getStores()

  return (
    <div className="tagEditor-graph">
      <GraphVis
        graph={graph.graphState}
        options={options}
        events={GraphEvents.userEvents}
        getNetwork={(network: any) => visjsInterface.init(network)}
      />
    </div>
  )
})

export default GraphVisWrapper
