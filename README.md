# @cprecioso/rollup-plugin-wasm

Loose polyfill for the [WASM ESM proposal](https://github.com/WebAssembly/esm-integration), as a [Rollup](https://rollupjs.org/) plugin.

- Compatible with Node.js and the browser.
- Links WASM imports
- Bundles [wasm-pack](https://github.com/rustwasm/wasm-pack) output seamlessly!

## Usage

Turn this:

```js
const req = fetch("./greet.wasm")
const importObject = { /* ... */ }
const mod = await WebAssembly.instantiateStreaming(req, importObject)
mod.instance.greet()
```

into this:

```js
import { greet } from "./greet.wasm"
greet()
```

both for Node.js and browsers!

## Installation

1. `yarn add --dev @cprecioso/rollup-plugin-wasm`

2. Add to your Rollup plugins

   ```diff
    // rollup.config.js
   +import wasm from "@cprecioso/rollup-plugin-wasm"

    export default {
      //...
      plugins: [
   +    wasm(),
         // ...
      ]
    }
   ```

## Limitations

- The target environment or final bundler must allow top-level await in ES modules. ([Chrome 89+, Firefox 89+, Safari 15+](https://caniuse.com/mdn-javascript_operators_await_top_level), [Node.js 14.8+ (but needs the .mjs extension)](https://nodejs.org/api/esm.html#top-level-await))
