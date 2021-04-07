import React from 'react'
import classNames from 'classnames';

export type TextProps = PseudoContext & TextBlock;

export const Text: React.FC<TextProps> = ({ state, dispatch, ...block}) => {
    return <div
    id={block.id}
    className={classNames('block', 'text', {
        'selected': state?.selection?.includes(block.id),
    })}
    onClick={() => dispatch({ type: "SELECT", id: block.id })}>Text</div>;
}

export default React.memo(Text);