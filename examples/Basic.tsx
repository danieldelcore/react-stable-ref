import { storiesOf } from '@storybook/react';
import React, { FC, ReactNode, useEffect, useState } from 'react';

import { useStableRefTester, useWhichDepChanged } from '../src';

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
}

const UnstableButton: FC<ButtonProps> = ({ onClick, children }) => {
    const unstableArray = ['1', '2', '3'];

    useStableRefTester();
    useWhichDepChanged({ unstableArray });

    useEffect(() => {
        console.warn('I should not be called');
    }, [unstableArray]);

    return (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    );
};

const StableButton: FC<ButtonProps> = ({ onClick, children }) => {
    const stableArray = ['1', '2', '3'];

    useStableRefTester();
    useWhichDepChanged({ stableArray: JSON.stringify(stableArray) });

    useEffect(() => {
        console.warn('I should not be called');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(stableArray)]);

    return (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    );
};

storiesOf('Basic', module).add('Visualize unstable references', () => {
    const [isStable, setIsStable] = useState(false);

    return (
        <React.Fragment>
            <p>Open the console to view output</p>
            {isStable ? (
                <StableButton onClick={() => setIsStable(!isStable)}>
                    Stable button 😁
                </StableButton>
            ) : (
                <UnstableButton onClick={() => setIsStable(!isStable)}>
                    Unstable button 😵
                </UnstableButton>
            )}
        </React.Fragment>
    );
});
