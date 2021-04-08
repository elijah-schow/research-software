import React, { useContext } from 'react';
import { Context } from '../../../App';
import Editable from '../../../Editable';
import Base from '../Base';
import './style.css'

export const TOC: React.FC<TOC> = (block) => {
    const { state } = useContext(Context);

    const headings = Object.values(state.brief.blocks)
        .filter(b => ['heading', 'evidence'].includes(b.type));

    return (
        <Base {...block}>
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
        </Base>
    );
}

export default React.memo(TOC);