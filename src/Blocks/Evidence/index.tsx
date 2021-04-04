import { FC, useState, useRef, ChangeEventHandler, MouseEventHandler, useCallback } from 'react'
import throttle from 'lodash/throttle';

import useOutsideClick from "../../useOutsideClick";
import Citation from './Citation'
import "./style.css"

export type EvidenceProps = Evidence & PseudoContext;

export const Evidence: FC<EvidenceProps> = ({
    state: { brief },
    dispatch,
    ...block
}) => {
    const [editing, setEditing] = useState(false);

    const source = block.source ? brief.sources[block.source] : null;

    const onQuoteClick: MouseEventHandler<HTMLQuoteElement> = useCallback(
        () => { setEditing(true); },
        [setEditing]
    );

    const throttledDispatch = useCallback(
        throttle(dispatch, 250),
        [dispatch]
    );

    const onQuoteChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
        (event) => {
            throttledDispatch({
                type: "SET",
                path: `brief.blocks.${block.id}.quote.text`,
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
        <div className="tag">{block.tag || 'Untagged'}</div>
        {block.subtag && <div className="subtag">{block.subtag}</div>}
        {source && <Citation {...source} />}
        {/* TODO: create component to render the quote */}
        {/* TODO: auto-calculate the textarea's height */}
        {/* TODO: exit editing mode when the user clicks outside the textarea */}
        {/* TODO: place insertion point on the spot that the user clicked */}
        <div ref={ref}>
            {editing
                ? <textarea className="quote" onChange={onQuoteChange}
                    rows={4} defaultValue={block.quote.text} />
                : block.quote && (
                    <blockquote className="quote" onClick={onQuoteClick}>
                        &ldquo;{block.quote.text}&rdquo;
                    </blockquote>
                )
            }
        </div>
    </article>;
}

export default Evidence;