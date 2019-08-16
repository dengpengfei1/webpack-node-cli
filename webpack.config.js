const path = require('path')
const fs = require('fs')
const nodemonPlugin = require('./scripts/nodemonPlugin')

var nodeModules = {}
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    })

module.exports = {
    entry: {
        index: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'MY_BIG_NODE',
        libraryTarget: 'commonjs2'
    },
    target: 'node', // 告诉 webpack 处理的是 node 代码，
                    // 这样就不会对 node 的核心模块进行处理和打包
                    // 否则会把核心模块处理的不好使，而且打包进代码
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            $utils: path.resolve(__dirname, 'src/utils')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json')
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new nodemonPlugin()
    ]
}
