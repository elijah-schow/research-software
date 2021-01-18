import React from 'react'

export type HeadingProps = Heading;

const elements = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
};

export const Heading: React.FC<HeadingProps> = (props) => {
    const type = elements[props.level] || elements[1];
    return React.createElement(type, null, props.text);
}

export default Heading;