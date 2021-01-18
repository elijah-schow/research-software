import React from 'react'
import Citation from './Citation'

const Evidence: React.FC<Evidence> = (props) => {
    return <article className="evidence">
        <div className="tag">{props.tag || 'Untagged'}</div>
        {props.subtag && <div className="subtag">{props.subtag}</div>}
        <Citation source={props.source} />
        {props.quote && <blockquote className="quote">{props.quote}</blockquote>}
    </article>;
}

export default Evidence;