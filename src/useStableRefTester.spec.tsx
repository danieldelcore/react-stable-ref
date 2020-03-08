import React, { useEffect, FC, ReactNode } from 'react';
import { render, act, cleanup } from '@testing-library/react';
import useStableRefTester from './useStableRefTester';

interface ButtonProps {
    onRender: () => void;
    children: ReactNode;
}

jest.useFakeTimers();

describe('useStableRefTester', () => {
    afterEach(() => cleanup());

    it('triggers a rerender every at every interval', () => {
        const UnstableButton: FC<ButtonProps> = ({ onRender, children }) => {
            const unstableArray = ['1', '2', '3'];
            useStableRefTester();

            useEffect(() => {
                onRender();
            }, [unstableArray]);

            return <button type="button">{children}</button>;
        };

        const onRender = jest.fn();

        render(
            <UnstableButton onRender={onRender}>Hello world</UnstableButton>,
        );

        act(() => {
            jest.runOnlyPendingTimers();
        });

        expect(onRender).toHaveBeenCalledTimes(2);
    });

    it('does not trigger a rerender every at every interval with a stable reference', () => {
        const StableButton: FC<ButtonProps> = ({ onRender, children }) => {
            const unstableArray = ['1', '2', '3'];
            const stableArrayHash = JSON.stringify(unstableArray);

            useStableRefTester();

            useEffect(() => {
                onRender();
            }, [stableArrayHash]);

            return <button type="button">{children}</button>;
        };

        const onRender = jest.fn();

        render(<StableButton onRender={onRender}>Hello world</StableButton>);

        act(() => {
            jest.runOnlyPendingTimers();
        });

        expect(onRender).toHaveBeenCalledTimes(1);
    });
});
