'use strict';
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    outputDir: 'dist',
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: 'static',
    // 是否开启eslint保存检测，有效值：true | false | 'error'
    lintOnSave: process.env.NODE_ENV === 'development',
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port: 8133
    },
    configureWebpack: (config) => {
        if (isProd) {
            config.plugins.push(
                new CompressionPlugin({
                    test: /\.js$|\.html$|\.css$/u,
                    threshold: 4096, // 超过 4kb 压缩
                }),
                new BundleAnalyzerPlugin())
            config.optimization = {
                runtimeChunk: 'single',
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 20000,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                // get the name. E.g. node_modules/packageName/not/this/part.js
                                // or node_modules/packageName
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                                // npm package names are URL-safe, but some servers don't like @ symbols
                                return `npm.${packageName.replace('@', '')}`
                            }
                        }
                    }
                }
            }
        }
        config['externals'] = {
            echarts: 'echarts'
        }

        config.resolve.alias['@'] = resolve('src')
        config.resolve.alias['assets'] = resolve('src/assets')
        config.resolve.alias['api'] = resolve('src/api')
        config.resolve.alias['views'] = resolve('src/views')
        config.resolve.alias['components'] = resolve('src/components')

    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = process.env.VUE_APP_TITLE;
            return args;
        });
    }
}
