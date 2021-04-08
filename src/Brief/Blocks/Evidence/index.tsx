import React, { useContext } from 'react';
import { Context } from '../../../App';
import Editable from '../../../Editable';
import Base from '../Base';
import Citation from './Citation';
import "./style.css"

export const Evidence: React.FC<Evidence> = (block) => {
    const { state } = useContext(Context);
    const { brief } = state;
    const source = block.source ? brief.sources[block.source] : null;

    return (
        <Base {...block}>
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
        </Base>
    );
}

export default React.memo(Evidence);