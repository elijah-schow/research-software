import React from 'react'

const Evidence: React.FC<Evidence> = (props) => {
    return <article className="evidence">
        <div className="tag">{props.tag || 'Untagged'}</div>
        {props.subtag && <div className="subtag">{props.subtag}</div>}
        {props.source && <div className="citation">{props.source}</div>}
        {props.quote && <blockquote className="quote">{props.quote}</blockquote>}
    </article>;
}

export default Evidence;