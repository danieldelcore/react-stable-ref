import { useRef, useEffect } from 'react';

type Dependencies = Record<string, any>;

const useWhichDepChanged = (
    dependencies: Dependencies,
    onChange?: (changedDeps: Dependencies) => void,
) => {
    if (process.env.NODE_ENV === 'production') {
        console.warn(
            'useStableRefTester is only intended for development purposes only. Please remove from production bundles.',
        );
    }

    const previousDeps = useRef<Dependencies | undefined>();

    useEffect(() => {
        if (previousDeps.current) {
            const allKeys = Object.keys({
                ...previousDeps.current,
                ...dependencies,
            });
            const changedDeps: Dependencies = {};

            allKeys.forEach(key => {
                if (previousDeps.current![key] !== dependencies[key]) {
                    changedDeps[key] = {
                        from: previousDeps.current![key],
                        to: dependencies[key],
                    };
                }
            });

            if (Object.keys(changedDeps).length) {
                onChange
                    ? onChange(changedDeps)
                    : console.log('[useWhichDepChanged]', changedDeps);
            }
        }

        previousDeps.current = dependencies;
    });
};

export default useWhichDepChanged;
