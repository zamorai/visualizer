import React from 'react'

export default function App() {
  return (
    <div className="container">

      <header className="header">
        <div className="logo">
          Visualizer
        </div> 
        <div className="visualize">
          <button className="btn-visualize">Visualize!</button>
        </div>
        <div className="options">
          <select name='algorithms'>
            <option value="djikstra">Djikstra's Algorithm</option>
            <option value="prim">Prim's Algorithm</option>
            <option value="bellman">Bellman-Ford Algorithm</option>
          </select>
        </div>
      </header>

      <section className="body">
        Visualize Algorithm Here!
      </section>

    </div>
  )
}
