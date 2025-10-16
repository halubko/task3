import { ModuleOptions } from "webpack"
import { BuildOptions } from "./types/types"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ReactRefreshTypeScript from "react-refresh-typescript"

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
   const isDev = options.mode === "development"

   const scssLoader = {
      test: /\.module\.scss$/i,
      use: [
         isDev ? "style-loader" : MiniCssExtractPlugin.loader,
         {
            loader: "css-loader",
            options: {
               modules: true,
               esModule: false,
            },
         },
         "sass-loader",
      ],
   }

   const tsLoader = {
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      use: [
         {
            loader: require.resolve("ts-loader"),
            options: {
               getCustomTransformers: () => ({
                  before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
               }),
               transpileOnly: isDev,
            },
         },
      ],
   }
   return [scssLoader, tsLoader]
}
