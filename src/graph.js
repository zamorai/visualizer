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

  const renderWeights = props.weights.map((item, index) => {
    var selected = false;
    if(props.weightSelected[index] == 1) {
      selected = true;
    }
    return (
      <div className={`connection connection-${index+1} ${selected ? "selected" : ""}`}><span className={`connection-text connection_text-${index + 1}`}>{item}</span></div>
    )
  })

  return (
    <div className="graph-container">
      {renderNodes} 
      {renderWeights} 
    </div>  
  ) 
}
 