import React from 'react'

import './style.css'

export type TOCProps = PseudoContext & TOC;

export const TOC: React.FC<TOCProps> = ({ state, dispatch, ...block}) => {
    const headings = Object.values(state.brief.blocks)
        .filter(b => ['heading', 'evidence']
            .includes(b.type));

    return (
        <aside id={block.id} className="toc">
            <h2>{block.text}</h2>
            <ol className="toc-list">
                {headings.map((block, index) => (
                    <a className="toc-item" href={`#${block.id}`} role="listitem">
                        <div>
                            <span className="toc-number">{index + 1}.&nbsp;</span>
                            <span className="toc-text">{
                                block.type === 'evidence'
                                    ? block.tag
                                    : block.text
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