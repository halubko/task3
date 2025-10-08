import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = "production" | "development";

interface EnvVariables{
    mode: Mode,
    port: number;
}

export default (env: EnvVariables) => {

    const isDev = env.mode ?? 'development';

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',

        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },

        plugins: [new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),],

        entry: path.resolve(__dirname, 'src', 'index.tsx'),

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
            clean: true,
        },

        devtool: isDev && 'inline-source-map',

        devServer: isDev
            ? {
                port: env.port ?? 8000,
                open: true,
                hot: true,
            } : undefined,
    }

    return config;
}