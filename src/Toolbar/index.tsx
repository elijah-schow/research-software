import React, { FC } from 'react';

import "./style.css";

export type ToolbarProps = PseudoContext;

export const Toolbar: FC<ToolbarProps> = ({ dispatch }) => {
    const generate = () => dispatch({ type: "GENERATE" });
    const reset = () => dispatch({ type: "RESET" });
    return <aside className="toolbar">
        <div className="toolbar-pin">
            <button className="toolbar-button" onClick={generate}>Generate</button>
            <button className="toolbar-button" onClick={reset}>Reset</button>
        </div>
    </aside>;
}

export default Toolbar;