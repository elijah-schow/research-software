import React, { useContext } from 'react';
import { Context } from "../App";
import "./style.css";

export const Toolbar: React.FC = () => {
    const { dispatch } = useContext(Context);

    return <aside className="toolbar">
        <div className="toolbar-pin">
            <button
                className="toolbar-button"
                onClick={() => dispatch({ type: "GENERATE" })}
            >Generate</button>
            <button
                className="toolbar-button"
                onClick={() => dispatch({ type: "RESET" })}
            >Reset</button>
            <button
                className="toolbar-button"
                onClick={() => dispatch({ type: "CLEAR_SELECTION" })}
            >Clear Selection</button>
        </div>
    </aside>;
}

export default Toolbar;