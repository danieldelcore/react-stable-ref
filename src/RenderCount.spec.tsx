import React from 'react';
import { render } from '@testing-library/react';
import RenderCount from './RenderCount';

describe('RenderCount', () => {
    it('should initialize the count at 1', () => {
        const { queryByText } = render(<RenderCount />);
        expect(queryByText('1')).not.toBe(null);
    });

    it('should count every render correctly', () => {
        const { rerender, queryByText } = render(<RenderCount />);

        rerender(<RenderCount />);
        rerender(<RenderCount />);
        rerender(<RenderCount />);

        expect(queryByText('4')).not.toBe(null);
    });

    it('should render controlled count value', () => {
        const { queryByText } = render(<RenderCount count={50} />);

        expect(queryByText('50')).not.toBe(null);
    });

    it('should render controlled count value', () => {
        const { rerender, queryByText } = render(<RenderCount count={2} />);

        expect(queryByText('2')).not.toBe(null);
        rerender(<RenderCount count={3} />);
        expect(queryByText('3')).not.toBe(null);
        rerender(<RenderCount count={4} />);
        expect(queryByText('4')).not.toBe(null);
        rerender(<RenderCount count={5} />);
        expect(queryByText('5')).not.toBe(null);
    });
});
