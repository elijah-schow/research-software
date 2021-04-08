import React, { useContext } from 'react';
import Blocks from './Blocks';
import { Context } from "../App"
import "./style.css";

export const Brief: React.FC = () => {
    const { state } = useContext(Context);
    return (
        <article className="brief">{
            Object
                .values(state.brief.blocks)
                .map(block => (
                    <Blocks
                        key={block.id}
                        {...block}
                    />
                ))
        }</article>
    );
}

export default Brief;