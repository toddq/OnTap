var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
// var SvgStore = require('webpack-svgstore-plugin')

// var svg  = { path: './assets/*.svg', name: 'assets/svg/[hash].logos.svg' }
// require('webpack-svgstore-plugin/src/helpers/svgxhr')(svg)

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        // |svg
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'vue-svg-loader'
      // },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader?' + JSON.stringify({
          // name: 'icon-[1]',
          name: '[name]_[hash]',
          prefixize: true,
          // regExp: utils.assetsPath('(.*)\\.svg')
        })
      },
      // {
      //   test: /\.svg$/i,
      //   loader: 'inline'
      // },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // plugins: [
  //   // create svgStore instance object
  //   new SvgStore({
  //     // svgo options
  //     svgoOptions: {
  //       plugins: [
  //         { removeTitle: true }
  //       ]
  //     },
  //     prefix: 'icon'
  //   })
  // ]
}
