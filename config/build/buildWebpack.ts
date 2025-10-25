import webpack from "webpack"
import { buildDevServer } from "./buildDevServer"
import { buildLoaders } from "./buildLoaders"
import { buildPlugins } from "./buildPlugins"
import { buildResolvers } from "./buildResolvers"
import { BuildOptions } from "./types/types"

export function buildWebpack(options: BuildOptions): webpack.Configuration {
   const isDev = options.mode === "development"

   return {
      mode: options.mode ?? "development",
      module: {
         rules: buildLoaders(),
      },
      resolve: buildResolvers(options),
      plugins: buildPlugins(options),
      entry: options.paths.entry,
      output: {
         path: options.paths.output,
         filename: "main.[contenthash].js",
         clean: true,
         publicPath: "/",
      },
      devtool: isDev ? "inline-source-map" : "source-map",
      devServer: isDev ? buildDevServer(options) : undefined,
      watchOptions: {
         ignored: /node_modules/,
      },
      optimization: {
         usedExports: true,
      },
   }
}
