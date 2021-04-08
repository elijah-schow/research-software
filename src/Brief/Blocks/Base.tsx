import React, { useContext, FC, PropsWithChildren } from 'react'
import classNames from 'classnames';
import { Context } from '../../App';

export const Evidence: FC<PropsWithChildren<Block>> = ({ children, ...block }) => {
    const { state, dispatch } = useContext(Context);
    const selected = state?.selection?.includes(block.id);
    return (
        <article
            id={block.id}
            className={classNames(block.type, "block", { selected })}
            onClick={() => dispatch({ type: "SELECT", id: block.id })}
        >
            {children}
        </article>
    );
}

export default React.memo(Evidence);