import React from 'react'
import Citation from './Citation'

export type EvidenceProps = Evidence & PseudoContext;

export const Evidence: React.FC<EvidenceProps> = ({
    tag, subtag, source: sourceID, quote, brief, dispatch
}) => {
    const source = sourceID ? brief.sources[sourceID] : null;
    return <article className="evidence">
        <div className="tag">{tag || 'Untagged'}</div>
        {subtag && <div className="subtag">{subtag}</div>}
        {source && <Citation {...source} />}
        {/* TODO: create component to render rich text */}
        {quote && <blockquote className="quote">&ldquo;{quote.text}&rdquo;</blockquote>}
    </article>;
}

export default Evidence;