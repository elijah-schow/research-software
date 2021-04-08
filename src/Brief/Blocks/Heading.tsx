import React, { useContext } from 'react'
import classnames from 'classnames'
import Editable from '../../Editable'
import { Context } from '../../App';

const elements = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
};

export const Heading: React.FC<Heading> = (block) => {
    const { state, dispatch } = useContext(Context);

    const type = elements[block.level] || elements[1];

    const children = (
        <Editable
            name="text"
            value={block.text}
            placeholder={`Heading ${block.level}`}
        />
    );

    const props = {
        id: block.id,
        className: classnames({
            'block': true,
            'heading': true,
            'selected': state?.selection?.includes(block.id),
        }),
        onClick: () => dispatch({ type: "SELECT", id: block.id }),
    };

    return React.createElement(type, props, children);
}

export default React.memo(Heading);