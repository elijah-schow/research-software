import React, { useReducer } from 'react';
import './App.css';
import { brief as briefFactory } from './factories';
import Blocks from './Blocks';

const reducer: React.Reducer<Brief, Action> =
  (previous, action) => {
    switch(action.type) {
      case "UPSERT_BLOCK": return {
        ...previous,
        blocks: {
          ...previous.blocks,
          [action.block.id]: action.block,
        }
      };
      case "DELETE_BLOCK":
        const id = 'id' in action ? action.id : action.block.id;
        const { [id]: omit, ...blocks } = previous.blocks;
        return {
          ...previous,
          blocks,
        };
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
