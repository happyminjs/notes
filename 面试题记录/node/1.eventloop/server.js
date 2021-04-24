const http = require('http')

http.createServer((req, res) => {
  if (req.url === '/sum') {
    let total = 0
    for (let i = 0; i < 10; i++) {
      total += i
    }
    res.end(`` + total)
  } else if (req.url === '/minus') {
    res.end('ok')
  } else {
    res.end('not found')
  }
}).listen(3000)