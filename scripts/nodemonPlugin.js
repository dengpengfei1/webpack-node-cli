const path = require('path')
const execa = require('execa')

let subprocess

class nodemonPlugin {
    // 应用函数
    apply (compiler) {
     // 绑定钩子事件
        compiler.plugin('after-emit', (compilation, cb) => {
            setTimeout(() => {
                subprocess && subprocess.kill()
                subprocess = execa('node', [path.resolve(__dirname, '../dist/index.js')])
                subprocess.stdout.pipe(process.stdout)
                subprocess.stderr.pipe(process.stderr)
            }, 100)
            cb()
        })
   }
}

module.exports = nodemonPlugin
