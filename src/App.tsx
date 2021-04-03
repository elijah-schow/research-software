import React, { useState } from 'react';
import './App.css';
import { brief } from './factories';
import Blocks from './Blocks';

function App() {
  const [state] = useState<Brief>(brief());

  return <article className="brief">{
    Object.values(state.blocks)
      // Resolve citations (TODO: find a better way)
      .map(block => (
        block.type !== 'evidence'
          ? block
          : {
            ...block,
            source: block.source
              ? state.sources[block.source] as Source
              : undefined,
          }
      ))
      // Render bloks
      .map(block => <Blocks key={block.id} {...block} />)
  }</article>;
}

export default App;
