<p align="center">
  <img width="300" src="./assets/logo.png" alt="Test stable references">
</p>

# react-stable-ref 🤷‍♂️

[![min](https://img.shields.io/bundlephobia/min/react-stable-ref.svg)](https://www.npmjs.com/package/react-stable-ref)
[![npm](https://img.shields.io/npm/v/react-stable-ref.svg)](https://www.npmjs.com/package/react-stable-ref)
[![Downloads per month](https://img.shields.io/npm/dm/react-stable-ref.svg)](https://www.npmjs.com/package/react-stable-ref)

Your stable reference utility library with everything you need to test, visualize and protect against the dreaded unintentional rerender 😱

[Try it here](https://danieldelcore.github.io/react-stable-ref/)

## Get started 🏗

**Installation**

`npm install --save react-stable-ref` or `yarn add react-stable-ref`

## Example

```jsx
const UnstableButton: FC<ButtonProps> = ({ onClick, children }) => {
    // Unstable reference (unstableArray is reassigned on every render)
    const unstableArray = ['1', '2', '3'];
    const stableValue = 'Im stable because im a string';

    useStableRefTester(); // Triggers rerenders every second
    useWhichDepChanged({ unstableArray, stableValue });
    /**
     * Will output the following to the console (or onChange if you pass it in)
     *
     * > [useWhichDepChanged]: { unstableArray: { from: [1, 2, 3]; to: [1, 2, 3]}}
     */

    return (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    );
};
```

## Motivation 🧠

It's not always obvious unstable references are passed into hooks such as `useEffect`. This can cause unnecessary rerenders, which when left unchecked can decrease the performance of your app, cause jank and ultimately degrade your user's experience 😭.

Thankfully the React team have already thought about this and provided [lint rules to help](https://www.npmjs.com/package/eslint-plugin-react-hooks) 🥰. But what if you're passing objects and arrays into dependency arrays which are not 'deeply' compared? How can you know for sure?

`react-stable-ref` fills that gap and provides an assortment of utilities to help test, visualize and protect against the dreaded rerender 😱.

## API 🤖

### `useStableRefTester()`

A **development only** hook, which increments state over a predefined interval, triggering rerenders in your component.

**Arguments:**

-   timeout: `Number` Timeout between rerenders

**Returns:**

`count`: `Number`

**Example:**

```jsx
const UnstableButton = ({ children }) => {
    const myArray = ['1', '2', '3'];

    useStableRefTester();

    useEffect(() => {
        console.warn('I should not be called on every render');
    }, [myArray]);

    return <button>{children}</button>;
};
```

### `useWhichDepChanged()`

A **development only** hook which emits (via console) which prop triggered an update. Useful when you are unsure which property changed in a `useEffect` dependency array.

_Inspired by_: [useWhyDidYouUpdate](https://usehooks.com/useWhyDidYouUpdate/)

**Arguments:**

-   dependencies: `Object` A dependency object which mirrors the dependency array of the hook you are trying to test
-   onChange(changedDeps): `(changedDeps: Obj) => void` A callback which is fired when a dependency is changed.

**Returns:**

`void`

**Example:**

```jsx
const UnstableButton = ({ children }) => {
    const myArray = ['1', '2', '3'];

    useWhichDepChanged({ myArray, children }, onChange(changedDeps) => {
        console.log('UnstableButton: ', changedDeps); // UnstableButton: myArray
    });

    return <button>{children}</button>;
};
```

### `useDeeplyComparedEffect()`

_Coming soon..._

A react hook for deeply comparing objects and arrays passed into its dependency array.

### `useCustomComparedEffect()`

_Coming soon..._

A react hook to allow you to provide custom methods used to comparing dependencies and trigger an effect.

### `<RenderCount />`

A visual component that keeps track of the number of renders that have occurred.

**Props:**

-   initialCount: `Number` Initial counter value
-   count: `Number` Provide a count for a controlled API

## Thanks 😍

Huge thank you to [Pablo Stanley](https://twitter.com/pablostanley) and contributors of [Open Peeps](https://www.openpeeps.com/?ref=react-stable-ref) for the logo.

## Resources

-   [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)
-   [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
-   [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback/)
