#!/usr/bin/env node

const { spawn } = require('child_process')
const chalk = require('chalk')
const path = require('path')

var status = require('node-status')
 
status.start({
  interval: 200,
  pattern: chalk.green('安装中: {uptime}')
})

const command = process.argv[2]
if (!command) throw new Error(chalk.red('A COMMAND REQUIRED'))

const func = {
  init() {
    const cp = spawn('cp', ['-r', '-a', path.join(__dirname, '/code/'), process.env.PWD])
    cp.on('error', (err) => {
      console.log(chalk.red(err))
      process.exit()
    })
    cp.on('close', () => {
      console.log(chalk.green('复制文件完成！'))
      console.log(chalk.green('开始安装npm包'))
      const install = spawn('npm', ['i'])
      install.stdout.pipe(process.stdout)
      install.stderr.pipe(process.stderr)
      install.on('error', (err) => {
        console.log(chalk.red(err))
        process.exit()
      })
      install.on('close', () => {
        status.stop()
        console.log(chalk.green('安装完成！'))
        process.exit()
      })
    })
  }
}

func[command]()