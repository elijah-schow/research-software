import React from 'react'

export type TextProps = PseudoContext & TextBlock;

export const Text: React.FC<TextProps> = ({ state, dispatch, ...block}) => {
    return <div id={block.id}>Text</div>;
}

export default React.memo(Text);