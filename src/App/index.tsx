import React, { KeyboardEventHandler, useEffect, useReducer } from 'react';
import localforage from 'localforage';
import throttle from 'lodash/throttle';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

import { brief as briefFactory, newBrief } from '../factories';
import Toolbar from '../Toolbar';
import Brief from '../Brief';
import Outline from '../Outline';

import './style.css'

const initializer = (): State => ({
  brief: newBrief(),
  selection: [],
  selection_mode: 'replace',
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
    console.log(previous, action);
    switch (action.type) {
      case "LOAD": return {
        ...action.state,
        // Overwrite selection mode. It should always start as 'replace'.
        // TODO: add a allowlist or denylist of properties to load
        selection_mode: 'replace',
      };
      case "RESET": return initializer();
      case "GENERATE": return {
        ...previous,
        brief: briefFactory(),
      };
      case "SET":
        const next = cloneDeep(previous); // This is extremely inefficient :(
        set(next, action.path, action.value);
        return next;
      case "SELECT":
        return {
          ...previous,
          selection:
            previous?.selection_mode === 'non-contiguous'
              ? previous.selection.includes(action.id)
                // Unselect - non-contiguous selection
                ? previous.selection.filter(id => id !== action.id)
                // Select - non-contiguous selection
                : [...previous?.selection, action.id]
              // Select - replace, Contiguous selection has not been implemented
              : [action.id],
              // TODO: Contiguous selection has not been implemented yet
              // TODO: unselect when clicking outside any blocks
        }
      case "KEYDOWN":
        return ['Meta', 'Control'].includes(action.event.key)
          ? {
            ...previous,
            selection_mode: 'non-contiguous',
          }
          : previous;
      case "KEYUP":
        return ['Meta', 'Control'].includes(action.event.key)
          ? {
            ...previous,
            selection_mode: 'replace',
          }
          : previous;
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

  return (
    <div className="app">
      <Toolbar state={state} dispatch={dispatch} />
      <Outline state={state} dispatch={dispatch} />
      <Brief state={state} dispatch={dispatch} {...state.brief} />
    </div>
  );
}

export default App;
