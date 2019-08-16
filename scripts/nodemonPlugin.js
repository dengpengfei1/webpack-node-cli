const path = require('path')
const execa = require('execa')

class nodemonPlugin {
    // 应用函数
    apply (compiler) {
     // 绑定钩子事件
        compiler.plugin('after-emit', (compilation, cb) => {
            setTimeout(() => {
                execa('nodemon', [path.resolve(__dirname, '../dist/index.js')])                
            }, 100)
            cb()
        })
   }
}

module.exports = nodemonPlugin
