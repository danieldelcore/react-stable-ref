import React, { FC, ReactNode } from 'react';
import { render, cleanup } from '@testing-library/react';

import useWhichDepChanged from './useWhichDepChanged';

interface ButtonProps {
    data: any;
    children: ReactNode;
    onChange?: (changedDeps: Record<string, any>) => void;
}

const Button: FC<ButtonProps> = ({ data, children, onChange }) => {
    useWhichDepChanged({ data }, onChange);

    return <button type="button">{children}</button>;
};

describe('useWhichDepChanged', () => {
    let consoleMock: jest.Mock;

    beforeEach(() => {
        consoleMock = jest
            .spyOn(global.console, 'log')
            .mockImplementation(() => {});
    });

    afterAll(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('emits changed dependencies to the console', () => {
        let testValue = 'Foo';

        const { rerender } = render(
            <Button data={testValue}>Hello World</Button>,
        );

        testValue = 'Bar';

        rerender(<Button data={testValue}>Hello World</Button>);

        expect(consoleMock).toHaveBeenCalledWith('[useWhichDepChanged]', {
            data: { from: 'Foo', to: 'Bar' },
        });
        expect(consoleMock).toHaveBeenCalledTimes(1);
    });

    it('detects changed dependencies', () => {
        const onChange = jest.fn();
        let testValue = 'Foo';

        const { rerender } = render(
            <Button onChange={onChange} data={testValue}>
                Hello World
            </Button>,
        );

        testValue = 'Bar';

        rerender(
            <Button onChange={onChange} data={testValue}>
                Hello World
            </Button>,
        );

        expect(onChange).toHaveBeenCalledWith({
            data: {
                from: 'Foo',
                to: 'Bar',
            },
        });
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('detects unstable dependencies', () => {
        const onChange = jest.fn();
        let testArray = [1, 2, 3];

        const { rerender } = render(
            <Button onChange={onChange} data={testArray}>
                Hello World
            </Button>,
        );

        testArray = [1, 2, 3];

        rerender(
            <Button onChange={onChange} data={testArray}>
                Hello World
            </Button>,
        );

        expect(onChange).toHaveBeenCalledWith({
            data: {
                from: testArray,
                to: testArray,
            },
        });
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should not detect unchanged dependencies', () => {
        const onChange = jest.fn();
        let testValue = 'Foo';

        const { rerender } = render(
            <Button onChange={onChange} data={testValue}>
                Hello World
            </Button>,
        );

        rerender(
            <Button onChange={onChange} data={testValue}>
                Hello World
            </Button>,
        );

        expect(onChange).not.toHaveBeenCalled();
    });

    it('should not detect stable dependencies', () => {
        const onChange = jest.fn();
        let testValue = 'Foo';

        const { rerender } = render(
            <Button onChange={onChange} data={testValue}>
                Hello World
            </Button>,
        );

        testValue = 'Foo';

        rerender(
            <Button onChange={onChange} data={testValue}>
                Hello World
            </Button>,
        );

        expect(onChange).not.toHaveBeenCalled();
    });
});
