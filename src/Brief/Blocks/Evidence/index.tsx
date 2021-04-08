import React, { FC, ChangeEventHandler, useCallback, useContext } from 'react'
import throttle from 'lodash/throttle';
import classNames from 'classnames';
import Editable from '../../../Editable';
import Citation from './Citation'
import { Context } from '../../../App';
import "./style.css"

export type EvidenceProps = Evidence;

export const Evidence: FC<EvidenceProps> = (block) => {
    const { state, dispatch } = useContext(Context);
    const { brief } = state;
    const source = block.source ? brief.sources[block.source] : null;

    // eslint-disable-next-line
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

    return (
        <article
            id={block.id}
            className={classNames("evidence", "block", {
                'selected': state?.selection?.includes(block.id),
            })}
            onClick={() => dispatch({ type: "SELECT", id: block.id })}
        >
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
        </article>
    );
}

export default React.memo(Evidence);