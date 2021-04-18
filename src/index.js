const fs = require('fs-extra')
const path = require('path')
const { validate } = require('schema-utils')
const schema = require('./schema.json')
// 插件名
const pluginName = 'AssetsReportPlugin'
// 默认参数
const defaultOptions = {
  filename: 'assets.md'
}
// 文本头部
const tableHeader = `
# assets table

| file   | size   |
| ------ | ------ |
`

class AssetsReportPlugin {
  constructor(options) {
    // 校验参数
    validate(schema, options, { name: pluginName })
    // 合并参数
    this.options = { ...defaultOptions, ...options }
  }
  apply(compiler) {
    compiler.hooks.done.tap(pluginName, (stats) => {
      const { assets, outputOptions } = stats.compilation
      // 拼接文本
      const content = Object.keys(assets).reduce((acc, key) => {
        acc += `| ${key} | ${assets[key]._size} |\n`
        return acc
      }, tableHeader)
      // 获取输出路径，如没传入，则使用 webpack 的 output.path
      const outputPath = this.options.path || outputOptions.path
      // 输出文件
      fs.outputFile(path.resolve(outputPath, this.options.filename), content)
    })
  }
}

module.exports = { AssetsReportPlugin }
