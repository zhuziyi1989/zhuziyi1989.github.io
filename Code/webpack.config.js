'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
  const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    mode: "production", // enabled useful tools for development
    entry: './src/app.js',
    output: {
        // webpack 如何输出结果的相关选项
        path: path.resolve(__dirname, "dist"), // string
        // 所有输出文件的目标路径
        // 必须是绝对路径（使用 Node.js 的 path 模块）
        filename: "bundle.js", // string    // 「入口分块(entry chunk)」的文件名模板
        publicPath: "/assets/", // string    // 输出解析文件的目录，url 相对于 HTML 页面
        library: "MyLibrary", // string,
        // 导出库(exported library)的名称
        libraryTarget: "umd", // 通用模块定义    // 导出库(exported library)的类型
        /* 高级输出配置（点击显示） */
    },
    module: {
        rules: [{
            test: /\.txt$/,
            // use: 'raw-loader'
        }]
    }
};