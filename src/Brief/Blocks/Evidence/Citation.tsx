import React from 'react'
import Author from './Author'

export type CitationProps = Source

export const Citation: React.FC<CitationProps> = ({ authors, title, date, publication, url, tracking }) => {
    return <div className="citation">
        {authors?.map((v, i) => <Author key={i} {...v} />)}
        {title && <>`, &ldquo;{title}&rdquo;</>}
        {date && `, ${date.toLocaleDateString()}`}
        {publication && `, ${publication}`}
        {url && <>, <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></>}
        {tracking && `, ${tracking}`}
    </div>;
}

export default React.memo(Citation);