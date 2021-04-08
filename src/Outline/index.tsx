import React, { FC, useContext } from 'react'
import classnames from 'classnames'
import { Context } from "../App"
import './style.css'

export type OutlineProps = {};

const Outline: FC<OutlineProps> = () => {
    const { state } = useContext(Context);

    const blocks = state?.brief?.blocks;

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
                        className={classnames(
                            'outline-item',
                            block.type === 'heading'
                                ? `level-${block.level}`
                                : 'level-3',
                            { 'selected': state.selection.includes(block.id) }
                        )}
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