import { useRef, useEffect } from 'react';

const useWhichDepChanged = (
    name: string,
    dependencies: Record<string, any>,
) => {
    if ((process.env.NODE_ENV = 'production')) {
        console.warn(
            'useStableRefTester is only intended for development purposes only. Please remove from production bundles.',
        );
    }

    const previousDeps = useRef<Record<string, any> | undefined>();

    useEffect(() => {
        if (previousDeps.current) {
            const allKeys = Object.keys({
                ...previousDeps.current,
                ...dependencies,
            });
            const changesObj: Record<string, any> = {};

            allKeys.forEach(key => {
                if (previousDeps.current![key] !== dependencies[key]) {
                    changesObj[key] = {
                        from: previousDeps.current![key],
                        to: dependencies[key],
                    };
                }
            });

            if (Object.keys(changesObj).length) {
                console.log('[why-did-you-update]', name, changesObj);
            }
        }

        previousDeps.current = dependencies;
    });
};

export default useWhichDepChanged;
