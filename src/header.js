import React from 'react'

export default function header(props) {
  return (
    <header className="header">
      <div className="logo">
        Visualizer
      </div> 
      <div className="options">
        <select name='algorithms'>
          <option value="djikstra">Djikstra's Algorithm</option>
          <option value="prim">Prim's Algorithm</option>
          <option value="bellman">Bellman-Ford Algorithm</option>
        </select>
      </div>
      <div>
        <button onClick={props.random}  className="btn-visualize">New Graph</button>
      </div>
      <div className="visualize"> 
        <button className="btn-visualize">Visualize!</button>
      </div>
  
    </header>
  )
}
