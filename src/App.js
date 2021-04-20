import React from 'react';
import Graph from './graph';
import Header from './header';


export default function App() {
  return (
    <div className="container">

      <Header/>

      <section className="body">
        <Graph />
      </section>

    </div>
  )
}
