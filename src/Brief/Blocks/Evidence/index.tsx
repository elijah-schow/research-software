import React, { useContext } from 'react'
import classNames from 'classnames';
import Editable from '../../../Editable';
import Citation from './Citation'
import { Context } from '../../../App';
import "./style.css"

export const Evidence: React.FC<Evidence> = (block) => {
    const { state, dispatch } = useContext(Context);
    const { brief } = state;
    const source = block.source ? brief.sources[block.source] : null;

    return (
        <article
            id={block.id}
            className={classNames("evidence", "block", {
                'selected': state?.selection?.includes(block.id),
            })}
            onClick={() => dispatch({ type: "SELECT", id: block.id })}
        >
            <div className="tag">
                <Editable name="tag" block={block} />
            </div>
            {block.subtag && <div className="subtag">
                <Editable name="tag" block={block} />
            </div>}
            {source && <Citation {...source} />}
            {/* TODO: create component to render the quote */}
            {/* TODO: auto-calculate the textarea's height */}
            {/* TODO: place insertion point on the spot that the user clicked */}
            <blockquote className="quote">
                <Editable
                    name="quote.text"
                    type="textarea"
                    block={block}
                    placeholder="Quote"
                />
            </blockquote>
        </article>
    );
}

export default React.memo(Evidence);