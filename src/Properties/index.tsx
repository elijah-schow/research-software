import React, { FC, useContext, useCallback, ChangeEventHandler } from 'react'
import startCase from 'lodash/startCase'
import { Context } from "../App"
import Editable from '../Editable';
import './style.css'

export type OutlineProps = {};

const Outline: FC<OutlineProps> = () => {
    const { state, throttledDispatch } = useContext(Context);


    // Get the last selected block
    const blockID = state.selection.length > 0
        && state.selection[state.selection.length - 1];
    const block = blockID && state.brief.blocks[blockID];

    // Listen for change events
    const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            throttledDispatch({
                type: "SET",
                path: `brief.blocks.${block.id}.${event.target.name}`,
                value: event.target.value
            });
        },
        [throttledDispatch, block]
    );

    // Exit early if nothing is selected
    if (!block) return (
        <aside className="properties">
            <div className="properties-body">No selection</div>
        </aside>
    );

    const { id, type, ...properties } = block;
    const count = state.selection.length;

    return (
        <aside className="properties">
            <div className="properties-wrapper">
                <div className="properties-body">
                    <div className="properties-counter">
                        {count} selected block{
                            (count > 1 || count === 0) && 's'}
                    </div>
                    <h2>{startCase(block.type)} Properties</h2>
                    <table className="properties-table">
                        <tbody>
                            {Object.entries(properties).map(([key, value]) => (
                                <tr key={key}>
                                    <td className="properties-key">{key}</td>
                                    {/* <td className="properties-value">{
                                        typeof value !== "object" && value}</td> */}
                                    <td className="properties-value">
                                        {typeof value !== "object" && (
                                            <Editable
                                                name={key}
                                                value={value}
                                                onChange={onChange}
                                                placeholder="Empty"
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </aside>
    );
}

export default React.memo(Outline);