import classnames from 'classnames';
import React, { useContext } from 'react';
import { Context } from '../../../App';
import Editable from '../../../Editable';
import './style.css'

export const TOC: React.FC<TOC> = (block) => {
    const { state, dispatch } = useContext(Context);

    const headings = Object.values(state.brief.blocks)
        .filter(b => ['heading', 'evidence'].includes(b.type));

    return (
        <aside
            id={block.id}
            className={classnames('toc', 'block', {
                'selected': state?.selection?.includes(block.id),
            })}
            onClick={() => dispatch({ type: "SELECT", id: block.id })}
        >
            <h2><Editable name="text" block={block} /></h2>
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