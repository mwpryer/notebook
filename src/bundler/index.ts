import * as esbuild from "esbuild-wasm"
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin"
import { fetchPlugin } from "./plugins/fetch-plugin"

export async function startService() {
  await esbuild.initialize({ wasmURL: "https://unpkg.com/esbuild-wasm@0.20.2/esbuild.wasm" })
}

export async function bundle(rawCode: string) {
  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      jsxFactory: "__React__.createElement",
      jsxFragment: "__React__.Fragment",
      define: {
        "process.env.NODE_ENV": "'development'",
      },
    })
    return { code: result.outputFiles[0].text, error: "" }
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        error: err.message,
      }
    } else {
      throw err
    }
  }
}
