import webpack from 'webpack';
import {buildWebpack} from "./config/build/buildWebpack";
import path from "path";
import {BuildMode} from "./config/build/types/types";

interface EnvVariables{
    mode: BuildMode;
    port: number;
}

export default (env: EnvVariables) => {
    const paths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'dist'),
        html: path.resolve(__dirname, 'public', 'index.html'),
    }


    const config: webpack.Configuration = buildWebpack({
        port: env.port,
        mode: env.mode ?? "development",
        paths: paths,
    })

    return config;
}