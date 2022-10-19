import React from 'react';

const calculateBoundingBoxes = (children) => {
    const boundingBoxes = {};

    console.log('*** abananan');

    React.Children.forEach(children, (child) => {
        console.log('got child: ');
        console.dir(child);
        const domNode = child.ref.current;
        const nodeBoundingBox = domNode.getBoundingClientRect();

        boundingBoxes[child.key] = nodeBoundingBox;
    });

    return boundingBoxes;
};

export default calculateBoundingBoxes;
