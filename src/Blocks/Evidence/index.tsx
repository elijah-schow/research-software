import { FC, useState, ChangeEventHandler, MouseEventHandler } from 'react'
import Citation from './Citation'
import "./style.css"

export type EvidenceProps = Evidence & PseudoContext;

export const Evidence: FC<EvidenceProps> = ({ state: { brief }, dispatch, ...block }) => {
    const [editing, setEditing] = useState(false);

    const source = block.source ? brief.sources[block.source] : null;

    const onQuoteClick: MouseEventHandler<HTMLQuoteElement> = () => {
        setEditing(true);
    }

    const onQuoteChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        const next = {
            ...block,
            quote: {
                text: event.target.value,
                metadata: block.quote.metadata
            }
        };
        dispatch({ type: "UPSERT_BLOCK", block: next });
    }

    return <article className="evidence">
        <div className="tag">{block.tag || 'Untagged'}</div>
        {block.subtag && <div className="subtag">{block.subtag}</div>}
        {source && <Citation {...source} />}
        {/* TODO: create component to render the quote */}
        {/* TODO: auto-calculate the textarea's height */}
        {/* TODO: exit editing mode when the user clicks outside the textarea */}
        {/* TODO: place insertion point on the spot that the user clicked */}
        {editing
            ? <textarea className="quote" onChange={onQuoteChange}
                rows={4}>{block.quote.text}</textarea>
            : block.quote && (
                <blockquote className="quote" onClick={onQuoteClick}>
                    &ldquo;{block.quote.text}&rdquo;
                </blockquote>
            )
        }
    </article>;
}

export default Evidence;