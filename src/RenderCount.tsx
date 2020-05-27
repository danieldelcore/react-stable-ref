import React, { FC } from 'react';
import useRenderCount from './useRenderCount';

export interface RenderCountProps {
    initialCount?: number;
    count?: number;
}

const RenderCount: FC<RenderCountProps> = ({ initialCount = 1, count }) => {
    const currentCount = useRenderCount(count || initialCount);

    return (
        <span
            style={{
                display: 'inline-block',
                boxSizing: 'border-box',
                minWidth: '30px',
                background: 'white',
                borderRadius: '15px',
                padding: '2px 6px',
                textAlign: 'center',
                fontSize: '12px',
                color: '#bf2600',
                backgroundColor: '#ffebe6',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}
        >
            {count ? count : currentCount}
        </span>
    );
};

export default RenderCount;
