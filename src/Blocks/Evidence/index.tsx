import React from 'react'
import Citation from './Citation'

export type EvidenceProps = Omit<Evidence, 'source'> & {
    source?: Source,
};

export const Evidence: React.FC<EvidenceProps> = (props) => {
    return <article className="evidence">
        <div className="tag">{props.tag || 'Untagged'}</div>
        {props.subtag && <div className="subtag">{props.subtag}</div>}
        {props.source && <Citation {...props.source} />}
        {props.quote && <blockquote className="quote">&ldquo;{props.quote}&rdquo;</blockquote>}
    </article>;
}

export default Evidence;