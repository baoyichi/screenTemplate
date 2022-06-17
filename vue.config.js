'use strict';
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/project/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  configureWebpack: {
    /*  配置别名  */
    resolve: {
      alias: {
        '@': resolve('src'),
        assets: resolve('src/assets'),
        api: resolve('src/api'),
        views: resolve('src/views'),
        components: resolve('src/components')
      }
    }
  },
  devServer: {
    port: 8133,
    host: '0.0.0.0',
    proxy: {
      '/dev-api': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': '/'
        }
      }
    },
    disableHostCheck: true
  }
};
