import { storiesOf } from '@storybook/react';
import React, { FC, ReactNode, useEffect } from 'react';

import { useStableRefTester } from '../src';

storiesOf('Basic', module).add('Visualize unstable references', () => {
    const UnstableButton: FC<{ children: ReactNode }> = ({ children }) => {
        const myArray = ['1', '2', '3'];

        useStableRefTester();
        useEffect(() => {
            console.warn('I should not be called');
        }, [myArray]);

        return <button>{children}</button>;
    };

    return <UnstableButton>I am an unstable button 😵</UnstableButton>;
});
