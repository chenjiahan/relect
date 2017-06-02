const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
require('shelljs/global');

env.NODE_ENV = 'production';

module.exports = merge(baseWebpackConfig, {
    entry: {
        index: './src/Relect.js'   
    },
    output: {
        path: path.resolve(__dirname, '../lib'),
        publicPath: "lib/",
        filename: "[name].js",
        libraryTarget: 'commonjs2'
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
})
