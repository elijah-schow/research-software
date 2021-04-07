import React, { useCallback, ChangeEventHandler } from 'react'
import classnames from 'classnames'

import throttle from 'lodash/throttle'
import Editable from '../../Editable'

export type HeadingProps = PseudoContext & Heading;

const elements = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
};

export const Heading: React.FC<HeadingProps> = ({ state, dispatch, ...block }) => {
    const type = elements[block.level] || elements[1];

    const throttledDispatch = useCallback(
        throttle(dispatch, 250),
        [dispatch]
    );

    const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            throttledDispatch({
                type: "SET",
                path: `brief.blocks.${block.id}.${event.target.name}`,
                value: event.target.value
            });
        },
        [throttledDispatch, block]
    );

    const children = (
        <Editable
            name="text"
            value={block.text}
            onChange={onChange}
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