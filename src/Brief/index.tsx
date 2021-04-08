import React from 'react';
import Blocks from './Blocks';
import "./style.css";

export type BriefProps = Brief;

export const Brief: React.FC<BriefProps> = ({ ...brief }) => {
    return <article className="brief">{
        Object
            .values(brief.blocks)
            .map(block => (
                <Blocks
                    key={block.id}
                    {...block}
                />
            ))
    }</article>;
}

export default Brief;