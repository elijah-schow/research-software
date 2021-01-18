import React from 'react'

export type CitationProps = {
    source?: ID;
}

export const Citation: React.FC<CitationProps> = ({ source }) => {
    if (!source) return null;
    return <div className="citation">{source}</div>;
}

export default Citation;