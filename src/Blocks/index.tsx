import React from 'react';
import Evidence from './Evidence';
import Heading from './Heading';
import Text from './Text';
import TOC from './TOC';

const Blocks: React.FC<Block> = (props) => {
    switch (props.type) {
        case 'evidence': return <Evidence {...props} />;
        case 'heading': return <Heading {...props} />;
        case 'text': return <Text {...props} />;
        case 'toc': return <TOC {...props} />;
        default: return <>Unknown</>;
    }
}

export default Blocks;