import * as React from 'react'
import TagsInput from 'react-tagsinput'

import { baseNodeKeys, Node } from '../types'
import { isStringOrNumber } from '../utils'

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

  private renderArrayEditor = (key: string): JSX.Element => {
    const values = (this.state.node as any)[key]
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>
          <TagsInput
            value={values}
            onChange={v => this.updateNodeProperties({ [key]: v })}
          />
        </td>
      </tr>
    )
  }

  private renderBasicEditor = (key: string) => {
    return (
      <tr key={key}>
        <td>{key}:</td>
        <td>
          <input
            value={(this.state.node as any)[key]}
            onChange={(e: any) =>
              this.updateNodeProperties({ [key]: e.currentTarget.value })
            }
          />
        </td>
      </tr>
    )
  }

  private renderCustomPropertiesEditors = (): Array<JSX.Element | null> => {
    const customProperties = Object.keys(this.state.node).filter(
      key => !baseNodeKeys.includes(key)
    )

    const content = customProperties.map(property => {
      if (!isStringOrNumber(property)) return null

      const value = (this.state.node as any)[property]
      if (Array.isArray(value) && value.every(isStringOrNumber)) {
        return this.renderArrayEditor(property)
      } else if (isStringOrNumber(value)) {
        return this.renderBasicEditor(property)
      } else {
        return null
      }
    })

    return content
  }

  private renderTable = () => (
    <div>
      <table>
        <tbody>
          {this.renderBasicEditor('label')}
          {this.renderCustomPropertiesEditors()}
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
