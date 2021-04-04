import React, { ChangeEventHandler, FC, KeyboardEventHandler, useState } from "react";

import "./style.css"

export type EditableProps = {
    value: string,
    name: string,
    type?: string,
    onChange: ChangeEventHandler,
    placeholder?: string,
};

/** @source https://blog.logrocket.com/building-inline-editable-ui-in-react/ */

const Editable: FC<EditableProps> = ({
    name,
    value,
    type,
    placeholder = "Editable content",
    onChange,
    ...props
}) => {
    const [editing, setEditing] = useState(false);

    // const onKeyDown: KeyboardEventHandler = (event, type) => {
    //     // no-op
    // };

    const Control = type === "textarea" ? 'textarea' : 'input';

    return (
        <section {...props}>
            {editing ? (
                <div
                    className="editable editing"
                    onBlur={() => setEditing(false)}
                    // onKeyDown={e => onKeyDown(e, type)}
                >
                    <Control
                        className="w-full"
                        name={name}
                        onChange={onChange}
                        defaultValue={value}
                        autoFocus
                    />
                </div>
            ) : (
                <div
                    className="editable"
                    onClick={() => { setEditing(true) }}
                >
                    <span>{value || placeholder} </span>
                </div>
            )}
        </section>
    );
};

export default React.memo(Editable);