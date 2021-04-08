import classnames from 'classnames';
import React, { useContext, useCallback, ChangeEventHandler } from 'react';
import { Context } from '../../../App';
import Editable from '../../../Editable';

import './style.css'

export type TOCProps = TOC;

export const TOC: React.FC<TOCProps> = (block) => {
    const { state, dispatch, throttledDispatch } = useContext(Context);

    const headings = Object.values(state.brief.blocks)
        .filter(b => ['heading', 'evidence'].includes(b.type));


    // Listen for change events
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

    return (
        <aside
            id={block.id}
            className={classnames('toc', 'block', {
                'selected': state?.selection?.includes(block.id),
            })}
            onClick={() => dispatch({ type: "SELECT", id: block.id })}
        >
            <h2>
                <Editable
                    name="text"
                    value={block.text}
                    onChange={onChange}
                    placeholder="Empty"
                />
            </h2>
            <ol className="toc-list">
                {headings.map((_block, index, _blocks) => (
                    <a
                        id={`toc-${_block.id}`}
                        key={_block.id}
                        className={_block.type === 'heading'
                            ? `toc-item level-${_block.level}`
                            : `toc-item level-3`} // TODO: get current level
                        href={`#${_block.id}`} role="listitem"
                    >
                        <div>
                            <span className="toc-number">{index + 1}.&nbsp;</span>
                            <span className="toc-text">{
                                _block.type === 'evidence'
                                    ? _block.tag
                                    : _block.text
                            }
                            </span>
                        </div>
                        <div className="toc-page">1</div>
                    </a>
                ))}
            </ol>
        </aside>
    );
}

export default React.memo(TOC);