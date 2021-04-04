import React from 'react'

export type TextProps = Text;

export const Text: React.FC<TextProps> = (props) => {
    return <div>Text</div>;
}

export default React.memo(Text);