import path from 'path'
import webpack from 'webpack'
import { base64media } from './util'
import config from '../config'

const options = {}

options.entry = {
  app: config.main
}

options.output = {
  path: config.dist,
  filename: '[name].js'
}

options.plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoErrorsPlugin()
]

options.resolve = {
  extensions: ['', '.js', '.vue', '.json'],
  alias: {
    vue: 'vue/dist/vue',
    ui: path.join(config.src, 'components/ui'),
    store: path.join(config.src, 'store'),
    utils: path.join(config.src, 'utils'),
    assets: path.join(config.src, 'assets'),
    models: path.join(config.src, 'models'),
    components: path.join(config.src, 'components')
  }
}

options.module = {
  loaders: [{
    test: /\.vue$/,
    loader: 'vue'
  }, {
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules/
  }, {
    test: base64media,
    loader: 'url'
  }, {
    test: /\.(eot|woff|ttf|svg)$/,
    loader: 'url'
  }]
}

options.sassLoader = {
  data: "@import '~assets/scss/inject';"
}

export default options
