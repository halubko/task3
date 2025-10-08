import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration } from "webpack";
import {BuildOptions} from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildPlugins({mode, paths}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === "development";
    const isProd = mode === "production";

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({template: paths.html}),
    ]

    if (isDev) {
        //For pushing plugins for development env
    }
    if (isProd) {
        //For pushing plugins for production env
        plugins.push(new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }))
    }

    return plugins;
}