const path = require('path')
const execa = require('execa')

let subprocess

class nodemonPlugin {
    // 应用函数
    apply (compiler) {
     // 绑定钩子事件
        compiler.plugin('after-emit', (compilation, cb) => {
            setTimeout(() => {
                subprocess && subprocess.kill() // 修改代码后重新启动杀掉进程以便重启
                subprocess = execa('node', [path.resolve(__dirname, '../dist/index.js')])
                subprocess.stdout.pipe(process.stdout) // 子进程的标准输出流导入到父进程
                subprocess.stderr.pipe(process.stderr)
            }, 100)
            cb()
        })
   }
}

module.exports = nodemonPlugin
