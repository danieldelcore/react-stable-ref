import React, { FC, useRef } from 'react';

export interface RenderCountProps {
    initialCount?: number;
    count?: number;
}

const RenderCount: FC<RenderCountProps> = ({ initialCount = 0, count }) => {
    const countRef = useRef(count || initialCount);

    if (!count) {
        console.log(initialCount, count);

        countRef.current = countRef.current + 1;
    }

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
                fontFamily:
                    '-apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif',
            }}
        >
            {countRef.current}
        </span>
    );
};

export default RenderCount;
