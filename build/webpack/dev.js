import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpackDevServer from 'webpack-dev-server'
import options from './base'
import config from '../config'
import { css, img, html, postcss, localIP } from './util'

const host = 'localhost'
const port = 2017
const url = `http://${host}:${port}`

options.entry.app = [
  `webpack-dev-server/client?${url}`,
  'webpack/hot/dev-server',
  config.main
]

options.devtool = '#eval-source-map'

css.loader = 'style!' + css.loader
options.module.loaders.push(css)
options.module.loaders.push(img)

options.plugins = [
  new webpack.DefinePlugin({
    'process.env': '"development"'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin(html),
  ...options.plugins
]

options.postcss = []

const server = new webpackDevServer(webpack(options), {
  hot: true,
  host: host,
  inline: true,
  noInfo: true,
  historyApiFallback: true
})

server.listen(port, () => {
  console.log(`${url}`)
})
