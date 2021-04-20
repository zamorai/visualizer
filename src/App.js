import React, { useEffect, useState } from 'react';
import Graph from './graph';
import Header from './header';

const nodes = [1,2,3,4,5,6,7,8];
const connections = [[3,5],[3,4],[8,6],[8,7],[4,6],[7,5],[6,7],[4,5],[7,1],[2,6],[2,4],[5,1]]

export default function App() {
  const[selected, setSelected] = useState(1);
  const[weights, setWeights] = useState([12,56,3,34,54,6,890,12,32,4,5,65])
  const[graph, setGraph] = useState({})

  const buildGraph = () => {
    var newGraph = {}
    var node1, node2, weight;
    for(var i = 0; i < 12; i++) {
      node1 = connections[i][0]
      node2 = connections[i][1]
      weight = weights[i]
      
      addEdge(node1, node2, weight)
    }
    
    function addEdge(node1, node2, value) {
      if(node1 in newGraph) {
        newGraph[node1].push([node2, value])
      } else {
        newGraph[node1] = [[node2, value]]
      }
      if(node2 in newGraph) {
        newGraph[node2].push([node1, value])
      } else {
        newGraph[node2] = [[node1, value]]
      }
    }
    setGraph(newGraph)
  }

  const randomSelect = () => {
    //setSelected(Math.floor(Math.random()*10%8+1)) 
    var tempWeights = []
    for(var i = 0; i < weights.length; i++) {
      tempWeights.push(Math.floor(Math.random()*50 + 1))
    }
    setWeights(tempWeights)
    buildGraph()
  }

  return (
    <div className="container">

      <Header random={randomSelect} />

      <section className="body">
        <Graph weights={weights} nodes={nodes} selected={selected} />
      </section>

    </div>
  )
}
