import React, { useState } from 'react';
import Graph from './graph';
import Header from './header';

const nodes = [1,2,3,4,5,6,7,8];

export default function App() {
  const[selected, setSelected] = useState(1)
  console.log(selected); 
  const randomSelect = () => {
    setSelected(Math.floor(Math.random()*10%8+1)) 
  }

  return (
    <div className="container">

      <Header random={randomSelect} />

      <section className="body">
        <Graph nodes={nodes} selected={selected} />
      </section>

    </div>
  )
}
