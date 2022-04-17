import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import ts from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import external from "rollup-plugin-peer-deps-external";
import styles from "rollup-plugin-styles";
import json from "@rollup/plugin-json";
import browsersync from 'rollup-plugin-browsersync';
import fs from "fs";
import path from "path";
import typescript from "typescript";

const package_json = require("./package.json");
const tsconfig = require("./tsconfig.json");

export default {
  input: "src/index.ts",
  output: [
    {
      file: path.join(tsconfig.outDir, package_json.main),
      format: "cjs",
      sourcemap: process.env.NODE_ENV === "production" ? false : "inline",
    },
  ],
  plugins: [
    styles(),
    external(),
    resolve(),
    commonjs(),
    ts({
      typescript,
      tsconfig: "./tsconfig.json",
      sourceMap: process.env.NODE_ENV === "production",
      inlineSources: true,
    }),
    json(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),
    {
      async writeBundle() {
        if (!fs.existsSync(tsconfig.outDir)) {
          await fs.promises.mkdir(tsconfig.outDir);
        }
        const script = `<script src="${package_json.main}"></script>`;

        const html = `<!DOCTYPEhtml><htmllang="en"><head><metacharset="utf-8"/><metaname="viewport"content="width=device-width,initial-scale=1"/><metaname="theme-color"content="#000000"/><title>${package_json.displayName}</title></head><bodystyle="margin:0px;">${script}</body></html>`;

        await fs.promises.writeFile(tsconfig.outDir + "/index.html", html);
        await fs.promises.writeFile(tsconfig.outDir + "/favicon.ico", "");
      },
    },
    browsersync({ server: tsconfig.outDir })
  ],
  watch: {
    exclude: "node_modules/**/*",
    include: "src/**/*",
  },
};
