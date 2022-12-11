const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
    // entry: "./src/index.js",
    output: {
        path: path.join(__dirname, '/dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/, // styles files
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
                loader: "url-loader",
                options: { limit: false },
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "src/index.html",
        })
    ],
    devServer: {
        port: 3030,
    }
}