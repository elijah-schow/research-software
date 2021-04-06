import React, { FC } from 'react';
import Blocks from './Blocks/Blocks';

import "./Brief.css";

export type BriefProps = PseudoContext & Brief;

export const Brief: FC<BriefProps> = ({ state, dispatch, ...brief }) => {
    return <article className="brief">{
        Object
            .values(brief.blocks)
            .map(block => (
                <Blocks
                    state={state}
                    dispatch={dispatch}
                    key={block.id}
                    {...block}
                />
            ))
    }</article>;
}

export default Brief;