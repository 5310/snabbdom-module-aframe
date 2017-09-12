# snabbdom-module-aframe

[![npm (scoped)](https://img.shields.io/npm/v/@scio/snabbdom-module-aframe.svg)](https://www.npmjs.com/package/@scio/snabbdom-module-aframe)
[![npm (scoped)](https://img.shields.io/badge/unpkg-snabbdomModuleAframe-blue.svg)](https://unpkg.com/@scio/snabbdom-module-aframe)

Snabbdom module to directly set A-Frame components.

The standard Snabbdom attributes modules does not support objects or arrays, but the A-Frame elements implement a custom [`setAttribute`](https://aframe.io/docs/0.6.0/core/entity.html#setattribute-componentname-value-propertyvalue-clobber) method that can accept objects arrays making updating multi-property components a lot easier. This module simply introduces some Snabbdom data objects that directly use the A-Frame method.

The module does not check to see if an element is from A-Frame before applying attributes this way; use with caution.


## Installation

### NPM

```js
const snabbdomModuleAframe = require('@scio/snabbdom-module-aframe')
```

### Unpkg

```html
<script src="https://unpkg.com/@scio/snabbdom-module-aframe/dist/snabbdom-aframe.min.js"></script>
```

Global: `snabbdomModuleAframe`


## Usage

The module implements the following Snabbdom data object behaviors:

### `aframe`

Behaves like the built-in attributes module, but can accept objects and arrays and clobbers them directly using the`setAttribute` method.

In case of an attribute that had been previously added/set and is no longer present in the `aframe` object, it is removed from the DOM element's attribute list using `removeAttribute`.

### `aframeUpdate`

Like the `aframe` object, but does not clobber values or remove absent attributes.

### `aframeClobber`

Like the `aframeUpdate` object, but **does** clobber values.

### `aframeRemove`

Removes any attributes present in the object as keys. Values for the keys are ignored.

Yes, this could have been an array of strings, but I wanted to the three objects similar.


## Example

```js
const main = ({ DOM }) => {
  return {
    DOM: xs.periodic(1000 / 30).map(count =>

      h('a-scene', [
        h("a-sphere", {
          aframe: {
            position: { x: 0, y: 1+Math.sin(count / 30), z: -5 },
            radius: 1.25,
            color: "#EF2D5E"
          }
        }),
      ])
                                    
    )
  }
}

const drivers = {
  DOM: makeDOMDriver("body", {
    modules: [
      snabbdomModuleAframe
    ]
  })
}

run(main, drivers)
```

[Codepen demo](https://codepen.io/5310/pen/VMZqxV?editors=0010)
