const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const { ProgressPlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'production',
    devtool: "hidden-source-map",
    entry: {
        'app': './src/main.js'
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, "./src")
        },
        extensions: ['.mjs', '.js', '.vue']
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    }
                }
            }),
            new CssMinimizerPlugin()
        ],
        sideEffects: 'flag',
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,//入口点的最大并行请求数
            cacheGroups: {
                commonVue: {
                    test: /([\\/])node_modules([\\/])(vue|vue-router)([\\/])/,
                    priority: -5,
                    name: 'commonVue'
                },
                elementUI: {
                    test: /([\\/])node_modules([\\/])element-ui([\\/])/,
                    priority: -5,
                    name: 'elementUI'
                },
                polyfill: {
                    test: /([\\/])node_modules([\\/])core-js([\\/])/,
                    priority: -5,
                    name: 'polyfill'
                },
                vendors: {
                    test: /([\\/])node_modules([\\/])/,
                    priority: -10,
                    name: 'vendors',
                    reuseExistingChunk: true
                }
            },
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,//默认值是 false：每个入口 chunk 中直接嵌入 runtime
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude:/node_modules/,
                use: ['thread-loader', 'babel-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            chunkFilename: '[name].[contenthash:8].css',
            filename: '[name].[contenthash:8].css'
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        // new BundleAnalyzerPlugin(),
        // new ProgressPlugin(),
        new CopyPlugin({
            "patterns": [
                {
                    "from": "./public",
                    "to": path.join(__dirname, "dist"),
                    "toType": "dir",
                    "globOptions": {
                        "dot": true,
                        "gitignore": true,
                        "ignore": ["**/*.html"]
                    }
                }
            ]
        })
    ]
}