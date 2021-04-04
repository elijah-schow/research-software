import React from 'react'

export type TOCProps = TOC;

export const TOC: React.FC<TOCProps> = (props) => {
    return <div>TOC</div>;
}

export default React.memo(TOC);