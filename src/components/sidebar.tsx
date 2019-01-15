import * as React from 'react'

import { observer } from 'mobx-react'

import { handleNodeDelete, handleNodeUpdate } from '../actions'
import { getStores } from '../stores'
import Instructions from './instructions'
import NodeEditor from './node-editor'

const Sidebar: React.SFC = observer(() => {
  const { selection } = getStores()
  const content = selection.activeNode ? (
    <NodeEditor
      key={selection.activeNode.id}
      node={selection.activeNode}
      update={node => handleNodeUpdate(node.id, node)}
      delete={id => handleNodeDelete(id)}
      cancel={() => selection.clearActiveElement()}
    />
  ) : null
  return (
    <div className="graphEditor-sidebar">
      <Instructions />
      {content}
    </div>
  )
})

export default Sidebar
