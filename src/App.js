import React, { useState } from 'react';
import Graph from './graph';
import Header from './header';

const nodes = [1,2,3,4,5,6,7,8];

export default function App() {
  const[selected, setSelected] = useState(1);
  const[weights, setWeights] = useState([12,56,3,34,54,6,890,12,32,4,5,65])

  console.log(weights)
  
  const randomSelect = () => {
    //setSelected(Math.floor(Math.random()*10%8+1)) 
    var tempWeights = []
    for(var i = 0; i < weights.length; i++) {
      tempWeights.push(Math.floor(Math.random()*50 + 1))
    }

    setWeights(tempWeights)
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
