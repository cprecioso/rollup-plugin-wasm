// @ts-check

import { builtinModules } from "module"
import { defineConfig } from "rollup"
import ts from "rollup-plugin-ts"
import pkg from "./package.json"

const external = [...builtinModules, ...Object.keys(pkg.dependencies)]

const makePlugins = () => [ts({ typescript: require("typescript") })]

export default defineConfig([
  {
    input: "src/helpers/index.ts",
    output: { dir: "dist", format: "esm", entryFileNames: "helpers.mjs" },
    plugins: makePlugins(),
    external,
  },
  {
    input: "src/plugin/index.ts",
    output: [
      { dir: "dist", format: "esm", entryFileNames: "[name].mjs" },
      { dir: "dist", format: "cjs", exports: "named" },
    ],
    plugins: makePlugins(),
    external,
  },
])
