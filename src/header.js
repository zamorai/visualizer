import React from 'react'

export default function header(props) {
  return (
    <header className="header">
      <div className="logo">
        Visualizer
      </div> 
      <div className="options">
        <select onChange={ e => props.changeAlgorithm(e.target.value)} name='algorithms'>
          <option value="djikstra">Djikstra's Algorithm</option>
          <option value="prim">Prim's Algorithm</option>
          <option value="kruskal">Kruskal's Algorithm</option>
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
        </select>
      </div>
      <div>
        <button onClick={() => props.random()}  className="btn-visualize">New Graph</button>
      </div>
      <div className="visualize"> 
        <button onClick={() => props.visualize(props.graph)} className="btn-visualize">Visualize!</button>
      </div>
  
    </header>
  )
}
 