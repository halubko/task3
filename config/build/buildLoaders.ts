import { ModuleOptions } from "webpack"

export function buildLoaders(): ModuleOptions["rules"] {
   const babelLoader = {
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
         loader: "babel-loader",
         options: {
            presets: [
               "@babel/preset-env",
               "@babel/preset-typescript",
               ["@babel/preset-react", { runtime: "automatic" }],
            ],
         },
      },
   }

   return [babelLoader]
}
