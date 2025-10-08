import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";
import {BuildOptions} from "./types/types";

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
    }

    return plugins;
}