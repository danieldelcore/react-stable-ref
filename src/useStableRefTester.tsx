import { useState, useEffect } from 'react';

export const useStableRefTester = (
    timeout: number = 1000,
    shouldLog: boolean = false,
) => {
    if ((process.env.NODE_ENV = 'production')) {
        console.warn(
            'useStableRefTester is only intended for development purposes only. Please remove from production bundles.',
        );
    }

    const [count, setCount] = useState(0);

    useEffect(() => {
        const token = setTimeout(() => {
            if (shouldLog) {
                console.warn(`Testing refs: #${count}`);
            }

            setCount(count + 1);

            return () => clearTimeout(token);
        }, timeout);
    }, [count, shouldLog, timeout]);
};
