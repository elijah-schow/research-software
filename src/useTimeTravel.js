import React, { useReducer } from 'react';
import produce from 'immer';

/** @source https://frontarm.com/swyx/reusable-time-travel-react-hooks-immer/ */

export type TimeTravelAction = "UNDO" | "REDO" | "RESET"

export type Timeline<S> = {
    past: Array<S>
    present: S,
    future: Array<S>
}

export function useTimeTravel<S,A>(reducer: React.Reducer<S,A>, initialState: S) {
  const timeline: Timeline<S> = {
    past: [],
    present: initialState,
    future: []
  };

  const proxiedReducer: React.Reducer<Timeline<S>,A> = (timeline, action) => {
    switch(action) {
        case "UNDO": return _doUndo(timeline)
        case "REDO": return _doRedo(timeline);
        case "RESET": return _doReset(timeline);
        default:
            const recipe = draft => reducer(draft, action);
            const newState = produce(timeline.present, recipe);
            return _addNewPresent(timeline, newState);
    }
  };

  const [_timeline, _dispatch] = useReducer(proxiedReducer, timeline);
  return {
    state: _timeline.present,
    timeline: _timeline,
    dispatch: _dispatch,
    doUndo: () => _dispatch("UNDO"),
    doRedo: () => _dispatch("REDO"),
    doReset: () => _dispatch("RESET")
  };
}

function _addNewPresent<S>(timeline: Timeline<S>, newPresent: S) {
  return produce(timeline, (draft: Timeline<S>) => {
    draft.past.push(draft.present);
    draft.present = newPresent;
    draft.future = [];
  });
}

function _doUndo<S>(timeline: Timeline<S>) {
  return produce(timeline, (draft: Timeline<S>) => {
    if (!draft.past.length) return;
    const newPresent = draft.past.pop();
    draft.future.unshift(draft.present);
    draft.present = newPresent;
  });
}

function _doRedo<S>(timeline: Timeline<S>)  {
  return produce(timeline, (draft: Timeline<S>) => {
    if (!draft.future.length) return;
    const newPresent = draft.future.shift();
    draft.past.push(draft.present);
    draft.present = newPresent;
  });
}

function _doReset<S>(timeline: Timeline<S>) {
  return produce(timeline, (draft: Timeline<S>) => {
    if (!draft.past.length) return;
    const newPresent = draft.past.shift();
    draft.future = [...draft.past, draft.present, ...draft.future];
    draft.present = newPresent;
    draft.past = [];
  });
}