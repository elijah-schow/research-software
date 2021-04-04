import React, { FC, useState } from "react";

import "./style.css"

export type EditableProps = {
    value: string,
    type?: string,
    placeholder?: string,
    children: React.ReactChild,
};

/** @source https://blog.logrocket.com/building-inline-editable-ui-in-react/ */

const Editable: FC<EditableProps> = ({
    value,
    type,
    placeholder = "Editable content",
    children,
    ...props
}) => {
    const [editing, setEditing] = useState(false);

    const onKeyDown = (event, type) => {
        // no-op
    };

    return (
        <section {...props}>
            {editing ? (
                <div
                    className="editable editing"
                    onBlur={() => setEditing(false)}
                    onKeyDown={e => onKeyDown(e, type)}
                >
                    {children}
                </div>
            ) : (
                <div
                    className="editable"
                    onClick={() => setEditing(true)}
                >
                    <span>{value || placeholder} </span>
                </div>
            )}
        </section>
    );
};

export default Editable;