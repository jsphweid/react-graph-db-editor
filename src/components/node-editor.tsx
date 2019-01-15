import * as React from 'react'

import { ID, Node } from '../types'

interface NodeEditorProps {
  node: Node
  update: (node: Node) => void
  delete: (id: ID) => void
  cancel: () => void
}

interface NodeEditorState {
  node: Node
  deleteConfirmation: boolean
}

export default class NodeEditor extends React.Component<
  NodeEditorProps,
  NodeEditorState
> {
  constructor(props: NodeEditorProps) {
    super(props)
    this.state = {
      node: { ...this.props.node },
      deleteConfirmation: false
    }
  }

  private handleUpdateClick = () => {
    this.props.update(this.state.node)
  }

  private updateNodeProperties = (updates: Partial<Node>) => {
    this.setState({ node: { ...this.state.node, ...updates } })
  }

  private renderDeleteConfirmation = () => (
    <div>
      <p>
        Deleting this will delete this node and all of it's relationships
        forever. Are you sure?
      </p>
      <button onClick={() => this.props.delete(this.state.node.id)}>
        delete
      </button>
      <button onClick={() => this.setState({ deleteConfirmation: false })}>
        nevermind
      </button>
    </div>
  )

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
        <button onClick={() => this.setState({ deleteConfirmation: true })}>
          delete
        </button>
      </div>
    </div>
  )

  public render() {
    const content = this.state.deleteConfirmation
      ? this.renderDeleteConfirmation()
      : this.renderTable()

    return <div className="nodeEditor-nodeEditor">{content}</div>
  }
}
