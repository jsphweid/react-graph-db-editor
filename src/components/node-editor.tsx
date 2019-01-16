import * as React from 'react'

import { Node } from '../types'

interface NodeEditorProps {
  node: Node
  update: (node: Node) => void
  delete: () => void
  cancel: () => void
}

interface NodeEditorState {
  node: Node
}

export default class NodeEditor extends React.Component<
  NodeEditorProps,
  NodeEditorState
> {
  constructor(props: NodeEditorProps) {
    super(props)
    this.state = {
      node: { ...this.props.node }
    }
  }

  private handleUpdateClick = () => {
    this.props.update(this.state.node)
  }

  private updateNodeProperties = (updates: Partial<Node>) => {
    this.setState({ node: { ...this.state.node, ...updates } })
  }

  private renderTable = () => (
    <div>
      <table>
        <tbody>
          <tr>
            <td>label:</td>
            <td>
              <input
                value={this.state.node.label}
                onChange={(e: any) =>
                  this.updateNodeProperties({ label: e.currentTarget.value })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="nodeEditor-nodeEditor-buttons">
        <button
          disabled={
            JSON.stringify(this.state.node) === JSON.stringify(this.props.node)
          }
          onClick={this.handleUpdateClick}
        >
          save
        </button>
        <button onClick={this.props.cancel}>cancel</button>
        <button onClick={this.props.delete}>delete</button>
      </div>
    </div>
  )

  public render() {
    return <div className="nodeEditor-nodeEditor">{this.renderTable()}</div>
  }
}
