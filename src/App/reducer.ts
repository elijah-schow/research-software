import React from 'react'
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { brief as briefFactory, newBrief } from '../factories';

export const initializer = (): State => ({
    brief: newBrief(),
    selection: [],
    selection_mode: 'replace',
});

export const initial = initializer();

export const reducer: React.Reducer<State, Action> =
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
