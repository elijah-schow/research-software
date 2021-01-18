import React, { useState } from 'react';
import './App.css';
import { brief } from './factories';
import Blocks from './Blocks';

function App() {
  const [state, setState] = useState<Brief>(brief());

  return <article className="brief">{
    state.blocks
      // Resolve citations (TODO: find a better way to do this)
      .map(block => block.type !== 'evidence'
        ? block
        : {
          ...block,
          source: block.source
            ? state.sources[block.source] as Source
            : undefined,
        })
      // Render blocks
      .map((p, k) => <Blocks key={k} {...p} />)
  }</article>;
}

export default App;
