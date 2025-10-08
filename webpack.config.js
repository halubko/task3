const path = require("path");

module.exports = (env) => {
    const isDev = env.mode ?? "development";

    return {

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            clean: true,
        },

        devServer: isDev
            ? {
                port: env.port ?? 8000,
                open: true,
                hot: true,
            }
            : undefined,
    }
}