import React from 'react'

export default function graph(props) {
 
  const renderNodes = props.nodes.map(item => {
    var selected = false;
    if(props.selected == item) {
      selected = true
    }
    return (
      <div className={`node node-${item} ${selected ? "selected" : ""}`}>{item}</div>
    )
  })

  return (
    <div className="graph-container">
      {renderNodes} 
    </div>
  )
}
 