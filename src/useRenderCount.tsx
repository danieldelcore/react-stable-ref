import { useRef, useEffect } from 'react';

export default function useRenderCount(initialCount = 1) {
    const countRef = useRef(initialCount);

    useEffect(() => {
        countRef.current++;
    });

    return countRef.current;
}
