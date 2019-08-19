const path = require('path')
const execa = require('execa')

let flag = true

class nodemonPlugin {
    // 应用函数
    apply (compiler) {
     // 绑定钩子事件
        compiler.plugin('after-emit', (compilation, cb) => {
            if (!flag) return cb()
            setTimeout(() => {
                flag = false
                execa('nodemon', [path.resolve(__dirname, '../dist/index.js')]).stdout.pipe(process.stdout)
            }, 100)
            cb()
        })
   }
}

module.exports = nodemonPlugin
