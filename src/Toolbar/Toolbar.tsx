import React, { FC } from 'react';

import "./Toolbar.css";

export type ToolbarProps = PseudoContext;

export const Toolbar: FC<ToolbarProps> = ({ dispatch }) => {
    const generate = () => dispatch({ type: "GENERATE" });
    return <aside className="toolbar">
        <div className="toolbar-pin">
            <button className="toolbar-button" onClick={generate}>Generate</button>
        </div>
    </aside>;
}

export default Toolbar;