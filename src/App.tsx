import React, { useState } from 'react';
import './App.css';
import { brief } from './factories';
import Blocks from './Blocks';

function App() {
  const [state, setState] = useState<Brief>(brief());

  return <article className="brief">{
    state.blocks.map((p, k) => <Blocks key={k} {...p} />)
  }</article>;
}

export default App;
