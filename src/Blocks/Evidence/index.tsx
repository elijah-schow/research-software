import React, { FC, useState, useRef, ChangeEventHandler, useCallback } from 'react'
import throttle from 'lodash/throttle';

import useOutsideClick from "../../useOutsideClick";
import Editable from '../../Editable';
import Citation from './Citation'
import "./style.css"

export type EvidenceProps = PseudoContext & Evidence;

export const Evidence: FC<EvidenceProps> = ({
    state: { brief },
    dispatch,
    ...block
}) => {
    const [editing, setEditing] = useState(false);

    const source = block.source ? brief.sources[block.source] : null;

    const throttledDispatch = useCallback(
        throttle(dispatch, 250),
        [dispatch]
    );

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

    // Exit edit mode when the user clicks outside the textarea
    const ref = useRef(null);

    useOutsideClick(ref, () => {
        if (editing) {
            setEditing(false);
        }
    });

    return <article className="evidence">
        <div className="tag">
            <Editable value={block.tag || 'Untagged'} placeholder="Tag">
                <input
                    className="w-full"
                    name="tag"
                    onChange={onChange}
                    defaultValue={block.tag}
                />
            </Editable>
        </div>
        {block.subtag && <div className="subtag">
            <Editable value={block.subtag} placeholder="Subtag">
                <input
                    className="w-full"
                    name="subtag"
                    onChange={onChange}
                    defaultValue={block.subtag}
                />
            </Editable>
        </div>}
        {source && <Citation {...source} />}
        {/* TODO: create component to render the quote */}
        {/* TODO: auto-calculate the textarea's height */}
        {/* TODO: place insertion point on the spot that the user clicked */}
        <blockquote className="quote">
            <Editable value={block.quote.text} placeholder="Quote">
                <textarea
                    className="w-full"
                    name="quote.text"
                    onChange={onChange}
                    defaultValue={block.quote.text}
                />
            </Editable>
        </blockquote>
    </article>;
}

export default React.memo(Evidence);