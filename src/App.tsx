import React, { useEffect, useReducer } from 'react';
import localforage from 'localforage';
import throttle from 'lodash/throttle';

import { brief as briefFactory, newBrief } from './factories';
import Toolbar from './Toolbar';
import Brief from './Brief';

const initializer = (): State => ({
  brief: newBrief()
});

const initial = initializer();

// TODO: remove magic values
// TODO: handle errors without making typescript angry
const save = throttle(async (state: State) => {
  return localforage.setItem('state', state);
}, 250);

const load = async () => {
  return localforage.getItem<State>('state')
    .then(state => state != null
        ? state
        : initializer()
      );
}

const reducer: React.Reducer<State, Action> =
  (previous, action) => {
    switch(action.type) {
      case "LOAD": return action.state;
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
  const [state, dispatch] = useReducer(reducer, initial);

  // Load previous application state when it starts
  useEffect(() => {
    load().then(state => dispatch({ type: "LOAD", state }))
  }, []);

  // Save application state when it changes
  useEffect(() => { save(state); }, [state]);

  return <>
    <Toolbar state={state} dispatch={dispatch} />
    <Brief state={state} dispatch={dispatch} {...state.brief} />
  </>;
}

export default App;
