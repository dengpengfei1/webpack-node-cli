const http = require('http')

const server = http.createServer()
server.on('request', (req, res) => {
    res.end('hahaha lalala')
})

server.listen(3000, () => {
    console.log('server is running at: 127.0.0.1:3000');
})
