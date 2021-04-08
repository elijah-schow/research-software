import React, { useEffect, useMemo, useReducer } from 'react';
import localforage from 'localforage';
import throttle from 'lodash/throttle';
import Toolbar from '../Toolbar';
import Brief from '../Brief';
import Outline from '../Outline';
import { reducer, initial, initializer } from './reducer'
import './style.css'

const THROTTLE = 250;

const save = throttle(async (state: State) => {
  // TODO: handle errors without making typescript angry
  return localforage.setItem('state', state);
}, THROTTLE);

const load = async () => {
  return localforage.getItem<State>('state')
    .then(state => state != null
      ? state
      : initializer()
    );
}

export const Context = React.createContext<Context>({
  state: initial,
  dispatch: (value: Action): void => { },
});

function App() {
  const [state, dispatch] = useReducer(reducer, initial);

  // Load previous application state on startup
  useEffect(() => {
    load().then(state => dispatch({ type: "LOAD", state }))
  }, []);

  // Save application state when it changes
  useEffect(() => { save(state); }, [state]);

  // Set up global event listeners
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      dispatch({ type: "KEYDOWN", event });
    };

    const onKeyUp = (event: KeyboardEvent) => {
      dispatch({ type: "KEYUP", event });
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Clean up when the component dismounts
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    }

  }, [dispatch]);

  // Avoid uneccesary re-renders
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <Context.Provider value={value}>
      <div className="app">
        <Toolbar />
        <Outline />
        <Brief />
      </div>
    </Context.Provider>
  );
}

export default App;
