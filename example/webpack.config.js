const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (...args) => path.resolve(process.cwd(), ...args)
const { AssetsReportPlugin } = require('../src/index')

module.exports = {
  mode: 'production',
  entry: resolve('example/index.js'),
  output: {
    path: resolve('example/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new AssetsReportPlugin({
      path: resolve('example/dist/report'),
      filename: 'files.md'
    })
  ]
}
