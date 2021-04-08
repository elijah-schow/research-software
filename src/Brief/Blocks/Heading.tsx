import React from 'react'
import Editable from '../../Editable'
import Base from './Base';

const elements = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
};

export const Heading: React.FC<Heading> = (block) => {
    const type = elements[block.level] || elements[1];

    const children = (
        <Editable
            name="text"
            block={block}
            placeholder={`Heading ${block.level}`}
        />
    );

    return (
        <Base {...block}>{
            React.createElement(type, {}, children)
        }</Base>
    );
}

export default React.memo(Heading);