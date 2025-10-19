import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration } from "webpack"
import { BuildOptions } from "./types/types"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ESLintWebpackPlugin from "eslint-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

export function buildPlugins({ mode, paths }: BuildOptions): Configuration["plugins"] {
   const isDev = mode === "development"
   const isProd = mode === "production"

   const plugins: Configuration["plugins"] = [
      new HtmlWebpackPlugin({ template: paths.html }),
      new BundleAnalyzerPlugin(),
   ]

   if (isDev) {
      //For pushing plugins for development env
      plugins.push(new ESLintWebpackPlugin())
      plugins.push(new ForkTsCheckerWebpackPlugin())
      plugins.push(new ReactRefreshPlugin())
   }
   if (isProd) {
      //For pushing plugins for production env
      plugins.push(
         new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
         })
      )
   }

   return plugins
}
