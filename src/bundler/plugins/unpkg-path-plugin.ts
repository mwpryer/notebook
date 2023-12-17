import * as esbuild from "esbuild-wasm"

// Intercept import paths and redirect to a unpkg url instead of file system
export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Root entry
      build.onResolve({ filter: /(^index\.js$)/ }, async (args: esbuild.OnResolveArgs) => {
        return { path: args.path, namespace: "unpkg-path" }
      })
      // Relative paths
      build.onResolve({ filter: /^\.+\/*/ }, async (args: esbuild.OnResolveArgs) => {
        return { path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href, namespace: "unpkg-path" }
      })
      // Main file
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        return { path: `https://unpkg.com/${args.path}`, namespace: "unpkg-path" }
      })
    },
  }
}
