'use strict'
const path = require('path')
const _package = require('./package.json')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const timeStamp = Date.now();
const resolve = dir => path.join(__dirname, dir)
// page title
// 生产环境，测试和正式
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
  //  publicPath: '/app/', //署应用包时的基本 URL。  vue-router history模式使用
  outputDir: IS_PROD ? 'dist' : 'dist-dev', //  生产环境构建文件的目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  productionSourceMap: false, 
  css: {
    extract: {
      filename: `static/css/[name].[chunkhash].${timeStamp}.css`,
      chunkFilename: `static/css/[name].${timeStamp}.css`
    }
  },
  chainWebpack: config => {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // 别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
  },
}
