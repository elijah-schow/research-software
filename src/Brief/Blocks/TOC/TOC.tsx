import React from 'react'

import "./TOC.css"

export type TOCProps = PseudoContext & TOC;

export const TOC: React.FC<TOCProps> = ({ state, dispatch, ...block}) => {
    const headings = Object.values(state.brief.blocks)
        .filter(b => ['heading', 'evidence']
            .includes(b.type));

    return (
        <aside id={block.id} className="toc">
            <h1>{block.text}</h1>
            <ol className="toc-list">
                {headings.map((block, index) => (
                    <a className="toc-item" href={`#${block.id}`}>
                        <span className="toc-number">{index + 1}.&nbsp;</span>
                        <span className="toc-text">{
                            block.type === 'evidence'
                                ? block.tag
                                : block.text
                            }
                        </span>
                    </a>
                ))}
            </ol>
        </aside>
    );
}

export default React.memo(TOC);