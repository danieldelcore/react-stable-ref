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
            console.warn(`Testing refs: #${count}`);

            setCount(count + 1);

            return () => {
                console.log('Cleared');

                clearTimeout(token);
            };
        }, timeout);
    }, [count, timeout]);
};

export default useStableRefTester;
