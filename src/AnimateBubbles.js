import React, { useState, useLayoutEffect, useEffect } from 'react';
import usePrevious from './hooks/usePrevious';
// import calculateBoundingBoxes from './helpers/calculateBoundingBoxes';

const AnimateBubbles = ({ children }) => {
    const [boundingBox, setBoundingBox] = useState({});
    const [prevBoundingBox, setPrevBoundingBox] = useState({});
    const prevChildren = usePrevious(children);

    ////////////////////////////////////////////
    const calculateBoundingBoxes = (children) => {
        const boundingBoxes = {};

        console.log('got children: ');
        console.log(children);

        React.Children.forEach(children, (child) => {
            console.log('got child: ');
            console.log(child);
            const domNode = child.ref.current;
            const nodeBoundingBox = domNode.getBoundingClientRect();

            console.log('child.key: ');
            console.log(child.key);

            console.log('nodeBoundingBox: ');
            console.log(nodeBoundingBox);

            console.log('typeof nodeBoundingBox: ');
            console.log(typeof nodeBoundingBox);

            boundingBoxes[child.key] = nodeBoundingBox;
        });

        return boundingBoxes;
    };
    ////////////////////////////////////////////

    useLayoutEffect(() => {
        const newBoundingBox = calculateBoundingBoxes(children);
        setBoundingBox(newBoundingBox);
    }, [children]);

    useLayoutEffect(() => {
        const prevBoundingBox = calculateBoundingBoxes(prevChildren);
        setPrevBoundingBox(prevBoundingBox);
    }, [prevChildren]);

    useEffect(() => {
        const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;

        if (hasPrevBoundingBox) {
            React.Children.forEach(children, (child) => {
                const domNode = child.ref.current;
                const firstBox = prevBoundingBox[child.key];
                const lastBox = boundingBox[child.key];
                // const changeInX = firstBox.left - lastBox.left;
                const changeInY = firstBox.top - lastBox.top;
                // if (changeInX) {
                if (changeInY) {
                    requestAnimationFrame(() => {
                        // Before the DOM paints, invert child to old position
                        // domNode.style.transform = `translateX(${changeInX}px)`;
                        domNode.style.transform = `translateY(${changeInY}px)`;
                        domNode.style.transition = 'transform 0s';

                        requestAnimationFrame(() => {
                            // After the previous frame, remove
                            // the transistion to play the animation
                            domNode.style.transform = '';
                            domNode.style.transition = 'transform 500ms';
                        });
                    });
                }
            });
        }
    }, [boundingBox, prevBoundingBox, children]);

    return children;
};

export default AnimateBubbles;
