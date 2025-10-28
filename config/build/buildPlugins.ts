import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration } from "webpack"
import { BuildOptions } from "./types/types"
import ESLintWebpackPlugin from "eslint-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import path from "path"

export function buildPlugins({ mode, paths }: BuildOptions): Configuration["plugins"] {
   const isDev = mode === "development"
   const isProd = mode === "production"

   const plugins: Configuration["plugins"] = [
      new HtmlWebpackPlugin({
         template: paths.html,
         favicon: path.resolve(paths.public, "favicon.ico"),
      }),
      new BundleAnalyzerPlugin(),
   ]

   if (isDev) {
      //For pushing plugins for development env
      plugins.push(new ESLintWebpackPlugin())
      plugins.push(new ForkTsCheckerWebpackPlugin())
   }
   if (isProd) {
      //For pushing plugins for production env
   }

   return plugins
}
