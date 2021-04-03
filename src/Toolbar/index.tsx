import React, { FC } from 'react';

import "./style.css";

export type ToolbarProps = PseudoContext;

export const Toolbar: FC<ToolbarProps> = ({ dispatch }) => {
    const generate = () => dispatch({ type: "GENERATE" });
    return <aside className="toolbar">
        <button className="toolbar-button" onClick={generate}>Generate</button>
    </aside>;
}

export default Toolbar;