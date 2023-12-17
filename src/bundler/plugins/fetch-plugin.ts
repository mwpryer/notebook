import * as esbuild from "esbuild-wasm"
import axios from "axios"
import localforage from "localforage"

const cache = localforage.createInstance({ name: "cache" })

// Fetch and parse files from url, includes caching for performance
export const fetchPlugin = (input: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // Root entry
      build.onLoad({ filter: /(^index\.js$)/ }, async () => {
        return { contents: input, loader: "jsx" }
      })
      // Caching layer
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        const cachedResult = await cache.getItem<esbuild.OnLoadResult>(args.path)
        if (cachedResult) return cachedResult
      })
      // CSS files
      build.onLoad({ filter: /(\.css$)/ }, async (args: esbuild.OnLoadArgs) => {
        const { data, request } = await axios.get(args.path)
        const contents = `
          const style = document.createElement("style");
          style.innerText = "${data.replace(/\n/g, "").replace(/"/g, '\\"').replace(/'/g, "\\'")}"
          document.head.appendChild(style);
        `
        const result: esbuild.OnLoadResult = {
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
          loader: "jsx",
        }
        await cache.setItem(args.path, result)
        return result
      })
      // JS files
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        const { data, request } = await axios.get(args.path)
        const result: esbuild.OnLoadResult = {
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
          loader: "jsx",
        }
        await cache.setItem(args.path, result)
        return result
      })
    },
  }
}
