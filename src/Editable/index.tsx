import React, { ChangeEventHandler, useState, useCallback, useContext } from "react";
import get from "lodash/get";
import { Context } from "../App";
import "./style.css";

export type EditableProps = {
    name: string,
    type?: string,
    block: Block,
    placeholder?: string,
};

/** @source https://blog.logrocket.com/building-inline-editable-ui-in-react/ */

const Editable: React.FC<EditableProps> = ({
    name,
    block,
    type,
    placeholder = "Editable",
    ...props
}) => {
    const { throttledDispatch } = useContext(Context);

    const [editing, setEditing] = useState(false);

    const onChange = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>(
        (event) => {
            throttledDispatch({
                type: "SET",
                path: `brief.blocks.${block.id}.${event.target.name}`,
                value: event.target.value
            });
        },
        [throttledDispatch, block]
    );

    const Control = type === "textarea" ? 'textarea' : 'input';

    // const value = get(state, `brief.blocks.${block.id}.${name}`);
    const value = get(block, name);

    const label = value
        ? type === "textarea"
            ? value.split('\n')
                .filter((p: string) => !!p.trim()) // remove empty paragraphs
                .map((p: string, i: number) => <p key={i}>{p}</p>)
            : <span>{value}</span>
        : placeholder;

    return (
        <section {...props}>
            {editing ? (
                <div
                    className="editable editing"
                    onBlur={() => setEditing(false)}
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
                >{label}</div>
            )}
        </section>
    );
};

export default React.memo(Editable);