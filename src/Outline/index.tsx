import React, { FC } from 'react'

import './style.css'

export type OutlineProps = PseudoContext;

const Outline: FC<OutlineProps> = ({ state: { brief: { blocks } }, dispatch }) => {
    const headings = Object.values(blocks)
        .filter(b => ['heading', 'evidence']
            .includes(b.type));

    return (
        <aside className="outline">
            <ol className="outline-list">
                {headings.map((block, index) => (
                    <a
                        id={`outline-${block.id}`}
                        key={block.id}
                        className={block.type === 'heading'
                            ? `outline-item level-${block.level}`
                            : `outline-item level-3`}
                        href={`#${block.id}`}
                        role="listitem"
                    >
                        <span className="outline-number">{index + 1}.&nbsp;</span>
                        <span className="outline-text">{
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

export default React.memo(Outline);