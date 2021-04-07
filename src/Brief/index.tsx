import React, { FC } from 'react';
import Blocks from './Blocks';

import "./style.css";

export type BriefProps = PseudoContext & Brief;

export const Brief: FC<BriefProps> = ({ state, dispatch, ...brief }) => {
    return <article className="brief">{
        Object
            .values(brief.blocks)
            .map(block => (
                <Blocks
                    key={block.id}
                    state={state}
                    dispatch={dispatch}
                    {...block}
                />
            ))
    }</article>;
}

export default Brief;