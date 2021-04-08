import React, { useContext } from 'react'
import classNames from 'classnames';
import { Context } from '../../App';

export type TextProps = TextBlock;

export const Text: React.FC<TextProps> = (block) => {
    const { state, dispatch } = useContext(Context);

    return (
        <div
            id={block.id}
            className={classNames('block', 'text', {
                'selected': state?.selection?.includes(block.id),
            })}
            onClick={() => dispatch({ type: "SELECT", id: block.id })}
        >Text</div>
    );
}

export default React.memo(Text);