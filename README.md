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

I struggle with React hooks! It's not always obvious to me if i'm using hooks, such as `useEffect`, with unstable references, resulting in unnecessary rerenders. If left unchecked this could decrease the performance in your app, cause jank and ultimately degrade your user's experience 😭.

Thankfully the React team have already thought about this and provide [lint rules to help](https://www.npmjs.com/package/eslint-plugin-react-hooks) 🥰. But what if you're passing objects and arrays into dependency arrays which are not 'deeply' compared?
How can you know for sure? This is why I've put this library together...

Think of it as your stable reference utility library with everything you need to test, visualize and protect against the dreaded rerender 😱.

## API 🤖

### `useStableRefTester()`

A **development only** hook, which increments state over a predefined interval, triggering rerenders in your component.

**Arugments:**

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

### `<RenderCount />`

_Coming soon..._

A visual component that keeps track of the number of renders that have occurred.

### `useDeeplyComparedEffect`

_Coming soon..._

A react hook for deeply comparing objects and arrays passed into its dependency array.

## Thanks 😍

Huge thank you to [Pablo Stanley](https://twitter.com/pablostanley) and contributors of [Open Peeps](https://www.openpeeps.com/?ref=react-stable-ref) for the logo.

## Resources

-   [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)
-   [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
-   [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback/)
