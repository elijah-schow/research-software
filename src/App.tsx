import React, { useReducer } from 'react';
import './App.css';
import { brief as briefFactory } from './factories';
import Blocks from './Blocks';

const reducer = (previous: Brief, action: Action): Brief => {
  switch(action.type) {
    default: return previous;
  }
}

function App() {
  const [brief, dispatch] = useReducer(reducer, {}, briefFactory);

  return <article className="brief">{
    Object
      .values(brief.blocks)
      .map(block => (
        <Blocks
          brief={brief}
          dispatch={dispatch}
          key={block.id}
          {...block}
        />
      ))
  }</article>;
}

export default App;
