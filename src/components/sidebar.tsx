import * as React from 'react'

import { observer } from 'mobx-react'

import { handleNodeDelete, handleNodeUpdate } from '../actions'
import { getStores } from '../stores'
import Instructions from './instructions'
import NodeEditor from './node-editor'

// TODO: find better type guard method than 'as any'
const Sidebar: React.SFC = observer(() => {
  const { activeElement, setActiveElement } = getStores().selection

  const editor =
    activeElement && !(activeElement as any).from ? (
      <NodeEditor
        key={activeElement.id}
        node={activeElement}
        update={node => handleNodeUpdate(activeElement.id, node)}
        delete={() => handleNodeDelete(activeElement.id)}
        cancel={() => setActiveElement(null)}
      />
    ) : null
  return (
    <div className="graphEditor-sidebar">
      <Instructions />
      {editor}
    </div>
  )
})

export default Sidebar
