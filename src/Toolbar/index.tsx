import React, { useContext } from 'react';
import { Context } from "../App";
import "./style.css";

export const Toolbar: React.FC = () => {
    const { dispatch } = useContext(Context);
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