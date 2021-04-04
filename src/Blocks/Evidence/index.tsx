import React, { FC, ChangeEventHandler, useCallback } from 'react'
import throttle from 'lodash/throttle';

import Editable from '../../Editable';
import Citation from './Citation'
import "./style.css"

export type EvidenceProps = PseudoContext & Evidence;

export const Evidence: FC<EvidenceProps> = ({
    state: { brief },
    dispatch,
    ...block
}) => {
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

    return <article className="evidence">
        <div className="tag">
            <Editable
                name="tag"
                onChange={onChange}
                value={block.tag}
                placeholder="Tag"
            />
        </div>
        {block.subtag && <div className="subtag">
            <Editable
                name="subtag"
                onChange={onChange}
                value={block.subtag}
                placeholder="Subtag"
            />
        </div>}
        {source && <Citation {...source} />}
        {/* TODO: create component to render the quote */}
        {/* TODO: auto-calculate the textarea's height */}
        {/* TODO: place insertion point on the spot that the user clicked */}
        <blockquote className="quote">
            <Editable
                name="quote.text"
                type="textarea"
                onChange={onChange}
                value={block.quote.text}
                placeholder="Quote"
            />
        </blockquote>
    </article>;
}

export default React.memo(Evidence);