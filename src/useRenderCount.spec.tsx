import React, { FC } from 'react';
import { render } from '@testing-library/react';
import useRenderCount from './useRenderCount';

const UnstableButton: FC = () => {
    const count = useRenderCount();
    return <button type="button">{count}</button>;
};

describe('useRenderCount', () => {
    it('should initialize the count at 1', () => {
        const { queryByText } = render(<UnstableButton />);
        expect(queryByText('1')).not.toBe(null);
    });

    it('should count every render correctly', () => {
        const { rerender, queryByText } = render(<UnstableButton />);

        rerender(<UnstableButton />);
        rerender(<UnstableButton />);
        rerender(<UnstableButton />);

        expect(queryByText('4')).not.toBe(null);
    });
});
