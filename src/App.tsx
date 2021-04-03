import React, { useReducer } from 'react';

import { brief as briefFactory } from './factories';
import Blocks from './Blocks';
import Toolbar from './Toolbar';

const initialState = {
  brief: briefFactory()
};

const reducer: React.Reducer<State, Action> =
  (previous, action) => {
    switch(action.type) {
      case "GENERATE": return {
        ...previous,
        brief: briefFactory(),
      };
      default:
        console.error(`Unknown action`, action);
        return previous;
    }
  }

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <>
    <Toolbar brief={state.brief} dispatch={dispatch} />
    <article className="brief">{
      Object
        .values(state.brief.blocks)
        .map(block => (
          <Blocks
            brief={state.brief}
            dispatch={dispatch}
            key={block.id}
            {...block}
          />
        ))
    }</article>
  </>;
}

export default App;
