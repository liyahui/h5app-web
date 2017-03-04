import path from 'path'
import config from '../config'
import fs from 'fs'

const cssOptions = JSON.stringify({
  discardComments: {
    removeAll: true
  }
})

export const base64media = /\w+@base64\.(png|jpe?g|gif|mp3)$/

export const img = {
  test: /\.(png|jpe?g|gif)$/,
  loader: 'file',
  query: {
    name: '[name].[ext]'
  },
  exclude: base64media
}

export const css = {
  test: /\.(css|scss|sass)$/,
  loader: ['css?' + cssOptions, 'postcss', 'sass'].join('!')
}

export const cssLoads = {
  lib: {
    ...css,
    include: path.join(config.root, 'node_modules')
  },
  app: {
    ...css,
    include: config.src
  }
}

export const html = {
  template: path.join(config.src, 'index.html'),
  filename: 'index.html'
}

export const localIP = () => {
  const interfaces = require('os').networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
