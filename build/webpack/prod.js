import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import options from './base'
import config from '../config'
import shell from 'shelljs'
import { cssLoads, img, html, postcss } from './util'

process.env.NODE_ENV = 'production'

shell.rm('-rf', config.dist)

const cssFiles = {
  lib: new ExtractTextPlugin('css/lib.[contenthash:7].css'),
  app: new ExtractTextPlugin('css/app.[contenthash:7].css')
}

options.output.publicPath = config.static

options.output.filename = 'js/[name].[chunkhash:7].js'

img.query.name = 'img/[name].[hash:7].[ext]'
options.module.loaders.push(img)

cssLoads.lib.loader = cssFiles.lib.extract(cssLoads.lib.loader)
cssLoads.app.loader = cssFiles.app.extract(cssLoads.app.loader)
options.module.loaders.push(cssLoads.lib)
options.module.loaders.push(cssLoads.app)

options.plugins = [
  new webpack.DefinePlugin({
    'process.env': '"production"'
  }),

  new HtmlWebpackPlugin(Object.assign(html, {
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  })),

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false,
      ascii_only: true
    }
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'lib',
    minChunks: function(module, count) {
      var native = module.resource.indexOf('node_modules') !== -1
      return module.resource && /\.js$/.test(module.resource) && native
    }
  }),

  cssFiles.lib,
  cssFiles.app,

  ...options.plugins
]

options.postcss = [
  autoprefixer()
]


options.vue = {
  loaders: {
    css: cssLoads.app.loader,
    sass: cssLoads.app.loader
  },
  postcss: options.postcss,
  ...options.vue
}

webpack(options).run((err, stats) => {
  if (err) {
    throw new Error(err)
  }

  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }))
})
