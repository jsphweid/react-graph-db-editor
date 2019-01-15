import * as React from 'react'

const Instructions: React.SFC = () => {
  return (
    <div className="tagEditor-sidebar-instructions">
      <h3>Instructions</h3>
      <ul>
        <li>
          <strong>making a new tag:</strong> double click the graph area to
          spawn a new tag and then edit it
        </li>
        <li>
          <strong>editing / deleting a tag:</strong> click on the tag then use
          the editor on this navbar to change its properties and save
        </li>
        <li>
          <strong>making new connections:</strong> hit 'c' while being active in
          the graph
        </li>
        <li>
          <strong>editing connections:</strong> click on a connection and hit
          'e'
        </li>
      </ul>
    </div>
  )
}

export default Instructions
