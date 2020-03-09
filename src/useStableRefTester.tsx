import { useState, useEffect } from 'react';

const useStableRefTester = (timeout: number = 1000) => {
    if (process.env.NODE_ENV === 'production') {
        console.warn(
            'useStableRefTester is only intended for development purposes only. Please remove from production bundles.',
        );
    }

    const [count, setCount] = useState(0);

    useEffect(() => {
        const token = setTimeout(() => {
            console.log('[useStableRefTester]', `Render count: #${count}`);

            setCount(count + 1);
        }, timeout);

        return () => clearTimeout(token);
    }, [count, timeout]);
};

export default useStableRefTester;
