import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default defineConfig([
  {
    input: "./index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "umd",
        name: "novadax-utils",
      },
      {
        file: "dist/index.mjs",
        format: "esm",
      },
    ],
    plugins: [typescript({ compilerOptions: { lib: ["esnext", "dom"] } })],
    watch: {
      exclude: "node_modules/**",
    },
  },
  {
    input: "./index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
]);
