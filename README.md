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

## Motivation 🧠

I struggle with React hooks! It's not always obvious to me if i'm using unstable references with hooks such as `useEffect`. Unnecessary rerenders when left unchecked can decrease the performance of your app, cause jank and ultimately degrade your user's experience 😭.

Thankfully the React team have already thought about this and provide [lint rules to help](https://www.npmjs.com/package/eslint-plugin-react-hooks) 🥰. But what if you're passing objects and arrays into dependency arrays which are not 'deeply' compared?
How can you know for sure? This is why I've put this library together...

Think of it as your stable reference utility library with everything you need to test, visualize and protect against the dreaded rerender 😱.

## API 🤖

### `useStableRefTester()`

A **development only** hook, which increments state over a predefined interval, triggering rerenders in your component.

**Arguments:**

-   timeout: `Number` Timeout between rerenders
-   shouldLog: `Bool` Emit a warning log on rerender

**Returns:**

`void`

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

-   name: `String` A name to identify your hook when logged to the console
-   dependencies: `Object` A dependency object which mirrors the dependency array of the hook you are trying to test

**Returns:**

`void`

**Example:**

```jsx
const UnstableButton = ({ children }) => {
    const myArray = ['1', '2', '3'];

    useWhichDepChanged('UnstableButton', { myArray, children });

    return <button>{children}</button>;
};
```

### `useDeeplyComparedEffect()`

_Coming soon..._

A react hook for deeply comparing objects and arrays passed into its dependency array.

### `<RenderCount />`

_Coming soon..._

A visual component that keeps track of the number of renders that have occurred.

## Thanks 😍

Huge thank you to [Pablo Stanley](https://twitter.com/pablostanley) and contributors of [Open Peeps](https://www.openpeeps.com/?ref=react-stable-ref) for the logo.

## Resources

-   [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)
-   [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
-   [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback/)

