import React from 'react'
import Base from './Base';

export type TextProps = TextBlock;

export const Text: React.FC<TextProps> = (block) => {
    return (
        <Base {...block}>
            {block.text}
        </Base>
    );
}

export default React.memo(Text);