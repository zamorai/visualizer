import React, { useEffect, useState } from 'react';
import Graph from './Graph';
import Header from './Header';
 
const INF = 9999999
const nodes = [1,2,3,4,5,6,7,8];
const connections = [[3,5],[3,4],[8,6],[8,7],[4,6],[7,5],[6,7],[4,5],[7,1],[2,6],[2,4],[5,1]]

export default function App() {
  const[selected, setSelected] = useState(0);
  const[weightSelected, setWeightSelected] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const[completed, setCompleted] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const[weights, setWeights] = useState([12,56,3,34,54,6,890,14,32,4,5,65])
  const[graph, setGraph] = useState({})
  const[algorithm, setAlgorithm] = useState("djikstra")
  const[startNode, setStartNode] = useState(1);
  const[endNode, setEndNode] = useState(2);


  useEffect(() => {
    //console.log(weights)
    buildGraph()
  }, [weights])

  useEffect(() => {
    console.log(graph)
  }, [graph])

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
    let start = startNode
    let end = endNode
  
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
          return;
        }

        for(var nei of graph[node]) {
          if(!visited.has(nei[0])) {
            arr[weights.indexOf(nei[1])] = 1
            setWeightSelected(arr)
            visited.add(nei[0])
            q.push([nei[0], [...path, nei[1]]])
          }
        }
      await sleep(500);
      }
    }
    return; 
  }

  const djikstra = async (graph) => {
    var s = startNode;
    var solution = {};
    solution[s] = [];
    solution[s].dist = 0;
  
    while(true) {
      var parent = null;
      var nearest = null;
      var distance = INF;
    
      // For each existing solution
      for(var n in solution) {
        if(!solution[n]){
          continue;
        }

        var ndist = solution[n].dist;
        var adj = graph[n];
        // For each of its adjacent vertices
        for(var a in adj) {
          // Without a solution
          if(solution[adj[a][0]]){
            continue;
          }

          // Choose nearest vertex with the lowest "total" cost
          var dv = adj[a][1] + ndist;
          if(dv < distance) {
            // Reference parent
            parent = solution[n];
            nearest = adj[a][0];
            distance = dv;
          }
        }
      }
    
      // No more solutions
      if(distance === INF) {
        break;
      }
    
      // Extend parent's solution path
      solution[nearest] = parent.concat(nearest);
      // Extend parent's cost
      solution[nearest].dist = distance;
    }

    var arr;
    var x;
    for(var i in solution) {
      arr = [0,0,0,0,0,0,0,0,0,0,0,0];
      if(!solution[i]) {
        continue;
      }
      setSelected(i);
      x = s;
    
      for(var j of solution[i]){
        for(var k in connections){
          if((j === connections[k][0] || j === connections[k][1]) && (x === connections[k][0] || x === connections[k][1])){
            arr[k] = 1
            console.log(arr)
          }
        }
        x = j;
      }
      
      setWeightSelected(arr);
    
    
      console.log(" -> " + i + ": [" + solution[i].join(", ") + "]   (dist:" + solution[i].dist + ")");
      await sleep(1000);
    }
    
    return;
  }

  const prim = async (graph) => {
    // starting node
    var start = startNode

    var arr = [0,0,0,0,0,0,0,0,0,0,0,0]
    var complete = [0,0,0,0,0,0,0,0,0,0,0,0]
    var allMin = []

    var q = [[start, [start]]]
    var visited = new Set()
    visited.add(start)

    while(q.length > 0) {
      var len = q.length
      var node, path;
      for(var i = 0; i < len; i++) {
        [node, path] = q.shift()
        setSelected(node)
        console.log(path)
        if(path.length == 8) {
          console.log("Prim's Complete!")
          for(var item of allMin) {
            complete[weights.indexOf(item)] = 1
          } 
          setCompleted(complete)
          setWeightSelected([0,0,0,0,0,0,0,0,0,0,0,0])
          setSelected(0)
          break;
        }

        var min = [999,999];

        for(var newNode of path) {
          for(var nei of graph[newNode]) {
            if(!visited.has(nei[0])) {
              arr[weights.indexOf(nei[1])] = 1
              setWeightSelected(arr)
              if(nei[1] < min[1]) {
                min = [nei[0],nei[1]]
              }
            }
          }
        }
        allMin.push(min[1]) 
        visited.add(min[0])
        q.push([min[0], [...path, min[0]]])
      }
      await sleep(1000) 
    }
    return;
  }

  const kruskal = async (graph) => {
    // complete this algorithm
  }

  const traverseDFS = async (graph) => {
    let start = startNode
    let end = endNode
  
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
          return;
        }

        for(var nei of graph[node]) {
          if(!visited.has(nei[0])) {
            arr[weights.indexOf(nei[1])] = 1
            setWeightSelected(arr)
            visited.add(nei[0])
            stack.push([nei[0], [...path, nei[1]]])
          }
        }
      await sleep(500);
      }
    }
    return; 
  }

  // ----------- ALGORITHMS ------------ //

  const visualize = (grph) => {
    console.log("running " + algorithm)
    setCompleted([0,0,0,0,0,0,0,0,0,0,0,0])
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
      case "kruskal":
        kruskal(grph)
        break;
      case "dfs":
        traverseDFS(grph)
        break;
    }
  }

  return (
    <div className="container">

      <Header setStartNode={setStartNode} setEndNode={setEndNode} changeAlgorithm={setAlgorithm} graph={graph} visualize={visualize} random={randomSelect} />

      <section className="body">
        <Graph completed={completed} weightSelected={weightSelected} weights={weights} nodes={nodes} selected={selected} />
      </section>

    </div>
  )
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


