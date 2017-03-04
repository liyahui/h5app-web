import path from 'path'

const config = {
  root: path.join(__dirname, '..')
}

config.static = 'http://liyahui.cn/h5app/'
config.src = path.join(config.root, 'src')
config.dist = path.join(config.root, 'dist')
config.main = path.join(config.src, 'main.js')

export default config
