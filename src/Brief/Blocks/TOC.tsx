import React from 'react'

export type TOCProps = PseudoContext & TOC;

export const TOC: React.FC<TOCProps> = ({ state, dispatch, ...block}) => {
    return <div id={block.id}>TOC</div>;
}

export default React.memo(TOC);