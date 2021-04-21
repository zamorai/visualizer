import React, { useEffect, useState } from 'react';
import Graph from './graph';
import Header from './header';

const nodes = [1,2,3,4,5,6,7,8];
const connections = [[3,5],[3,4],[8,6],[8,7],[4,6],[7,5],[6,7],[4,5],[7,1],[2,6],[2,4],[5,1]]

export default function App() {
  const[selected, setSelected] = useState(0);
  const[weightSelected, setWeightSelected] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const[weights, setWeights] = useState([12,56,3,34,54,6,890,14,32,4,5,65])
  const[graph, setGraph] = useState({})
  const[algorithm, setAlgorithm] = useState("djikstra")
  const[completed, setCompleted] = useState([0,0,0,0,0,0,0,0,0,0,0,0])

  useEffect(() => {
    //console.log(weights)
    buildGraph()
  }, [weights])

  useEffect(() => {
    setWeightSelected([[0,0,0,0,0,0,0,0,0,0,0,0]])
    setCompleted([0,0,0,0,0,0,0,0,0,0,0,0])
  }, [algorithm])


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
      var randNum = Math.floor(Math.random()*50 + 1)
      while(tempWeights.includes(randNum)) {
        randNum = Math.floor(Math.random()*50 + 1)
        console.log("WE AVERTED CHAOS!")
      }
      tempWeights.push(randNum)
    }
    setWeights(tempWeights)
    setWeightSelected([0,0,0,0,0,0,0,0,0,0,0,0])
    setCompleted([0,0,0,0,0,0,0,0,0,0,0,0])
  }

  // ----------- ALGORITHMS ------------ //

  const traverseBFS = async (graph) => {
    let start = 1
    let end = 2
  
    var q = [[start, []]];
    var visited = new Set();
    visited.add(start) 
    var arr = [0,0,0,0,0,0,0,0,0,0,0,0]
    var complete = [0,0,0,0,0,0,0,0,0,0,0,0]
    while(q.length > 0) {
      var len = q.length
      var node, path;
      for(var i = 0; i < len; i++) {
        [node, path] = q.shift()
        setSelected(node)
        //console.log(path) 
        if(node == end) {
          for(var item of path) {
            complete[weights.indexOf(item)] = 1
          } 
          setCompleted(complete)
          console.log(path)
          break;
        }

        for(var nei of graph[node]) {
          if(!visited.has(nei[0])) {
            arr[weights.indexOf(nei[1])] = 1
            setWeightSelected(arr)
            visited.add(nei[0])
            q.push([nei[0], [...path, nei[1]]])
          }
        }
      await sleep(1000);
      }
    }
    return; 
  }

  const djikstra = async (graph) => {
    // complete this algorithm
  }

  const prim = async (graph) => {
    // complete this algorithm
  }

  const bellman = async (graph) => {
    // complete this algorithm
  }

  const traverseDFS = async (graph) => {
    let start = 1
    let end = 2
  
    var stack = [[start, []]];
    var visited = new Set();
    visited.add(start) 
    var arr = [0,0,0,0,0,0,0,0,0,0,0,0]
    var complete = [0,0,0,0,0,0,0,0,0,0,0,0]
    while(stack.length > 0) {
      var len = stack.length
      var node, path;
      for(var i = 0; i < len; i++) {
        [node, path] = stack.pop()
        setSelected(node)
        //console.log(path) 
        if(node == end) {
          for(var item of path) {
            complete[weights.indexOf(item)] = 1
          } 
          setCompleted(complete)
          console.log(path)
          break;
        }

        for(var nei of graph[node]) {
          if(!visited.has(nei[0])) {
            arr[weights.indexOf(nei[1])] = 1
            setWeightSelected(arr)
            visited.add(nei[0])
            stack.push([nei[0], [...path, nei[1]]])
          }
        }
      await sleep(1000);
      }
    }
    return; 
  }

  // ----------- ALGORITHMS ------------ //

  const visualize = (grph) => {
    console.log("running " + algorithm)
    switch(algorithm) {
      case "bfs":
        traverseBFS(grph)
        break;
      case "djikstra":
        djikstra(grph)
        break;
      case "prim":
        prim(grph)
        break;
      case "bellman":
        bellman(grph)
        break;
      case "dfs":
        traverseDFS(grph)
        break;
    }
  }

  return (
    <div className="container">

      <Header changeAlgorithm={setAlgorithm} graph={graph} visualize={visualize} random={randomSelect} />

      <section className="body">
        <Graph completed={completed} weightSelected={weightSelected} weights={weights} nodes={nodes} selected={selected} />
      </section>

    </div>
  )
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


