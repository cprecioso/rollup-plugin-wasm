// @ts-check

import { builtinModules } from "module"
import ts from "rollup-plugin-ts"

const externalModules = new Set(builtinModules)

export default /** @type {import("rollup").RollupOptions[]} */ ([
  {
    input: "src/index.ts",
    output: { dir: "dist", format: "cjs", exports: "named" },
    plugins: [ts({ typescript: require("typescript") })],
    external: (id) => externalModules.has(id),
  },
  {
    input: "src/utils.ts",
    output: { dir: "dist", format: "esm", entryFileNames: "[name].mjs" },
    plugins: [ts({ typescript: require("typescript") })],
    external: (id) => externalModules.has(id),
  },
])
