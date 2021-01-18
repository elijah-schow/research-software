import React from 'react';
import { Evidence, EvidenceProps } from './Evidence';
import { Heading, HeadingProps } from './Heading';
import { Text, TextProps } from './Text';
import { TOC, TOCProps } from './TOC';

export type BlocksProps = EvidenceProps | HeadingProps | TextProps | TOCProps;

export const Blocks: React.FC<BlocksProps> = (props) => {
    switch (props.type) {
        case 'evidence': return <Evidence {...props} />;
        case 'heading': return <Heading {...props} />;
        case 'text': return <Text {...props} />;
        case 'toc': return <TOC {...props} />;
        default: return <>Unknown</>;
    }
}

export default Blocks;